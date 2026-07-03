import requests
import json
import sys
import os
import subprocess
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor

# Constant AES Key (base64) extracted from Goals365 player
AES_KEY_BASE64 = "tVIVSag6HwBa2ixdiJhyoVGv2VhR/2ALR8zNrt+jjcU="

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": "https://www.goals365.live/",
    "Origin": "https://www.goals365.live"
}

# Color codes for Windows CLI (if supported, otherwise fallback to plain text)
class Colors:
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    CYAN = '\033[96m'
    BOLD = '\033[1m'
    END = '\033[0m'
    
    @classmethod
    def enable_ansi(cls):
        if os.name == 'nt':
            try:
                import ctypes
                kernel32 = ctypes.windll.kernel32
                kernel32.SetConsoleMode(kernel32.GetStdHandle(-11), 7)
            except:
                pass

Colors.enable_ansi()

def decrypt_token_cryptography(token_str):
    """Decrypt using python-cryptography library if installed."""
    import base64
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    
    key_bytes = base64.b64decode(AES_KEY_BASE64)
    trimmed = token_str.strip()
    
    iv_bytes = base64.b64decode(trimmed[:16])
    ciphertext_bytes = base64.b64decode(trimmed[16:])
    
    aesgcm = AESGCM(key_bytes)
    decrypted_bytes = aesgcm.decrypt(iv_bytes, ciphertext_bytes, None)
    return decrypted_bytes.decode('utf-8')

def decrypt_token_node(token_str):
    """Fallback decryption using Node.js (zero external python dependencies)."""
    js_code = f"""
    const crypto = require('crypto');
    const key = Buffer.from('{AES_KEY_BASE64}', 'base64');
    const token = '{token_str.strip()}';
    const iv = Buffer.from(token.substring(0, 16), 'base64');
    const ct = Buffer.from(token.substring(16), 'base64');
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(ct.subarray(ct.length - 16));
    const dec = decipher.update(ct.subarray(0, ct.length - 16), 'utf8') + decipher.final('utf8');
    console.log(dec);
    """
    res = subprocess.check_output(["node", "-e", js_code], stderr=subprocess.DEVNULL)
    return res.decode('utf-8').strip()

def decrypt_token(token_str):
    try:
        return decrypt_token_cryptography(token_str)
    except ImportError:
        try:
            return decrypt_token_node(token_str)
        except Exception:
            print("[ERROR] Decryption failed. Please install the cryptography library:")
            print("        pip install cryptography")
            sys.exit(1)

def get_match_id(url_or_id):
    """Extract match ID from URL or return the ID directly."""
    if "/" in url_or_id:
        parts = url_or_id.rstrip("/").split("/")
        return parts[-1]
    return url_or_id

def check_stream_active(url):
    """Quick HTTP request to check if HLS stream is actively broadcasting."""
    try:
        res = requests.get(url, headers=HEADERS, timeout=2.0)
        return res.status_code == 200
    except:
        return False

def get_streams_for_match(match_id):
    """Fetch and decrypt all streams for a given match ID."""
    anchors_url = f"https://api.cameltv.live/camel-service/ee/sports_live/loadAnchorsByMatchId?matchId={match_id}"
    try:
        res = requests.get(anchors_url, headers=HEADERS).json()
        anchors = res.get("detail", {}).get("anchors", [])
        if not anchors:
            detail = res.get("detail", {})
            if "streams" in detail:
                anchors = detail["streams"]
        
        if not anchors:
            return []
            
        streams = []
        for idx, a in enumerate(anchors):
            stream_url = a.get("streamUrl", "")
            if not stream_url:
                continue
                
            filename = stream_url.split("/")[-1]
            stream_name = filename.split(".")[0]
            if stream_name.endswith("_md"):
                stream_name = stream_name[:-3]
            if stream_name.endswith("_hd"):
                stream_name = stream_name[:-3]
                
            name_lower = stream_name.lower()
            if "hd-en" in name_lower or "hden" in name_lower:
                label = "HD English"
            elif "hd" in name_lower:
                label = "HD"
            elif "sd" in name_lower:
                label = "SD"
            else:
                label = "Standard"
                
            # Fetch Token
            token_url = f"https://api.cameltv.live/camel-service/ee/sports_live/token?streamName={stream_name}"
            try:
                token_res = requests.get(token_url, headers=HEADERS).json()
                if token_res.get("status") == 200:
                    token_data = token_res.get("data", {})
                    encrypted_secret = token_data.get("txSecret")
                    tx_time = token_data.get("txTime")
                    
                    if encrypted_secret and tx_time:
                        decrypted_secret = decrypt_token(encrypted_secret)
                        host_parts = stream_url.split("/")
                        host = "/".join(host_parts[:3])
                        final_hls_url = f"{host}/live/{filename}?txSecret={decrypted_secret}&txTime={tx_time}&lat=9000"
                        
                        streams.append({
                            "label": label,
                            "name": stream_name,
                            "url": final_hls_url
                        })
            except:
                pass
        return streams
    except:
        return []

def fetch_all_matches():
    """Fetch all matches scheduled for today from the CamelTV API."""
    today = datetime.now().strftime("%Y%m%d")
    url = f"https://api.cameltv.live/camel-service/ee/sports_live/home_match?day={today}"
    
    try:
        res = requests.get(url, headers=HEADERS).json()
        data_obj = res.get("data", {})
        
        all_matches = []
        seen_ids = set()
        
        def process_match(m):
            match_id = m.get("id")
            if not match_id or match_id in seen_ids:
                return
            seen_ids.add(match_id)
            
            home = m.get("home_team", {}).get("name", "Unknown")
            away = m.get("away_team", {}).get("name", "Unknown")
            status_id = m.get("status_id", 1) # 1=upcoming, 2=live, 5=finished
            has_stream = m.get("has_custom_stream") == 1 or m.get("coverage", {}).get("has_stream") == 1
            match_time_ms = m.get("match_time", 0)
            
            match_time_str = "N/A"
            if match_time_ms:
                match_time_str = datetime.fromtimestamp(match_time_ms).strftime('%H:%M')
                
            all_matches.append({
                "id": match_id,
                "home": home,
                "away": away,
                "status_id": status_id,
                "has_stream": has_stream,
                "time": match_time_str
            })
            
        for g in data_obj.get("obs_group", []):
            for m in g.get("match", []): process_match(m)
        for g in data_obj.get("living_group", []):
            for m in g.get("match", []): process_match(m)
        for g in data_obj.get("hot_group", []):
            for m in g.get("match", []): process_match(m)
        for cg in data_obj.get("category_group", []):
            for comp in cg.get("competition_match", []):
                for m in comp.get("match", []): process_match(m)
                
        return all_matches
    except Exception as e:
        print(f"[ERROR] Failed to fetch schedule: {e}")
        return []

def check_match_live_status(m):
    """Check if a live match's stream is actually broadcasting."""
    if m["status_id"] == 2 and m["has_stream"]:
        streams = get_streams_for_match(m["id"])
        if streams:
            m["streams"] = streams
            m["is_broadcasting"] = check_stream_active(streams[0]["url"])
        else:
            m["is_broadcasting"] = False
    else:
        m["is_broadcasting"] = False
    return m

def play_in_vlc(url):
    """Launch VLC Player on Windows with the stream URL."""
    vlc_paths = [
        r"C:\Program Files\VideoLAN\VLC\vlc.exe",
        r"C:\Program Files (x86)\VideoLAN\VLC\vlc.exe"
    ]
    
    vlc_exe = None
    for p in vlc_paths:
        if os.path.exists(p):
            vlc_exe = p
            break
            
    if vlc_exe:
        print(f"Launching VLC Player...")
        subprocess.Popen([vlc_exe, url])
    else:
        print(f"[ERROR] VLC Player not found. Please install VLC or open this URL manually in your player:")
        print(f"        {url}")

def export_to_m3u(streams, match_name):
    """Export the list of HLS streams to a standard M3U playlist file."""
    filename = "playlist.m3u"
    try:
        with open(filename, "w", encoding="utf-8") as f:
            f.write("#EXTM3U\n")
            for s in streams:
                f.write(f"#EXTINF:-1, {match_name} - {s['label']}\n")
                f.write(f"{s['url']}\n")
        print(f"{Colors.GREEN}[SUCCESS] Playlist saved to {Colors.BOLD}{filename}{Colors.END}")
    except Exception as e:
        print(f"[ERROR] Failed to save playlist: {e}")

def run_interactive():
    print(f"{Colors.CYAN}{Colors.BOLD}=== GOALS365 LIVE STREAM SCRAPER ==={Colors.END}")
    print("Fetching today's schedule...")
    
    matches = fetch_all_matches()
    if not matches:
        print("No matches found in today's schedule.")
        return
        
    print("Verifying live stream statuses in background...")
    with ThreadPoolExecutor(max_workers=5) as executor:
        matches = list(executor.map(check_match_live_status, matches))
        
    print(f"\n{Colors.BOLD}Select a match to scrape:{Colors.END}")
    matches.sort(key=lambda x: (0 if x["status_id"] == 2 else (1 if x["status_id"] == 1 else 2)))
    
    for idx, m in enumerate(matches):
        status_label = ""
        if m["status_id"] == 2:
            if m["is_broadcasting"]:
                status_label = f"{Colors.GREEN}● LIVE (Siaran Aktif){Colors.END}"
            else:
                status_label = f"{Colors.YELLOW}○ LIVE (Menunggu Siaran){Colors.END}"
        elif m["status_id"] == 1:
            status_label = f"{Colors.CYAN}[{m['time']}]{Colors.END}"
        else:
            status_label = f"{Colors.RED}[SELESAI]{Colors.END}"
            
        stream_indicator = f" {Colors.BOLD}*Stream Available*{Colors.END}" if m["has_stream"] else ""
        print(f"{idx + 1:2d}. {status_label} {m['home']} vs {m['away']}{stream_indicator}")
        
    print(f"{len(matches) + 1:2d}. [Custom] Masukkan URL / Match ID Manual")
    
    try:
        sel = input(f"\nPilih nomor (1-{len(matches) + 1}): ").strip()
        sel_idx = int(sel) - 1
        
        if sel_idx == len(matches):
            manual_input = input("Masukkan URL / Match ID: ").strip()
            match_id = get_match_id(manual_input)
            match_name = "Custom Match"
        elif 0 <= sel_idx < len(matches):
            target_match = matches[sel_idx]
            match_id = target_match["id"]
            match_name = f"{target_match['home']} vs {target_match['away']}"
        else:
            print("Pilihan tidak valid.")
            return
    except ValueError:
        print("Input harus berupa angka.")
        return
        
    print(f"\nScraping streams for: {Colors.BOLD}{match_name}{Colors.END} ({match_id})")
    
    streams = get_streams_for_match(match_id)
    if not streams:
        print(f"{Colors.RED}[ERROR] Tidak ada stream yang ditemukan atau siaran belum ready.{Colors.END}")
        return
        
    print(f"\n{Colors.GREEN}Berhasil menemukan {len(streams)} stream:{Colors.END}")
    for s_idx, s in enumerate(streams):
        print(f"  {s_idx + 1}. [{s['label']}] {s['name']}")
        print(f"     URL: {s['url']}\n")
        
    while True:
        print(f"{Colors.BOLD}Menu Pilihan:{Colors.END}")
        print("1. Putar langsung di VLC Player")
        print("2. Export semua link ke playlist.m3u")
        print("3. Keluar")
        
        choice = input("Pilih menu (1-3): ").strip()
        if choice == "1":
            if len(streams) > 1:
                print("\nPilih stream untuk diputar:")
                for s_idx, s in enumerate(streams):
                    print(f"  {s_idx + 1}. [{s['label']}]")
                try:
                    stream_sel = int(input("Pilih nomor: ").strip()) - 1
                    if 0 <= stream_sel < len(streams):
                        play_in_vlc(streams[stream_sel]["url"])
                    else:
                        print("Pilihan tidak valid.")
                except ValueError:
                    print("Input harus berupa angka.")
            else:
                play_in_vlc(streams[0]["url"])
        elif choice == "2":
            export_to_m3u(streams, match_name)
        elif choice == "3":
            print("Selesai.")
            break
        else:
            print("Pilihan tidak valid.")

def main():
    if len(sys.argv) < 2:
        run_interactive()
    else:
        input_target = sys.argv[1]
        match_id = get_match_id(input_target)
        print(f"Target Match ID: {match_id}")
        
        streams = get_streams_for_match(match_id)
        if not streams:
            print("[ERROR] No streams found or not ready yet.")
            sys.exit(1)
            
        print(f"\nSUCCESSFULLY GENERATED PLAYABLE HLS URLS ({len(streams)}):\n")
        for idx, s in enumerate(streams):
            print(f"Stream #{idx + 1} [{s['label']}]: {s['name']}")
            print(f"{s['url']}\n")

if __name__ == "__main__":
    main()
