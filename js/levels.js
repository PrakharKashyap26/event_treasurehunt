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
        // Fallback indicating offline or local loading restrictions (CORS) without hardcoded secrets
        return {
            id: levelId,
            title: "OFFLINE MODE / CORS ERROR",
            story: "AETHER cannot load the level data. Please start a local web server (e.g. 'npx http-server' or Python's 'python -m http.server') to load levels correctly.",
            answer: "offline",
            hints: [
                "Local file system fetch is restricted by browser security policies.",
                "Serve the project directory via a web server."
            ],
            puzzleType: "offline"
        };
    }
};
