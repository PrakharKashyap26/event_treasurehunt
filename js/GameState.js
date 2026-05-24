export class GameState {
    constructor() {
        this.saveKey = 'tech_odyssey_save_v1';
        this.state = this.loadState() || this.getInitialState();
    }

    getInitialState() {
        return {
            currentLevel: 1,
            unlockedClues: [],
            history: [],
            flags: {} // General purpose flags for tracking player actions
        };
    }

    // Basic obfuscation to deter casual inspection of localStorage
    encodeState(stateObj) {
        try {
            const jsonString = JSON.stringify(stateObj);
            // Reversing the string and base64 encoding
            const reversed = jsonString.split('').reverse().join('');
            return btoa(reversed);
        } catch (e) {
            console.error("[SYSTEM ERROR] Failed to encode state.");
            return null;
        }
    }

    decodeState(encodedStr) {
        try {
            const reversed = atob(encodedStr);
            const jsonString = reversed.split('').reverse().join('');
            return JSON.parse(jsonString);
        } catch (e) {
            console.warn("[SYSTEM WARNING] Save state corrupted or unreadable. Booting to safe mode.");
            return null;
        }
    }

    loadState() {
        const saved = localStorage.getItem(this.saveKey);
        if (saved) {
            return this.decodeState(saved);
        }
        return null;
    }

    saveState() {
        const encoded = this.encodeState(this.state);
        if (encoded) {
            localStorage.setItem(this.saveKey, encoded);
        }
    }

    updateLevel(level) {
        this.state.currentLevel = level;
        this.saveState();
    }

    unlockClue(clueId) {
        if (!this.state.unlockedClues.includes(clueId)) {
            this.state.unlockedClues.push(clueId);
            this.saveState();
        }
    }

    setFlag(key, value) {
        this.state.flags[key] = value;
        this.saveState();
    }

    getFlag(key) {
        return this.state.flags[key];
    }
    
    reset() {
        this.state = this.getInitialState();
        this.saveState();
        console.log("[SYSTEM] State wiped.");
    }
}
