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
        
        switch(levelId) {
            case 1:
                // Clue is in HTML comment, already hardcoded in index.html
                break;
            case 2:
                // Inject CSS glitch clue
                const style = document.createElement('style');
                style.id = 'dynamic-clue';
                style.innerHTML = `.glitch::after { content: "cipher" !important; }`;
                document.head.appendChild(style);
                break;
            case 3:
                // LocalStorage clue
                localStorage.setItem("aether_directive", "The answer is 'void'");
                console.log("AETHER: Check your local storage.");
                break;
            case 25:
                // Impossible level logic
                console.log("AETHER: THERE IS NO ESCAPE.");
                break;
        }
    },
    
    clearClues() {
        const oldStyle = document.getElementById('dynamic-clue');
        if (oldStyle) oldStyle.remove();
        localStorage.removeItem("aether_directive");
    }
};
