// game.js
const AETHER = {
    state: {
        currentLevel: 1,
        startTime: null,
        phase: 'initialization'
    },
    
    currentLevelData: null,
    
    init() {
        this.loadState();
        this.setupEventListeners();
        this.startTimer();
        this.loadLevel(this.state.currentLevel);
        console.log("AETHER IS OBSERVING");
    },
    
    loadState() {
        const saved = localStorage.getItem('aether_state');
        if (saved) {
            this.state = JSON.parse(saved);
        } else {
            this.state.startTime = Date.now();
            this.saveState();
        }
    },
    
    saveState() {
        localStorage.setItem('aether_state', JSON.stringify(this.state));
        localStorage.setItem('phase', this.state.phase);
    },
    
    setupEventListeners() {
        const input = document.getElementById('answer-input');
        input.addEventListener('keydown', (e) => {
            this.initAudio(); // Initialize audio on first key press
            if (e.key === 'Enter') {
                const answer = input.value.trim();
                if (answer) {
                    this.processAnswer(answer);
                    input.value = '';
                }
            }
        });
        
        document.addEventListener('click', () => {
            this.initAudio();
            input.focus();
        });
    },
    
    initAudio() {
        if (!this.audioInitialized) {
            const ambient = document.getElementById('ambient-audio');
            if (ambient) {
                ambient.volume = 0.2;
                // Since we don't have the actual mp3, this might fail, but it's structure for when assets are added
                ambient.play().catch(e => console.log("Audio play prevented or missing asset."));
            }
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            this.audioInitialized = true;
        }
    },
    
    startTimer() {
        setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.state.startTime) / 1000);
            const h = String(Math.floor(elapsed / 3600)).padStart(2, '0');
            const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
            const s = String(elapsed % 60).padStart(2, '0');
            document.getElementById('timer').innerText = `${h}:${m}:${s}`;
        }, 1000);
    },
    
    async loadLevel(levelId) {
        this.printLog(`[SYSTEM] INITIALIZING SECTOR ${levelId}...`, "system-msg");
        
        try {
            this.currentLevelData = await LevelManager.fetchLevel(levelId);
            this.renderLevel(this.currentLevelData);
            PUZZLES.injectClues(levelId);
        } catch (error) {
            this.printLog("ERROR: Unable to load sector data. AETHER protocol restricted.", "warning-msg");
        }
    },
    
    renderLevel(levelData) {
        document.getElementById('level-display').innerText = `L${String(levelData.id).padStart(2, '0')} // ${levelData.title.toUpperCase()}`;
        
        const container = document.getElementById('story-output');
        container.innerHTML = '';
        
        this.typeWriterEffect(levelData.story, container, "system-msg");
        
        const hintContainer = document.getElementById('level-hints');
        hintContainer.innerHTML = '';
        if (levelData.hints) {
            setTimeout(() => {
                levelData.hints.forEach((hint) => {
                    const hintEl = document.createElement('div');
                    hintEl.innerText = `> ${hint}`;
                    hintEl.className = 'log-entry';
                    hintContainer.appendChild(hintEl);
                });
            }, levelData.story.length * 30 + 500);
        }
    },
    
    processAnswer(answer) {
        this.printLog(`> ${answer}`);
        
        if (!this.currentLevelData) return;
        
        if (PUZZLES.validate(this.state.currentLevel, answer, this.currentLevelData.answer)) {
            this.printLog("ACCESS GRANTED. DECRYPTING NEXT PROTOCOL...", "system-msg");
            this.state.currentLevel++;
            
            if(this.state.currentLevel > 10) this.state.phase = 'observation';
            if(this.state.currentLevel > 20) this.state.phase = 'manipulation';
            
            this.saveState();
            setTimeout(() => this.loadLevel(this.state.currentLevel), 1500);
        } else {
            this.printLog("ACCESS DENIED. INCORRECT HASH.", "warning-msg");
            this.triggerGlitch();
        }
    },
    
    printLog(msg, className = "") {
        const container = document.getElementById('story-output');
        const div = document.createElement('div');
        div.className = `log-entry ${className}`;
        div.innerText = msg;
        container.appendChild(div);
        
        this.scrollToBottom();
    },
    
    scrollToBottom() {
        const mainOutput = document.getElementById('output-container');
        mainOutput.scrollTop = mainOutput.scrollHeight;
    },
    
    typeWriterEffect(text, element, className = "") {
        const div = document.createElement('div');
        div.className = `log-entry ${className}`;
        element.appendChild(div);
        
        let i = 0;
        const speed = 30;
        
        const type = () => {
            if (i < text.length) {
                div.innerHTML += text.charAt(i);
                i++;
                this.scrollToBottom();
                setTimeout(type, speed);
            }
        };
        type();
    },
    
    triggerGlitch() {
        const body = document.body;
        const originalBg = body.style.backgroundColor;
        body.style.backgroundColor = "#ff0000";
        this.playGlitchSound();
        setTimeout(() => {
            body.style.backgroundColor = originalBg;
        }, 50);
        setTimeout(() => {
            body.style.backgroundColor = "#ff0000";
        }, 100);
        setTimeout(() => {
            body.style.backgroundColor = originalBg;
        }, 150);
    },
    
    playGlitchSound() {
        if (!this.audioCtx) return;
        const oscillator = this.audioCtx.createOscillator();
        const gainNode = this.audioCtx.createGain();
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(100 + Math.random() * 500, this.audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(10, this.audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.1);
        oscillator.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);
        oscillator.start();
        oscillator.stop(this.audioCtx.currentTime + 0.1);
    }
};

window.onload = () => AETHER.init();
