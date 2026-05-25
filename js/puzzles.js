// puzzles.js
// Handles client-side validation and specific puzzle logic
const PUZZLES = {
    validate(levelId, answer, expectedAnswer) {
        // Normalizing
        const normalizedAnswer = String(answer).toLowerCase().replace(/\s+/g, '');
        const normalizedExpected = String(expectedAnswer).toLowerCase().replace(/\s+/g, '');
        
        return normalizedAnswer === normalizedExpected;
    },
    
    // Injects dynamic clues based on level
    injectClues(levelId) {
        this.clearClues();
        
        const answer = AETHER.currentLevelData ? AETHER.currentLevelData.answer : "";
        if (!answer) return;
        
        switch(levelId) {
            case 1:
                // Clue is in HTML comment, already hardcoded in index.html
                break;
            case 2:
                // Inject CSS glitch clue
                const style = document.createElement('style');
                style.id = 'dynamic-clue';
                style.innerHTML = `.glitch::after { content: "${answer}" !important; }`;
                document.head.appendChild(style);
                break;
            case 3:
                // LocalStorage clue
                localStorage.setItem("aether_directive", `The answer is '${answer}'`);
                console.log("AETHER: Check your local storage.");
                break;
            case 4:
                // Cookie clue
                document.cookie = `aether_secret=${answer}; path=/; max-age=3600`;
                break;
            case 5:
                // Console log clue
                console.log(`%cAETHER TRANSMISSION: The key is '${answer}'`, "color: #00ff00; font-weight: bold;");
                break;
            case 6:
                // Custom attribute clue
                document.getElementById('terminal').setAttribute('data-secret', answer);
                break;
            case 9:
                // Hidden DOM element
                const hiddenDiv = document.createElement('div');
                hiddenDiv.id = 'dynamic-clue';
                hiddenDiv.style.display = 'none';
                hiddenDiv.innerText = answer;
                document.body.appendChild(hiddenDiv);
                break;
            case 10:
                // Global variable
                window.aether_key = answer;
                break;
            case 11:
                // CSS variable on root
                document.documentElement.style.setProperty('--aether-secret', `"${answer}"`);
                break;
            case 12:
                // Session Storage clue
                sessionStorage.setItem("aether_session_secret", answer);
                break;
            case 13:
                // Hash clue
                window.location.hash = answer;
                break;
            case 17:
                // Hidden link in DOM
                const hiddenLink = document.createElement('a');
                hiddenLink.id = 'dynamic-clue';
                hiddenLink.href = `#${answer}`;
                hiddenLink.style.display = 'none';
                document.body.appendChild(hiddenLink);
                break;
            case 21:
                // Custom class on input container
                document.getElementById('input-container').classList.add(answer);
                break;
            case 22:
                // Console warning
                console.warn(`AETHER WARNING: Access key detected -> '${answer}'`);
                break;
            case 23:
                // Global function
                window.getAetherKey = () => {
                    console.log(`AETHER key is: ${answer}`);
                };
                break;
            case 24:
                // Meta tag
                const meta = document.createElement('meta');
                meta.id = 'dynamic-clue';
                meta.name = 'aether-key';
                meta.content = answer;
                document.head.appendChild(meta);
                break;
            case 25:
                // Impossible level logic
                console.log("AETHER: THERE IS NO ESCAPE.");
                break;
        }
    },
    
    clearClues() {
        // Clear style clue
        const oldStyle = document.getElementById('dynamic-clue');
        if (oldStyle) oldStyle.remove();
        
        // Clear localStorage key
        localStorage.removeItem("aether_directive");
        
        // Clear cookie
        document.cookie = "aether_secret=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        
        // Clear attributes
        document.getElementById('terminal').removeAttribute('data-secret');
        
        // Clear global variables/functions
        delete window.aether_key;
        delete window.getAetherKey;
        
        // Clear CSS variables
        document.documentElement.style.removeProperty('--aether-secret');
        
        // Clear sessionStorage
        sessionStorage.removeItem("aether_session_secret");
        
        // Clear URL hash
        if (window.location.hash) {
            window.location.hash = "";
        }
        
        // Clear classes from input container
        const inputContainer = document.getElementById('input-container');
        if (inputContainer) {
            inputContainer.className = '';
        }
    }
};
