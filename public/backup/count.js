// AUTO COUNTDOWN FROM JSON SCHEDULE + COUNTDOWN MANAGER - OPTIMIZED FOR PERFORMANCE
class AdvancedCountdownManager {
    constructor() {
        this.countdowns = new Map();
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.jsonUrl = 'https://noneserv.pages.dev/api/matches.json';
        this.currentSchedule = null;
        this.lastScheduleHash = null;
        this.refreshInterval = null;
        
        this.init();
    }

    async init() {
        await this.loadScheduleData();
        this.initializeAllCountdowns();
        this.startScheduleAutoRefresh();
    }

    startScheduleAutoRefresh() {
        if (this.refreshInterval) clearInterval(this.refreshInterval);
        this.refreshInterval = setInterval(async () => {
            await this.checkScheduleUpdate();
        }, 30000);
    }

    async checkScheduleUpdate() {
        try {
            const newSchedule = await this.getCurrentPageSchedule();
            if (!newSchedule) return;

            const newHash = this.generateScheduleHash(newSchedule);
            
            if (newHash !== this.lastScheduleHash) {
                this.lastScheduleHash = newHash;
                this.currentSchedule = newSchedule;
                this.handleScheduleUpdate(newSchedule);
            }
        } catch (error) {}
    }

    generateScheduleHash(schedule) {
        return JSON.stringify({
            competition: schedule.competition,
            dateISO: schedule.dateISO,
            home: schedule.home.name,
            away: schedule.away.name,
            showStart: schedule.showStart,
            showEnd: schedule.showEnd
        });
    }

    handleScheduleUpdate(newSchedule) {
        const countdownElement = document.querySelector('.countdown-timer');
        const hasEndedOverlay = document.querySelector('.match-ended-overlay');
        
        if (hasEndedOverlay || !countdownElement) {
            console.log('[Count] Match revived or schedule updated from ended state. Reloading page...');
            window.location.reload();
            return;
        }
        
        this.applyMatchInfo(newSchedule);
        if (countdownElement && newSchedule.dateISO) {
            const currentKickoff = countdownElement.getAttribute('data-kickoff');
            if (currentKickoff !== newSchedule.dateISO) {
                countdownElement.setAttribute('data-kickoff', newSchedule.dateISO);
                
                if (window.handleScheduleUpdateFromCountJS) {
                    window.handleScheduleUpdateFromCountJS();
                } else if (window.forceStopVideoForScheduleUpdate) {
                    window.forceStopVideoForScheduleUpdate();
                } else if (window.stopVideoPlayback) {
                    window.stopVideoPlayback();
                }
                
                this.restartCountdownsWithNewTime(newSchedule.dateISO);
            }
        }
        
        const container = document.querySelector('.countdown-section');
        if (container) {
            this.updateLocalTimeDisplay(container, newSchedule.dateISO);
        }
    }
    
    restartCountdownsWithNewTime(newKickoffTime) {
        const newKickoffTimestamp = new Date(newKickoffTime).getTime();
        const now = Date.now();
        const timeLeft = newKickoffTimestamp - now;

        this.countdowns.forEach((countdown, countdownId) => {
            if (countdown.interval) clearInterval(countdown.interval);
            countdown.hasBeenHidden = true;
            this.countdowns.delete(countdownId);
        });

        // Transisi instan tanpa delay 1 detik agar tidak flicker
        if (timeLeft <= 15 * 60 * 1000) {
            if (window.showVideoImmediately) window.showVideoImmediately();
        } else {
            this.initializeAllCountdowns();
        }
    }

    async loadScheduleData() {
        try {
            const schedule = await this.getCurrentPageSchedule();
            if (schedule) {
                this.currentSchedule = schedule;
                this.lastScheduleHash = this.generateScheduleHash(schedule);
                this.applyScheduleToCountdown(schedule);
            } else {
                const countdownSection = document.querySelector('.countdown-section');
                if (countdownSection) {
                    this.forceMatchEnded = true;
                } else {
                    if (window.showVideoImmediately) window.showVideoImmediately();
                }
            }
        } catch (error) {
            if (window.showVideoImmediately) window.showVideoImmediately();
        }
    }
    
    async getCurrentPageSchedule() {
        try {
            const response = await fetch(this.jsonUrl + '?' + Date.now());
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const schedules = await response.json();
            const currentUrl = window.location.href;
            const normalizedCurrentUrl = this.normalizeUrl(currentUrl);
            
            return schedules.find(schedule => {
                if (!schedule.link) return false;
                const normalizedScheduleUrl = this.normalizeUrl(schedule.link);
                return normalizedScheduleUrl === normalizedCurrentUrl || 
                       normalizedCurrentUrl.split('?')[0] === normalizedScheduleUrl.split('?')[0] ||
                       this.extractPath(normalizedCurrentUrl) === this.extractPath(normalizedScheduleUrl);
            });
        } catch (error) {
            return null;
        }
    }

    extractPath(url) {
        const withoutProtocol = url.replace(/^https?:\/\//, '');
        return withoutProtocol.split('/').slice(1).join('/').split('?')[0];
    }

    normalizeUrl(url) {
        if (!url) return '';
        return url.replace(/\/$/, '').replace(/^https?:\/\//, '').replace(/^www\./, '').toLowerCase().trim();
    }

    applyScheduleToCountdown(schedule) {
        const countdownElement = document.querySelector('.countdown-timer');
        if (countdownElement && schedule.dateISO) {
            countdownElement.setAttribute('data-kickoff', schedule.dateISO);
            this.applyMatchInfo(schedule);
        }
    }

    adjustTeamNameFontSize() {
        document.querySelectorAll('.countdown-team-name').forEach(teamName => {
            const length = teamName.textContent.length;
            teamName.classList.remove('long-name', 'very-long-name');
            if (length > 25) teamName.classList.add('very-long-name');
            else if (length > 20) teamName.classList.add('long-name');
        });
    }

    applyMatchInfo(schedule) {
        const countdownContainer = document.querySelector('.countdown-container');
        if (!countdownContainer) return;

        let competitionEl = countdownContainer.querySelector('.countdown-competition, .countdown-competition-single');
        let homeTeamEl = countdownContainer.querySelector('.countdown-team:first-child .countdown-team-name');
        let awayTeamEl = countdownContainer.querySelector('.countdown-team:last-child .countdown-team-name');

        const isSingleSportEvent = schedule.home.name === schedule.away.name;

        if (!competitionEl) {
            const matchInfoHTML = isSingleSportEvent ? 
                `<div class="countdown-match-info"><div class="countdown-competition-single"></div></div>` :
                `<div class="countdown-match-info"><div class="countdown-competition"></div><div class="countdown-teams"><div class="countdown-team"><div class="countdown-team-name"></div></div><div class="countdown-vs">VS</div><div class="countdown-team"><div class="countdown-team-name"></div></div></div></div>`;
            
            const countdownTimer = countdownContainer.querySelector('.countdown-timer');
            if (countdownTimer) {
                countdownTimer.insertAdjacentHTML('beforebegin', matchInfoHTML);
                competitionEl = countdownContainer.querySelector('.countdown-competition, .countdown-competition-single');
                homeTeamEl = countdownContainer.querySelector('.countdown-team:first-child .countdown-team-name');
                awayTeamEl = countdownContainer.querySelector('.countdown-team:last-child .countdown-team-name');
            }
        }

        if (competitionEl && competitionEl.textContent !== schedule.competition) {
            competitionEl.textContent = schedule.competition;
        }
        
        if (!isSingleSportEvent) {
            if (homeTeamEl && homeTeamEl.textContent !== schedule.home.name) homeTeamEl.textContent = schedule.home.name;
            if (awayTeamEl && awayTeamEl.textContent !== schedule.away.name) awayTeamEl.textContent = schedule.away.name;
        } else if (competitionEl) {
            competitionEl.textContent = schedule.competition;
        }
    }

    initializeAllCountdowns() {
        document.querySelectorAll('.countdown-timer').forEach((element, index) => {
            const kickoffTime = element.getAttribute('data-kickoff');
            if (!kickoffTime && !this.forceMatchEnded) return;

            // Generate HTML structure for timer if empty
            if (element.children.length === 0) {
                element.innerHTML = `
                    <div class="time-unit"><div class="time-value-container"><span class="time-value">00</span><span class="time-value-old">00</span></div><span class="time-label">Days</span></div>
                    <div class="time-separator">:</div>
                    <div class="time-unit"><div class="time-value-container"><span class="time-value">00</span><span class="time-value-old">00</span></div><span class="time-label">Hours</span></div>
                    <div class="time-separator">:</div>
                    <div class="time-unit"><div class="time-value-container"><span class="time-value">00</span><span class="time-value-old">00</span></div><span class="time-label">Mins</span></div>
                    <div class="time-separator">:</div>
                    <div class="time-unit"><div class="time-value-container"><span class="time-value">00</span><span class="time-value-old">00</span></div><span class="time-label">Secs</span></div>
                `;
            }

            const kickoffTimestamp = kickoffTime ? new Date(kickoffTime).getTime() : 0;
            const timeValueElements = Array.from(element.querySelectorAll('.time-value'));
            const countdownId = `countdown-${index}`;
            
            this.countdowns.set(countdownId, {
                element: element,
                timeValueElements: timeValueElements,
                kickoffTime: kickoffTimestamp,
                container: element.closest('.countdown-section'),
                interval: null,
                hideThreshold: 15 * 60 * 1000,
                hasBeenHidden: false,
                originalKickoffTime: kickoffTime,
                previousValues: { days: "", hours: "", minutes: "", seconds: "" }
            });

            this.initializeSingleCountdown(countdownId);
        });
    }

    initializeSingleCountdown(countdownId) {
        const countdown = this.countdowns.get(countdownId);
        if (!countdown) return;

        if (this.forceMatchEnded) {
            this.showMatchEndedScreen(countdownId);
            return;
        }

        const now = Date.now();
        const timeLeft = countdown.kickoffTime - now;
        
        const matchEndTime = this.getMatchEndTime(this.currentSchedule, countdown.kickoffTime);
        const hasMatchEnded = now > matchEndTime;

        if (hasMatchEnded) {
            this.showMatchEndedScreen(countdownId);
        } else if (timeLeft <= countdown.hideThreshold || timeLeft <= 0) {
            this.hideCountdownImmediately(countdownId);
        } else {
            this.showCountdown(countdownId);
        }
    }

    showCountdown(countdownId) {
        const countdown = this.countdowns.get(countdownId);
        if (!countdown) return;

        this.hideVideoPlayer();
        if (window.stopVideoPlayback) window.stopVideoPlayback();
        
        if (countdown.container && !countdown.container.classList.contains('active')) {
            countdown.container.style.display = 'block';
            void countdown.container.offsetWidth;
            countdown.container.classList.add('active');
        }
        
        this.updateDisplay(countdownId);
        this.updateLocalTimeDisplay(countdown.container, countdown.originalKickoffTime);
        this.startCountdownLoop(countdownId);
    }

    startCountdownLoop(countdownId) {
        const countdown = this.countdowns.get(countdownId);
        if (!countdown) return;

        if (countdown.interval) clearInterval(countdown.interval);
        countdown.interval = setInterval(() => {
            if (!countdown.hasBeenHidden) {
                this.updateDisplay(countdownId);
            } else {
                clearInterval(countdown.interval);
            }
        }, 1000);
    }

    hideVideoPlayer() {
        const videoContainer = document.getElementById('container');
        if (videoContainer) {
            videoContainer.classList.remove('video-active');
        }
    }

    hideCountdownImmediately(countdownId) {
        const countdown = this.countdowns.get(countdownId);
        if (!countdown) return;

        this.shouldHideNow = true;
        if (countdown.interval) clearInterval(countdown.interval);
        
        const countdownSection = document.querySelector('.countdown-section');
        if (countdownSection && countdownSection.classList.contains('active')) {
            countdownSection.classList.add('transition-out');
            setTimeout(() => {
                countdownSection.classList.remove('active', 'transition-out');
                countdownSection.style.display = 'none';
            }, 600);
        }

        // Sinkronisasi dengan fungsi global server.js
        if (window.showVideoImmediately) {
            window.showVideoImmediately();
        } else if (window.showVideoPlayer) {
            window.showVideoPlayer();
        }
        
        countdown.hasBeenHidden = true;
        this.countdowns.delete(countdownId);
    }

    updateDisplay(countdownId) {
        const countdown = this.countdowns.get(countdownId);
        if (!countdown || countdown.hasBeenHidden) return;

        const now = Date.now();
        const timeLeft = countdown.kickoffTime - now;

        const matchEndTime = this.getMatchEndTime(this.currentSchedule, countdown.kickoffTime);
        const hasMatchEnded = now > matchEndTime;

        if (this.forceMatchEnded || hasMatchEnded) {
            this.showMatchEndedScreen(countdownId);
            return;
        }

        if (timeLeft <= countdown.hideThreshold) {
            this.hideCountdown(countdownId);
            return;
        }

        this.updateTimer(countdown, timeLeft);
        this.updateProgress(countdown.container, now, countdown.kickoffTime);
    }

    updateTimer(countdown, timeLeft) {
        const totalSeconds = Math.max(0, Math.floor(timeLeft / 1000));
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const vals = [
            days.toString().padStart(2, '0'),
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0')
        ];

        const keys = ['days', 'hours', 'minutes', 'seconds'];
        
        vals.forEach((val, i) => {
            const key = keys[i];
            const currentEl = countdown.timeValueElements[i];
            if (currentEl && countdown.previousValues[key] !== val) {
                const oldVal = countdown.previousValues[key] || "00";
                const oldEl = currentEl.parentElement.querySelector('.time-value-old');
                
                if (oldEl) {
                    oldEl.textContent = oldVal;
                    currentEl.textContent = val;
                    
                    // Trigger animation
                    currentEl.classList.remove('animate');
                    oldEl.classList.remove('animate');
                    void currentEl.offsetWidth; // Force reflow
                    currentEl.classList.add('animate');
                    oldEl.classList.add('animate');
                } else {
                    currentEl.textContent = val;
                }
                
                countdown.previousValues[key] = val;
            }
        });
    }

    updateLocalTimeDisplay(container, originalKickoffTime) {
        if (!container) return;
        const timeElement = container.querySelector('.local-time');
        if (!timeElement) return;

        try {
            const localDateTime = new Date(originalKickoffTime).toLocaleString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit', hour12: true, timeZoneName: 'short'
            });
            if (timeElement.textContent !== `Match starts: ${localDateTime}`) {
                timeElement.textContent = `Match starts: ${localDateTime}`;
            }
        } catch (error) {}
    }

    updateProgress(container, now, kickoffTime) {
        if (!container || !this.currentSchedule) return;

        // Ensure progress container has full structure
        const progContainer = container.querySelector('.progress-container');
        if (progContainer && progContainer.children.length <= 1) {
            progContainer.innerHTML = `
                <div class="progress-milestones">
                    <div class="milestone" data-label="Wait"></div>
                    <div class="milestone" data-label="Pre-Match"></div>
                    <div class="milestone" data-label="Live"></div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                    <div class="progress-percentage">0%</div>
                </div>
                <div class="progress-text">
                    <span class="progress-text-content">Preparing broadcast...</span>
                </div>
            `;
        }

        const showStartTime = this.currentSchedule.showStart ? 
            new Date(this.currentSchedule.showStart).getTime() : 
            kickoffTime - 86400000;
        
        const progress = Math.max(0, Math.min(100, ((now - showStartTime) / (kickoffTime - showStartTime)) * 100));

        const progressFill = container.querySelector('.progress-fill');
        const progressPercentage = container.querySelector('.progress-percentage');
        const progressTextContent = container.querySelector('.progress-text-content');

        if (progressFill) progressFill.style.width = progress + '%';
        if (progressPercentage) progressPercentage.textContent = `${Math.round(progress)}%`;
        
        if (progressTextContent) {
            let status = "Waiting for kick-off...";
            if (progress > 95) status = "Match about to start!";
            else if (progress > 50) status = "Pre-match preparations...";
            else if (progress > 25) status = "Broadcast soon...";
            
            if (progressTextContent.textContent !== status) {
                progressTextContent.textContent = status;
            }
        }
        
        // Update milestones
        const milestones = container.querySelectorAll('.milestone');
        milestones.forEach((m, idx) => {
            const mPos = (idx / (milestones.length - 1)) * 100;
            if (progress >= mPos) m.classList.add('active');
            else m.classList.remove('active');
        });
    }

    hideCountdown(countdownId) {
        this.hideCountdownImmediately(countdownId);
    }

    getMatchEndTime(schedule, kickoffTime) {
        if (schedule && schedule.showEnd) {
            return new Date(schedule.showEnd).getTime();
        }
        
        const urlStr = (schedule && schedule.link ? schedule.link : "").toLowerCase();
        const longEventKeywords = ["gp", "f1", "bad", "tenis", "tour", "olympic", "ufc", "box", "volley"];
        const isLongEvent = longEventKeywords.some(keyword => urlStr.includes(keyword));
        
        if (isLongEvent) {
            return kickoffTime + (12 * 60 * 60 * 1000);
        }
        
        return kickoffTime + (4 * 60 * 60 * 1000);
    }

    showMatchEndedScreen(countdownId) {
        const countdown = this.countdowns.get(countdownId);
        if (!countdown) return;

        this.shouldHideNow = true;
        if (countdown.interval) clearInterval(countdown.interval);
        
        const videoContainer = document.getElementById('container');
        const wasVideoActive = videoContainer && videoContainer.classList.contains('video-active');

        const renderOverlay = () => {
            this.hideVideoPlayer();
            if (window.stopVideoPlayback) window.stopVideoPlayback();
            
            if (countdown.container) {
                countdown.container.style.display = 'block';
                countdown.container.classList.add('active', 'match-ended');
                
                const isSingleSportEvent = this.currentSchedule && this.currentSchedule.home && this.currentSchedule.away && this.currentSchedule.home.name === this.currentSchedule.away.name;
                const matchTitle = isSingleSportEvent 
                    ? (this.currentSchedule ? this.currentSchedule.competition : "Event")
                    : (this.currentSchedule && this.currentSchedule.home && this.currentSchedule.away ? `${this.currentSchedule.home.name} vs ${this.currentSchedule.away.name}` : "Event");
                    
                const innerHTML = `
                    <div class="match-ended-overlay">
                        <div class="ended-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16 12l-4-4-4 4"></path><path d="M12 16V8"></path></svg>
                        </div>
                        <h2 class="ended-title">${matchTitle} Has Ended</h2>
                        <p class="ended-subtitle">Try to watch another match !</p>
                        <button class="ended-home-btn" onclick="window.location.href='/'">Return to Schedule</button>
                    </div>
                `;
                countdown.container.innerHTML = innerHTML;
            }
            
            countdown.hasBeenHidden = true;
            this.countdowns.delete(countdownId);
            
            if (!document.getElementById('match-ended-style')) {
                const style = document.createElement('style');
                style.id = 'match-ended-style';
                style.innerHTML = `
                    .match-ended-overlay {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        padding: 80px 40px;
                        background: linear-gradient(145deg, rgba(20,20,28,0.95), rgba(10,10,15,0.98));
                        border-radius: 24px;
                        border: 1px solid rgba(255,255,255,0.05);
                        text-align: center;
                        box-shadow: 0 20px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1);
                        animation: fadeInEnded 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                        max-width: 800px;
                        margin: 20px auto;
                        backdrop-filter: blur(20px);
                        -webkit-backdrop-filter: blur(20px);
                    }
                    .ended-icon {
                        width: 80px;
                        height: 80px;
                        color: #e2e8f0;
                        margin-bottom: 24px;
                        animation: pulseIcon 2s infinite ease-in-out;
                        filter: drop-shadow(0 0 15px rgba(255,255,255,0.2));
                    }
                    .ended-title {
                        font-size: 32px;
                        font-weight: 800;
                        color: #ffffff;
                        margin: 0 0 16px 0;
                        font-family: 'Inter', system-ui, sans-serif;
                        letter-spacing: -0.5px;
                        line-height: 1.2;
                    }
                    .ended-subtitle {
                        font-size: 18px;
                        color: #94a3b8;
                        margin: 0 0 40px 0;
                        font-weight: 400;
                    }
                    .ended-home-btn {
                        padding: 16px 36px;
                        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                        color: white;
                        border: none;
                        border-radius: 12px;
                        font-weight: 600;
                        font-size: 16px;
                        cursor: pointer;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
                        letter-spacing: 0.5px;
                    }
                    .ended-home-btn:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 8px 25px rgba(37, 99, 235, 0.5);
                        background: linear-gradient(135deg, #2563eb, #1e40af);
                    }
                    @media (max-width: 768px) {
                        .match-ended-overlay {
                            padding: 50px 20px;
                            border-radius: 16px;
                            margin: 10px;
                        }
                        .ended-icon {
                            width: 60px;
                            height: 60px;
                            margin-bottom: 20px;
                        }
                        .ended-title {
                            font-size: 24px;
                            margin-bottom: 12px;
                        }
                        .ended-subtitle {
                            font-size: 15px;
                            margin-bottom: 30px;
                        }
                        .ended-home-btn {
                            padding: 14px 28px;
                            font-size: 15px;
                        }
                    }
                    @keyframes fadeInEnded {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes pulseIcon {
                        0% { transform: scale(1); opacity: 0.8; }
                        50% { transform: scale(1.05); opacity: 1; filter: drop-shadow(0 0 20px rgba(255,255,255,0.4)); }
                        100% { transform: scale(1); opacity: 0.8; }
                    }
                `;
                document.head.appendChild(style);
            }
        };

        if (wasVideoActive) {
            videoContainer.style.opacity = '0';
            videoContainer.style.transition = 'opacity 0.6s ease';
            setTimeout(() => {
                videoContainer.style.display = 'none';
                videoContainer.style.opacity = '1';
                renderOverlay();
            }, 600);
        } else {
            renderOverlay();
        }
    }

    destroy() {
        if (this.refreshInterval) clearInterval(this.refreshInterval);
        this.countdowns.forEach(c => { if (c.interval) clearInterval(c.interval); });
        this.countdowns.clear();
    }
}

function initializeCountdown() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new AdvancedCountdownManager());
    } else {
        new AdvancedCountdownManager();
    }
}

initializeCountdown();