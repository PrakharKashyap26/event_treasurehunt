import { GameState } from './GameState.js';
import { Router } from './Router.js';

class GameApp {
    constructor() {
        this.state = new GameState();
        this.router = new Router('view-container');
        
        this.init();
    }

    init() {
        console.log("%c[SYSTEM INITIALIZED]", "color: #00ff41; font-weight: bold; background: #000; padding: 2px;");
        console.log("%cWARNING: Unauthorized access detected.", "color: #ff003c;");
        
        this.setupRoutes();
        
        // Start game at the appropriate route based on state
        this.router.navigate('terminal', { level: this.state.state.currentLevel });
    }

    setupRoutes() {
        // Define the main terminal route
        this.router.addRoute('terminal', (context) => {
            const div = document.createElement('div');
            div.className = 'terminal-view';
            div.innerHTML = `
                <div class="header">SYSTEM STATUS: COMPROMISED | CURRENT_LEVEL: 0x${context.level.toString(16).padStart(2, '0').toUpperCase()}</div>
                <div class="content" id="terminal-content">
                    <p class="glitch" style="color: var(--accent-red)">[BOOT SEQUENCE INITIATED]</p>
                    <p>Checking memory... OK</p>
                    <p>Loading kernel modules... OK</p>
                    <p>Mounting encrypted volume... <span style="color: var(--accent-red)">FAILED</span></p>
                    <br>
                    <p>WARNING: Core system integrity compromised.</p>
                    <p>Entity 'VaultKeeper' detected.</p>
                    <br>
                    <p style="color: var(--accent-cyan)">>>> CURRENT OBJECTIVE: DECRYPT LEVEL 1 ACCESS KEY <<<</p>
                    <p>The system is locked. You must find the hidden password to proceed.</p>
                    <p>Hint 1: Type <span style="color: var(--accent-cyan)">help</span> to list available investigative tools.</p>
                    <p>Hint 2: Type <span style="color: var(--accent-cyan)">inspect</span> to analyze the environment.</p>
                    <p>Hint 3: Once found, use <span style="color: var(--accent-cyan)">submit [password]</span> to proceed.</p>
                    <br>
                    <p>Awaiting input...</p>
                </div>
                <div class="input-line">
                    <span class="prompt">guest@unknown:~$</span>
                    <input type="text" id="terminal-input" autofocus autocomplete="off" spellcheck="false">
                </div>
            `;
            
            // Setup basic interaction logic for Phase 1
            setTimeout(() => {
                const input = div.querySelector('#terminal-input');
                const content = div.querySelector('#terminal-content');
                
                if (input && content) {
                    // Keep focus on input if user clicks inside terminal
                    div.addEventListener('click', () => input.focus());

                    input.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            const val = input.value.trim();
                            if (!val) return;
                            
                            input.value = '';
                            
                            // Echo user input
                            const userEcho = document.createElement('p');
                            userEcho.innerHTML = `<span class="prompt">guest@unknown:~$</span> ${val}`;
                            content.appendChild(userEcho);
                            
                            // Process command (Placeholder for Phase 3 parser)
                            const output = document.createElement('p');
                            const args = val.toLowerCase().split(' ');
                            const cmd = args[0];

                            if (cmd === 'help') {
                                output.innerHTML = 'Available commands: <span style="color: var(--accent-cyan)">help</span>, <span style="color: var(--accent-cyan)">clear</span>, <span style="color: var(--accent-cyan)">inspect</span>, <span style="color: var(--accent-cyan)">submit [password]</span><br>System core modules are currently offline.';
                            } else if (cmd === 'clear') {
                                content.innerHTML = '';
                                return;
                            } else if (cmd === 'inspect') {
                                output.innerHTML = `> Executing environment inspection...<br>No obvious vulnerabilities found on the surface.<br>Perhaps you should check the underlying document structure.`;
                            } else if (cmd === 'submit') {
                                if (args.length < 2) {
                                    output.innerHTML = `<span style="color: var(--accent-red)">ERROR: Missing password. Usage: submit [password]</span>`;
                                } else {
                                    // Hardcoded check for testing, to be replaced by the Anti-Cheat validation engine in Phase 3
                                    if (args[1] === 'obsidian_core') {
                                         output.innerHTML = `> Verifying password...<br><span style="color: var(--text-primary)">ACCESS GRANTED.</span> Level 1 unlocked.`;
                                    } else {
                                         output.innerHTML = `> Verifying password...<br><span style="color: var(--accent-red)">ACCESS DENIED.</span> Incorrect password.`;
                                    }
                                }
                            } else {
                                output.innerHTML = `Command not recognized: <span style="color: var(--accent-red)">${cmd}</span>`;
                            }
                            
                            content.appendChild(output);
                            content.scrollTop = content.scrollHeight; // Auto-scroll to bottom
                        }
                    });
                    input.focus();
                }
            }, 50);

            return div;
        });

        // Placeholder for a future corrupted dashboard route
        this.router.addRoute('dashboard', () => {
            const div = document.createElement('div');
            div.innerHTML = `<h1 class="glitch" style="color: var(--accent-red)">DASHBOARD CORRUPTED</h1>`;
            return div;
        });
    }
}

// Bootstrap application when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    window.app = new GameApp();
});
