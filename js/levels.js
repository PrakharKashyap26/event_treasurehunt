// levels.js
// Handles fetching and organizing level data
const LevelManager = {
    async fetchLevel(levelId) {
        try {
            const paddedId = String(levelId).padStart(2, '0');
            const response = await fetch(`levels/level${paddedId}.json`);
            if (!response.ok) {
                // If JSON is not accessible (e.g. CORS on local files without a server), fallback to an internal store or error
                throw new Error("Cannot fetch level JSON.");
            }
            return await response.json();
        } catch (error) {
            console.error("Fetch error:", error);
            // Fallback for local file execution without a server
            return this.getFallbackLevel(levelId);
        }
    },

    getFallbackLevel(levelId) {
        // Fallbacks in case fetch fails due to CORS or missing files
        const fallbacks = {
            1: {
                id: 1,
                title: "Initialization",
                story: "AETHER detects new operators... You are not supposed to be here. Or perhaps you are. Find the fragmented key.",
                answer: "ghost",
                hints: [
                    "Inspect the page source.",
                    "The answer is inside a comment."
                ],
                puzzleType: "html-comment"
            },
            2: {
                id: 2,
                title: "Obfuscation",
                story: "Interesting. You have basic competency. But can you see what is hidden in plain sight?",
                answer: "cipher",
                hints: [
                    "Look closely at the glitches.",
                    "CSS sometimes holds secrets."
                ],
                puzzleType: "css-pseudo"
            }
        };
        
        return fallbacks[levelId] || {
            id: levelId,
            title: "Data Corrupted",
            story: "AETHER has sealed this sector.",
            answer: "unsolvable",
            hints: ["There is nothing left here."]
        };
    }
};
