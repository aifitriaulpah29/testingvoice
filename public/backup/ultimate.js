/* =========================================================
  0. GLOBALS
========================================================= */
let matches = [];
let lastJSON = null;

// Safe parse localStorage notifiedMatches
let notifiedMatches;
try {
  notifiedMatches = new Set(JSON.parse(localStorage.getItem("notifiedMatches") || "[]"));
  if (!(notifiedMatches instanceof Set)) notifiedMatches = new Set(notifiedMatches);
} catch (e) {
  notifiedMatches = new Set();
  localStorage.removeItem("notifiedMatches");
}

let lastToastTime = 0;

/* =========================================================
  1. LOAD MATCHES DARI JSON
========================================================= */
async function loadMatchesJSON() {
  try {
    const response = await fetch('https://noneserv.pages.dev/api/matches.json?' + Date.now(), { cache: "no-store" });
    const newData = await response.json();
    
    // Cek apakah data berubah
    const newDataStr = JSON.stringify(newData);
    if (newDataStr !== lastJSON) {
      matches = newData;
      lastJSON = newDataStr;
      initControlsAndRender();
      
      // Jalankan checkUpcomingMatches segera setelah data baru diterima
      try { checkUpcomingMatches(); } catch (e) { /* ignore */ }
    }
  } catch (err) {
    console.error("error to load file.json:", err);
  }
}

/* =========================================================
  2. HELPER: FORMAT DATE - DIPERBAIKI DENGAN TIMEZONE
========================================================= */
const fmtDate = (iso) => {
  const d = new Date(iso);
  const tanggal = d.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const jam = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });
  
  // Dapatkan timezone offset pengunjung
  const timezoneOffset = d.getTimezoneOffset();
  const offsetHours = Math.abs(Math.floor(timezoneOffset / 60));
  const offsetMinutes = Math.abs(timezoneOffset % 60);
  const sign = timezoneOffset <= 0 ? '+' : '-';
  
  const timezoneString = `UTC${sign}${offsetHours}${offsetMinutes > 0 ? `:${offsetMinutes.toString().padStart(2, '0')}` : ''}`;
  
  return { 
    tanggal, 
    jam,
    timezone: timezoneString,
    jamWithTimezone: `${jam} ${timezoneString}`
  };
};

// ISO -> YYYY-MM-DD (Waktu Lokal Pengunjung)
function dateISOToYMD(iso) {
  if (!iso) return '';
  
  try {
    const d = new Date(iso);
    // Gunakan metode lokal untuk mendapatkan tanggal sesuai waktu pengunjung
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    
    return `${yyyy}-${mm}-${dd}`;
  } catch (e) {
    console.error("Error converting date:", e);
    return '';
  }
}

/* =========================================================
  3. ENSURE CONTROLS (buat kontrol jika belum ada)
========================================================= */
function ensureControls() {
  let searchInput = document.getElementById("searchInput");
  let competitionFilter = document.getElementById("competitionFilter");
  let statusFilter = document.getElementById("statusFilter");
  
  if (!searchInput || !competitionFilter || !statusFilter) {
    const wrap = document.querySelector('.wrap') || document.body;
    const existingControls = document.querySelector('.controls');
    
    if (!existingControls) {
      const controls = document.createElement('div');
      controls.className = 'controls';
      
      const inp = document.createElement('input');
      inp.id = 'searchInput';
      inp.placeholder = 'Search Team...';
      
      const comp = document.createElement('select');
      comp.id = 'competitionFilter';
      
      const st = document.createElement('select');
      st.id = 'statusFilter';
      
      controls.appendChild(inp);
      controls.appendChild(comp);
      controls.appendChild(st);
      
      const titleEl = wrap.querySelector('.title');
      if (titleEl && titleEl.nextSibling) {
        titleEl.parentNode.insertBefore(controls, titleEl.nextSibling);
      } else {
        wrap.insertBefore(controls, wrap.firstChild);
      }
    }
    
    searchInput = document.getElementById("searchInput");
    competitionFilter = document.getElementById("competitionFilter");
    statusFilter = document.getElementById("statusFilter");
  }
  
  return { searchInput, competitionFilter, statusFilter };
}

const { searchInput, competitionFilter, statusFilter } = ensureControls();

/* =========================================================
  4. CARD TEMPLATE - DIPERBAIKI DENGAN TIMEZONE
========================================================= */
function cardHTML(m, idx) {
  const { tanggal, jamWithTimezone } = fmtDate(m.dateISO);
  
  return `
    <a class="card ${m.bigmatch ? "bigmatch" : ""} card-clickable" 
       href="${m.link || "#"}"
       role="button"
       tabindex="0"
       data-comp="${m.competition}" 
       data-link="${m.link}" 
       data-time="${m.dateISO}" 
       data-always="${m.alwaysAccessible}" 
       data-showstart="${m.showStart}" 
       data-showend="${m.showEnd}">
       
      <div class="c-inner">
        <div class="c-top">
          <span class="match-date">${tanggal}</span>
          <div class="kickoff">${jamWithTimezone}</div>
          ${m.bigmatch ? '<span class="badge-bigmatch">🔥</span>' : ""}
        </div>
        <div class="c-mid">
          <div class="team">
            <span class="logot">
              <img alt="${m.home.name}" src="${m.home.logo}" loading="lazy">
            </span>
            <span class="name">${m.home.name}</span>
          </div>
          <div class="vs">VS</div>
          <div class="team">
            <span class="logot">
              <img alt="${m.away.name}" src="${m.away.logo}" loading="lazy">
            </span>
            <span class="name">${m.away.name}</span>
          </div>
        </div>
        <div class="c-bottom">
          <span class="badge-competition">🏆 ${m.competition}</span>
          <div class="countdown" 
               data-time="${m.dateISO}" 
               data-showend="${m.showEnd}" 
               data-competition="${m.competition}">
            Loading...
          </div>
        </div>
      </div>
    </a>
  `;
}

/* =========================================================
  5. TOAST NOTIFICATION (UPCOMING MATCHES)
========================================================= */
function saveNotified() {
  localStorage.setItem("notifiedMatches", JSON.stringify([...notifiedMatches]));
}

function showToast(messageLines) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';

  const msg = document.createElement('div');
  msg.className = 'toast-msg';
  messageLines.forEach(line => {
    const span = document.createElement('div');
    span.textContent = line;
    msg.appendChild(span);
  });

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '✖';
  closeBtn.addEventListener('click', () => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  });

  toast.appendChild(msg);
  toast.appendChild(closeBtn);
  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 100);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 6000);
}

function checkUpcomingMatches() {
  const now = Date.now();
  const upcomingMatches = [];

  matches.forEach((match, idx) => {
    if (!match.dateISO) return;
    const startTime = new Date(match.dateISO).getTime();
    const diff = startTime - now;
    const id = match.link || (match.dateISO + '::' + idx);
    if (diff > 0 && diff <= 5 * 60 * 1000 && !notifiedMatches.has(id)) {
      upcomingMatches.push(match);
      notifiedMatches.add(id);
    }
  });

  if (upcomingMatches.length > 0 && now - lastToastTime > 60 * 1000) {
    const messageLines = upcomingMatches.map(m => `⏳ ${m.home.name} vs ${m.away.name} will start soon!`);
    showToast(messageLines);
    lastToastTime = now;
    saveNotified();
  }
}

setInterval(checkUpcomingMatches, 60000);
checkUpcomingMatches();

/* =========================================================
  6. CALENDAR (ensure + handlers)
========================================================= */
let selectedDateFilter = null;

function ensureCalendar() {
  if (document.getElementById('calendarBtn')) return;
  
  const controls = document.querySelector('.controls');
  if (!controls) return;
  
  const wrapper = document.createElement('div');
  wrapper.className = 'calendar-wrapper';
  wrapper.id = 'calendarWrapper';
  
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'calendarBtn';
  btn.className = 'calendar-btn';
  btn.title = 'Choose date';
  btn.innerHTML = '📅';
  
  const input = document.createElement('input');
  input.type = 'date';
  input.id = 'calendarInput';
  input.className = 'calendar-input';
  
  wrapper.appendChild(btn);
  wrapper.appendChild(input);
  controls.insertBefore(wrapper, controls.firstChild);
}

ensureCalendar();

const calendarBtn = document.getElementById('calendarBtn');
const calendarInput = document.getElementById('calendarInput');

if (calendarBtn && calendarInput) {
  calendarBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // jika sudah memilih tanggal, klik lagi -> hapus filter
    if (calendarInput.value) {
      calendarInput.value = '';
      selectedDateFilter = null;
      calendarBtn.classList.remove('active');
      updateVisibility();
      return;
    }
    
    // buka native picker
    if (typeof calendarInput.showPicker === 'function') {
      calendarInput.showPicker();
    } else {
      calendarInput.focus();
      calendarInput.click();
    }
  });
  
  calendarInput.addEventListener('change', () => {
    selectedDateFilter = calendarInput.value || null;
    if (selectedDateFilter) calendarBtn.classList.add('active');
    updateVisibility();
  });
}

/* =========================================================
  7. RENDER SEMUA MATCHES - FIXED VERSION (MOBILE OPTIMIZED)
========================================================= */
let renderedCount = 0;
const batchSize = 20;
let lazyObserver = null;

function getGrid() {
  return document.getElementById('grid');
}

// Single global observer untuk animasi masuk - DIPERBAIKI
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-viewport');
      // Force load images untuk card yang visible
      const images = e.target.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        // Force browser untuk load image immediately
        if (img.complete === false) {
          img.loading = 'eager';
        }
      });
    }
  });
}, { 
  threshold: 0.05, // Lebih rendah untuk trigger lebih cepat
  rootMargin: '100px 0px' // Pre-load 100px sebelum masuk viewport
});

function renderBatch(list) {
  const grid = getGrid();
  if (!grid) return;
  
  const slice = list.slice(renderedCount, renderedCount + batchSize);
  
  slice.forEach((m, i) => {
    grid.insertAdjacentHTML("beforeend", cardHTML(m, renderedCount + i));
  });
  
  // Gunakan animObserver global untuk semua card baru
  document.querySelectorAll('.card:not(.observed)').forEach(c => {
    c.classList.add("observed");
    try { animObserver.observe(c); } catch (e) { /* ignore */ }
  });
  
  renderedCount += slice.length;
  
  // Pre-load images untuk card yang visible saat ini
  setTimeout(preloadVisibleImages, 50);
  
  // Restart countdown supaya countdown baru ikut aktif
  startCountdowns();

  // Periksa visibility controls setelah render
  updateControlsVisibility();
}

function renderAll() {
  const grid = getGrid();
  if (!grid) return;
  
  // Clear dengan method yang lebih smooth
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
  renderedCount = 0;
  
  // Urutkan matches
  const sortedMatches = matches
    .slice()
    .sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO));
  
  // Render batch pertama dengan immediate preload
  renderBatch(sortedMatches);
  
  // Preload images segera setelah render pertama
  setTimeout(() => {
    preloadVisibleImages();
    // Force check visibility untuk memastikan cards muncul
    setTimeout(updateVisibility, 100);
  }, 100);
  
  // Sentinel untuk lazy load - DIPERBAIKI
  let sentinel = document.getElementById("sentinel");
  if (!sentinel) {
    sentinel = document.createElement("div");
    sentinel.id = "sentinel";
    sentinel.style.height = "60px";
    sentinel.style.background = 'transparent';
    grid.after(sentinel);
  }
  
  // Observer sentinel - DIPERBAIKI
  if (lazyObserver) lazyObserver.disconnect();
  
  lazyObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && renderedCount < sortedMatches.length) {
      // Small delay untuk smooth scrolling experience
      setTimeout(() => {
        renderBatch(sortedMatches);
      }, 30);
    }
  }, {
    rootMargin: '250px 0px' // Lebih awal untuk mobile
  });
  
  lazyObserver.observe(sentinel);
}

// FUNGSI BARU: Preload images yang visible atau hampir visible - DIPERBAIKI
function preloadVisibleImages() {
  const grid = getGrid();
  if (!grid) return;
  
  const cards = grid.querySelectorAll('.card');
  const viewportHeight = window.innerHeight;
  
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    // Jika card dalam viewport atau akan masuk viewport (400px margin untuk mobile)
    const mobileMargin = window.innerWidth < 768 ? 400 : 300;
    if (rect.top < viewportHeight + mobileMargin && rect.bottom > -100) {
      const images = card.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        // Force image loading dengan berbagai cara
        if (img.loading === 'lazy') {
          img.loading = 'eager';
          // Tambahkan cache busting untuk force reload
          if (img.src && !img.src.includes('?')) {
            img.src = img.src + '?t=' + Date.now();
          }
        }
      });
      
      // Juga force card untuk show immediately
      if (card.classList.contains('show') && !card.classList.contains('in-viewport')) {
        card.classList.add('in-viewport');
      }
    }
  });
}

/* =========================================================
  8. UPDATE VISIBILITY (FILTER) - SEMUA SPORTS PAKAI SHOWEND
========================================================= */
function updateVisibility() {
  const now = Date.now();
  const compVal = (competitionFilter && competitionFilter.value) ? competitionFilter.value : 'all';
  const statusVal = (statusFilter && statusFilter.value) ? String(statusFilter.value).toLowerCase().trim() : 'all';
  const searchVal = (searchInput && searchInput.value) ? searchInput.value.toLowerCase() : '';
  
  let needsReordering = false;
  const liveBigmatchCards = [];
  const otherVisibleCards = [];
  
  document.querySelectorAll('.card').forEach(card => {
    const start = new Date(card.dataset.showstart).getTime();
    const end = new Date(card.dataset.showend).getTime();
    const target = new Date(card.dataset.time).getTime();
    const comp = card.dataset.comp || '';
    const always = card.dataset.always === "true";
    const isBigmatch = card.classList.contains("bigmatch");
    
    let visible = true;
    
    // === Filter kompetisi
    if (compVal !== 'all' && comp !== compVal) {
      visible = false;
    }
    
    // === Filter status
    if (statusVal !== 'all') {
      // upcoming: harus target > now
      if (statusVal === 'upcoming' && !(target > now)) {
        visible = false;
      }
      
      // live: SEMUA SPORTS PAKAI SHOWEND - 5 menit
      if (statusVal.includes('live')) {
        let maxEnd;
        
        // UNIFIED LOGIC: Semua sports pakai showEnd - 5 menit
        if (!isNaN(end)) {
          maxEnd = end - (1 * 60 * 1000);
        } else {
          maxEnd = target; // fallback
        }
        
        if (!(now >= target && now <= maxEnd)) {
          visible = false;
        }
      }
    }
    
    // === Filter pencarian
    if (searchVal) {
      const text = (comp + ' ' + card.innerText).toLowerCase();
      if (!text.includes(searchVal)) {
        visible = false;
      }
    }
    
    // === Filter tanggal
    if (selectedDateFilter) {
      const cardYMD = dateISOToYMD(card.dataset.time);
      
      if (cardYMD !== selectedDateFilter) {
        visible = false;
      }
    }
    
    // === TERAPKAN showStart & showEnd UNTUK SEMUA KASUS
    const startValid = !isNaN(start);
    const endValid = !isNaN(end);
    
    if (startValid && endValid) {
      if (now < start || now > end) {
        visible = false;
      }
    }
    
    // === Apply visibility ke DOM
    if (visible) {
      card.classList.remove('hide');
      card.classList.add('show');
      
      // Check if this card is currently live - SEMUA PAKAI SHOWEND
      let isLive = false;
      let maxEnd;
      
      // UNIFIED LOGIC: Semua sports pakai showEnd - 5 menit
      if (!isNaN(end)) {
        maxEnd = end - (1 * 60 * 1000);
      } else {
        maxEnd = target; // fallback
      }
      
      isLive = now >= target && now <= maxEnd;
      
      // Simpan status live sebelumnya untuk deteksi perubahan
      const wasLive = card.dataset.wasLive === "true";
      if (card.dataset.wasLive === undefined) {
        card.dataset.wasLive = "false";
      }
      
      // Hanya perlu reordering jika status live berubah
      if (isLive !== wasLive) {
        needsReordering = true;
        card.dataset.wasLive = isLive;
      }
      
      // Pisahkan card live bigmatch dari yang lainnya
      if (isLive && isBigmatch) {
        liveBigmatchCards.push({
          element: card,
          time: target
        });
      } else {
        otherVisibleCards.push({
          element: card,
          time: target
        });
      }
    } else {
      card.classList.remove('show');
      card.classList.add('hide');
      card.dataset.wasLive = "false";
    }
  });
  
  // === REORDER CARDS: Hanya jika diperlukan
  if (needsReordering && (liveBigmatchCards.length > 0 || otherVisibleCards.length > 0)) {
    liveBigmatchCards.sort((a, b) => a.time - b.time);
    otherVisibleCards.sort((a, b) => a.time - b.time);
    
    const allCardsInOrder = [...liveBigmatchCards, ...otherVisibleCards];
    const fragment = document.createDocumentFragment();
    allCardsInOrder.forEach(card => {
      fragment.appendChild(card.element);
    });
    
    grid.appendChild(fragment);
  }
  
  // 🔎 Tentukan mode untuk pesan kosong
  let mode = "today";
  if (statusVal.includes("live")) {
    mode = "live";
  } else if (statusVal === "upcoming") {
    mode = "upcoming";
  } else if (selectedDateFilter) {
    mode = "date";
  }
  
  // ✅ kirim juga searchVal agar bisa bedakan pesan
  checkIfNoMatches(mode, selectedDateFilter || null, searchVal);
  
  // ✅ Update filter kompetisi setelah card selesai diubah
  refreshCompetitionFilter();
  
  // ✅ Periksa visibility controls
  updateControlsVisibility();
}

/* =========================================================
  9. UPDATE VISIBILITY CONTROLS (DIPERBAIKI)
========================================================= */
function updateControlsVisibility() {
  const controls = document.querySelector('.controls');
  
  // Periksa apakah ada setidaknya satu match yang seharusnya ada (berdasarkan data matches)
  let anyCardShouldExist = false;
  const now = Date.now();
  
  matches.forEach(match => {
    const start = new Date(match.showStart).getTime();
    const end = new Date(match.showEnd).getTime();
    
    const startValid = !isNaN(start);
    const endValid = !isNaN(end);
    
    if (startValid && endValid) {
      // SEMUA SPORTS: gunakan showStart & showEnd langsung
      if (now >= start && now <= end) {
        anyCardShouldExist = true;
      }
    }
  });
  
  if (controls) {
    if (!anyCardShouldExist) {
      controls.style.display = 'none';
    } else {
      controls.style.display = 'flex';
    }
  }
}

/* =========================================================
  10. PESAN JIKA TIDAK ADA CARD YANG TAMPIL
========================================================= */
function checkIfNoMatches(mode = "today", selectedDate = null, searchVal = "") {
  const container = document.querySelector(".live-match-content") || grid.parentNode;
  const cards = container.querySelectorAll(".card");
  const visibleCards = Array.from(cards).filter(c => c.classList.contains("show"));
  
  let messageText = "";
  
  if (visibleCards.length === 0) {
    if (searchVal && searchVal.length > 0) {
      messageText = "❌ Not found!";
    } else if (mode === "live") {
      messageText = "⚠️ No match live for today.";
    } else if (mode === "upcoming") {
      messageText = "⚠️ No upcoming match for today.";
    } else if (mode === "date") {
      messageText = "⚠️ No matches scheduled for this date.";
    } else {
      messageText = "⚠️ No matches scheduled for today.";
    }
    
    let msg = document.querySelector(".no-schedule-msg");
    if (!msg) {
      msg = document.createElement("div");
      msg.className = "no-schedule-msg";
      msg.textContent = messageText;
      container.appendChild(msg);
    } else if (msg.textContent !== messageText) {
      msg.textContent = messageText;
    }
  } else {
    const msg = document.querySelector(".no-schedule-msg");
    if (msg) msg.remove();
  }


}

/* =========================================================
  11. EVENT LISTENER FILTER
========================================================= */
// Debounce helper
function debounce(fn, wait = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

// Gunakan debounce agar updateVisibility tidak dipanggil terlalu sering
if (searchInput) {
  searchInput.removeEventListener?.('input', updateVisibility);
  searchInput.addEventListener('input', debounce(() => updateVisibility(), 250));
}

competitionFilter?.addEventListener('change', updateVisibility);
statusFilter?.addEventListener('change', updateVisibility);

/* =========================================================
  12. COUNTDOWN PER MATCH - DIMODIFIKASI UNTUK BERBAGAI OLAHRAGA
========================================================= */
let countdownInterval = null;

function isSpecialSport(competition) {
  const comp = competition.toLowerCase();
  return (
    comp.includes("motogp") || 
    comp.includes("f1") || 
    comp.includes("formula 1") ||
    comp.includes("ufc") ||
    comp.includes("mma") ||
    comp.includes("boxing") ||
    comp.includes("badminton") ||
    comp.includes("volley") || comp.includes("volly") || comp.includes("voli") ||
    comp.includes("basket") || comp.includes("nba") ||
    comp.includes("tennis") ||
    comp.includes("esports") || comp.includes("dota") || comp.includes("lol") || comp.includes("valorant")
  );
}

function startCountdowns() {
  const cds = document.querySelectorAll('.countdown');
  
  function update() {
    cds.forEach(el => {
      const target = new Date(el.dataset.time).getTime();
      const now = Date.now();
      let diff = target - now;
      
      let maxEnd;
      const showEnd = new Date(el.dataset.showend).getTime();
      
      // UNIFIED LOGIC: Semua sports pakai showEnd - 5 menit
      if (!isNaN(showEnd)) {
        maxEnd = showEnd - (1 * 60 * 1000);
      } else {
        maxEnd = target; // fallback
      }
      
      // 🚫 Jika sudah lewat maxEnd → ended
      if (now > maxEnd) {
        el.textContent = "⚫ Match Ended";
        el.classList.remove("live");
        el.classList.add("ended");
        return;
      }
      
      // 🔴 Jika live
      if (now >= target && now <= maxEnd) {
        el.textContent = "🔴 Live Now";
        el.classList.add("live");
        el.classList.remove("ended");
        return;
      }
      
      // ⏳ Kalau belum mulai → countdown
      let d = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff %= 1000 * 60 * 60 * 24;
      
      let h = Math.floor(diff / (1000 * 60 * 60));
      diff %= 1000 * 60 * 60;
      
      let m = Math.floor(diff / (1000 * 60));
      diff %= 1000 * 60;
      
      let s = Math.floor(diff / 1000);
      
      el.textContent = d > 0 ? `${d}d ${h}h ${m}m ${s}s` : 
                       h > 0 ? `${h}h ${m}m ${s}s` : 
                       `${m}m ${s}s`;
      
      el.classList.remove("live", "ended");
    });
  }
  
  if (countdownInterval) clearInterval(countdownInterval);
  update();
  countdownInterval = setInterval(update, 1000);
}


/* =========================================================
  13. MULTI-LANGUAGE ALERT
========================================================= */
const messages = {
  'id': 'Link akan otomatis bisa di akses 30 menit sebelum event dimulai !',
  'en': 'The link will be accessible automatically 30 minutes before the event starts !',
  'fr': 'Le lien sera automatiquement accessible 30 minutes avant le début de lévénement !',
  'es': '¡El enlace estará disponible automáticamente 30 minutes sebelum que comience el evento !',
  'de': 'Der Link ist automatisch 30 Minuten vor Beginn der Veranstaltung zugänglich !',
  'ja': 'リンクはイベント開始の30分前から自動的にアクセス可能です！',
  'ko': '링크는 이벤트 시작 30분 전에 자동으로 접근할 수 있습니다 !',
  'ended-id': 'Pertandingan sudah berakhir!',
  'ended-en': 'The match has ended!',
  'ended-fr': 'Le match est terminé!',
  'ended-es': '¡El partido ha terminado!',
  'ended-de': 'Das Spiel ist beendet!',
  'ended-ja': '試合は終了しました！',
  'ended-ko': '경기가 종료되었습니다!'
};

function getVisitorLang() {
  // Mapping kecil untuk edge-case (jp->ja, kr->ko) dan fallback ke kode pertama
  const lang = (navigator.language || navigator.userLanguage || 'en').split('-')[0];
  const map = { jp: 'ja', kr: 'ko' };
  return map[lang] || lang;
}

function showAlert(type = "notyet") {
  const lang = getVisitorLang();
  let key = type === "ended" ? `ended-${lang}` : lang;
  let msg = messages[key] || messages[type === "ended" ? 'ended-en' : 'en'];
  
  // Handle no-link explicit message
  if (type === 'no-link') {
    msg = messages[lang] || messages['en'];
    msg = (lang === 'id') ? 'Maaf, link tidak tersedia.' : 'Sorry, link is not available.';
  }
  
  const alertMessageEl = document.getElementById('alertMessage');
  if (alertMessageEl) alertMessageEl.textContent = msg;
  
  const modal = document.getElementById('alertModal');
  if (modal) modal.classList.add('active');
}

function closeAlert() {
  const modal = document.getElementById('alertModal');
  if (modal) modal.classList.remove('active');
}

/* =========================================================
  14. INIT CONTROLS & RENDER (DITAMBAHKAN)
========================================================= */
function refreshCompetitionFilter() {
  // Pastikan competitionFilter sudah ada
  if (!competitionFilter) return;
  
  const now = Date.now();
  const statusVal = (statusFilter && statusFilter.value) ? String(statusFilter.value).toLowerCase().trim() : 'all';
  
  const comps = [...new Set(
    (matches || [])
      .filter(m => {
        const start = new Date(m.showStart).getTime();
        const end = new Date(m.showEnd).getTime();
        const startValid = !isNaN(start);
        const endValid = !isNaN(end);
        
        if (startValid && endValid) {
          if (now < start || now > end) {
            return false;
          }
        }
        
        return true;
      })
      .map(m => m.competition)
      .filter(Boolean)
  )];
  
  const selected = competitionFilter.value;
  const currentOptions = Array.from(competitionFilter.options).map(o => o.value);
  
  const hasChanged = comps.length + 1 !== currentOptions.length || !comps.every(c => currentOptions.includes(c));
  if (!hasChanged) return;
  
  competitionFilter.innerHTML = `<option value="all">All Events</option>` + 
    comps.map(c => `<option value="${c}">${c}</option>`).join('');
  
  if (selected && [...comps, "all"].includes(selected)) {
    competitionFilter.value = selected;
  }
}

function initControlsAndRender() {
  // Isi filter status
  statusFilter.innerHTML = `
    <option value="all">All Status</option>
    <option value="upcoming">Upcoming</option>
    <option value="live">Live Now</option>
  `;
  
  // Render pertama kali
  renderAll();
  updateVisibility();
}

/* =========================================================
  15. RUN APP (initial render + polling)
========================================================= */
setInterval(updateVisibility, 1000); // Cek status setiap detik
loadMatchesJSON(); // Load pertama
setInterval(loadMatchesJSON, 10000); // Refresh data tiap 10 detik

// Panggil sekali di awal untuk memastikan controls dalam state yang benar
setTimeout(updateControlsVisibility, 100);

/* =========================================================
  16. LOADING OVERLAY HANDLER
========================================================= */
function showLoadingOverlay(matchName, eventName, isReturning = false) {
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingText = document.getElementById('loadingText');
    const eventNameEl = document.getElementById('eventName');
    
    if (loadingOverlay && loadingText && eventNameEl) {
        if (isReturning) {
            loadingText.textContent = `Back to Card Schedule`;
            eventNameEl.textContent = 'Returning to matches list';
        } else {
            loadingText.textContent = `Redirecting To ${matchName}`;
            eventNameEl.textContent = eventName;
        }
        
        loadingOverlay.classList.add('active');
        
        // Auto hide setelah 5 detik (fallback)
        setTimeout(() => {
            loadingOverlay.classList.remove('active');
        }, 5000);
    }
}

function hideLoadingOverlay() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.remove('active');
    }
}

// Event listener untuk menutup loading overlay jika user klik di luar
document.addEventListener('click', (e) => {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay && loadingOverlay.classList.contains('active') && e.target === loadingOverlay) {
        hideLoadingOverlay();
    }
});

// TAMBAHKAN: Deteksi ketika halaman dimuat kembali (setelah back)
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        // Halaman dimuat dari cache (back button)
        showLoadingOverlay('', '', true);
        setTimeout(hideLoadingOverlay, 1500); // Tampilkan sebentar lalu sembunyikan
    }
});

/* =========================================================
  17. EVENT DELEGATION UNTUK KLIK CARD - SEMUA SPORTS PAKAI SHOWEND
========================================================= */
grid.addEventListener('click', (ev) => {
    const cardLink = ev.target.closest('.card-clickable');
    if (!cardLink) return;
    
    ev.preventDefault();
    ev.stopPropagation();
    
    const link = cardLink.dataset.link; 
    const always = cardLink.dataset.always === "true";
    const competition = cardLink.dataset.competition || "";
    const targetTime = new Date(cardLink.dataset.time).getTime();
    const showEnd = cardLink.dataset.showend ? new Date(cardLink.dataset.showend).getTime() : null;
    const showStart = cardLink.dataset.showstart ? new Date(cardLink.dataset.showstart).getTime() : null;
    const now = Date.now();
    
    if (!link || link === 'undefined' || link === 'null' || link === '') {
        console.warn('No valid link found for card');
        showAlert('no-link');
        return;
    }
    
    // Dapatkan nama match dari parent card
    const card = cardLink.closest('.card');
    const teamNames = card.querySelectorAll('.name');
    let matchName;
    const eventName = card.querySelector('.badge-competition')?.textContent || competition;
    
    if (isSpecialSport(competition)) {
        const homeName = teamNames[0]?.textContent || '';
        const awayName = teamNames[1]?.textContent || '';
        matchName = homeName === awayName ? homeName : `${homeName} vs ${awayName}`;
    } else {
        matchName = teamNames.length >= 2 ? 
            `${teamNames[0].textContent} vs ${teamNames[1].textContent}` : 'Pertandingan';
    }
    
    // 🎯 LOGIKA AKSESIBILITAS - SEMUA SPORTS PAKAI SHOWEND
    let maxEnd;
    let canAccess = false;
    let alertType = "notyet";
    
    // UNIFIED LOGIC: Semua sports pakai showEnd - 5 menit
    if (showEnd) {
        maxEnd = showEnd - (1 * 60 * 1000);
    } else {
        maxEnd = targetTime;
    }
    
    if (always) {
        canAccess = now <= maxEnd;
    } else {
        canAccess = now >= (targetTime - 30 * 60 * 1000) && now <= maxEnd;
    }
    
    if (now > maxEnd) {
        alertType = "ended";
    } else if (!always && now < targetTime - 30 * 60 * 1000) {
        alertType = "notyet";
    }
    
    if (!canAccess) {
        showAlert(alertType);
        return;
    }
    
    // 🎯 Redirect langsung
    showLoadingOverlay(matchName, eventName, false);
    window.location.href = link;
});

/* =========================================================
  18. IMMEDIATE EXECUTION & MOBILE OPTIMIZATION
========================================================= */

// Pastikan DOM sudah loaded sebelum execute
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
  });
} else {
  initializeApp();
}

function initializeApp() {
  // Initial load dan preload
  loadMatchesJSON();
  
  // Immediate preload untuk viewport
  setTimeout(preloadVisibleImages, 500);
  
  // Periodic preload setiap 2 detik selama 10 detik pertama
  let preloadInterval = setInterval(preloadVisibleImages, 2000);
  setTimeout(() => clearInterval(preloadInterval), 10000);
}

// Force preload saat user berinteraksi
document.addEventListener('touchstart', preloadVisibleImages);
document.addEventListener('mousemove', preloadVisibleImages);
