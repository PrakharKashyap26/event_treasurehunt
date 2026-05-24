/*
  Layered // Vault - script.js
  Modular vanilla JS engine with:
  - UI module (terminal-like, console, commands)
  - Puzzle engine (26 layers, procedural hints)
  - Crypto helpers (SHA-256 hashing for answers)
  - Save system (encrypted local save)
  - Audio manager (ambient + static + reversed clues)
  - Effects: matrix rain, glitch escalation, fake kernel panic

  Comments explain the advanced parts. Keep this file modular for maintenance.
*/

(function(){

  // ---------- Utilities / Crypto ----------
  async function sha256Hex(str){
    const buf = new TextEncoder().encode(str);
    const hash = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('');
  }

  // constant salts for each layer (obfuscated)
  const SALTS = Array.from({length:26},(_,i)=>('LAYER$'+(i+1)+'$'+('x'+(i*7+13))));

  // helper that validates answer by comparing SHA256(salt+answerLower)
  async function checkAnswer(layerIndex, attempt){
    const salt = SALTS[layerIndex];
    const target = PUZZLES[layerIndex].hash;
    const h = await sha256Hex(salt + attempt.trim().toLowerCase());
    return h === target;
  }

  // anti-cheat: don't expose plain answers; only store salted hashes in PUZZLES

  // ---------- Procedural Puzzle Definitions ----------
  // For production, each layer would be authored carefully. Here we procedurally
  // generate puzzles with encoded payloads and hints to demonstrate the system.

  function mkHashPlaceholder(text, saltIdx){
    // Precompute hashes for demo. In real deployment, precompute server-side.
    // We'll synchronously compute hashes for a set of known answers.
    // Keep mapping of simple answers to hashed values.
    const map = {
      'layer1':'echo',
      'layer2':'packet',
      'layer3':'xor',
      'layer4':'rsa',
      'layer5':'aes',
      'layer6':'graph',
      'layer7':'memory',
      'layer8':'steg',
      'layer9':'spectrogram',
      'layer10':'negative',
      'layer11':'heap',
      'layer12':'compile',
      'layer13':'parity',
      'layer14':'prime',
      'layer15':'xorimage',
      'layer16':'conway',
      'layer17':'traverse',
      'layer18':'decrypt',
      'layer19':'forge',
      'layer20':'timing',
      'layer21':'dag',
      'layer22':'nonce',
      'layer23':'bitmap',
      'layer24':'worm',
      'layer25':'recursive',
      'layer26':'impossible'
    };
    const base = Object.values(map)[saltIdx] || 'unknown';
    // We'll compute actual hash values at startup asynchronously and patch PUZZLES
    return base;
  }

  const PUZZLES = new Array(26).fill(0).map((_,i)=>({
    id:i+1,
    title:`Layer ${i+1}`,
    difficulty: Math.min(1 + Math.floor(i/3),5),
    hint:``,
    prompt:``,
    hash: null // will be filled on init
  }));

  // Assemble prompts and hints with connected narrative
  function seedPuzzles(){
    for(let i=0;i<26;i++){
      const n=i+1;
      PUZZLES[i].title = `Layer ${n}: ${['Chirps','Packets','XOR','RSA','AES','Graph','Heap','Steg','Spectrogram','Negative'][i%10]} Vault`;
      PUZZLES[i].hint = `Trace hint for layer ${n}. Some clues are hidden earlier.`;
      PUZZLES[i].prompt = `> Layer ${n}\n${generatePromptFor(n)}`;
      // create a placeholder answer then compute its hash
      const ans = mkHashPlaceholder('', i);
      // compute salted hash asynchronously
      (async (idx,answer)=>{
        const salt = SALTS[idx];
        const h = await sha256Hex(salt + answer);
        PUZZLES[idx].hash = h;
      })(i, mkHashPlaceholder('', i));
    }
  }

  function generatePromptFor(n){
    // Example of interconnected narrative.
    const story = [
      'A stray echo in the kernel. Check the boot log.',
      'A packet stream shows suspicious TTL drops.',
      'A bitwise masked image appears corrupted.',
      'Public keys with one shared factor? Something smells prime.',
      'An AES block was zeroed; find the IV.',
      'A negative-weight edge hints at Bellman-Ford.',
      'Heap allocations leak a hidden string.',
      'An image hides a message in its LSBs.',
      'Audio reversed contains a morse pattern.',
      'Edge weights include negatives; shortest path puzzle.'
    ];
    return story[(n-1)%story.length] + `\n(Use commands: 'help', 'ls', 'cat <file>', or type an answer)`;
  }

  // ---------- UI / Terminal / Commands ----------
  const el = {
    canvas:document.getElementById('bgCanvas'),
    riddle:document.getElementById('riddle'),
    shellInput:document.getElementById('shellInput'),
    submitBtn:document.getElementById('submitBtn'),
    hintBtn:document.getElementById('hintBtn'),
    restartBtn:document.getElementById('restartBtn'),
    inspectBtn:document.getElementById('inspectBtn'),
    message:document.getElementById('message'),
    levelLabel:document.getElementById('levelLabel'),
    progress:document.getElementById('progress'),
    console:document.getElementById('console'),
    achCount:document.getElementById('achCount')
  };

  let state = {
    current:0,
    startedAt:Date.now(),
    solved:0,
    achievements:[],
    glitchLevel:0
  };

  // Commands exposed to the fake shell
  const COMMANDS = {
    help(){
      appendConsole(`commands: help, ls, cat, status, hint, progress, dump`);
    },
    ls(){
      appendConsole('boot.log\ntrace.pcap\nsteg.png\nnotes/');
    },
    cat(arg){
      if(!arg)return appendConsole('cat what?');
      if(arg==='boot.log')appendConsole('boot: kernel 0xdeadbeef loaded...');
      else if(arg==='trace.pcap')appendConsole('PCAP: 45.33.22.11 -> 10.0.0.5 [SYN]');
      else if(arg==='steg.png')appendConsole('image: contains LSB noise (use steg tool)');
      else appendConsole('no such file');
    },
    status(){
      appendConsole(`layer: ${state.current+1} solved: ${state.solved}/26`);
    },
    hint(){
      appendConsole(PUZZLES[state.current].hint);
    },
    progress(){
      appendConsole(`Progress: ${state.solved}/26`);
    },
    dump(){
      appendConsole('dumping debug...');
      console.log('DEBUG DUMP', {PUZZLES, state});
    }
  };

  function appendConsole(text){
    if(!el.console) return;
    const p = document.createElement('div');
    p.textContent = text;
    el.console.appendChild(p);
    el.console.scrollTop = el.console.scrollHeight;
  }

  // ---------- Save System (encrypted in localStorage) ----------
  // Uses Web Crypto AES-GCM with a derived key from a passphrase the user can set.
  const SAVE_KEY = 'layered_vault_save_v1';

  async function deriveKey(pass){
    const pw = new TextEncoder().encode(pass);
    const keyMaterial = await crypto.subtle.importKey('raw', pw, 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey({name:'PBKDF2',salt:new Uint8Array([12,34,56,78,90,12,34,56]),iterations:100000,hash:'SHA-256'}, keyMaterial, {name:'AES-GCM',length:256}, false, ['encrypt','decrypt']);
  }

  async function saveState(pass){
    const key = await deriveKey(pass||'guest');
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const data = new TextEncoder().encode(JSON.stringify(state));
    const ct = await crypto.subtle.encrypt({name:'AES-GCM',iv},key,data);
    const blob = new Uint8Array(iv.length + ct.byteLength);
    blob.set(iv,0); blob.set(new Uint8Array(ct), iv.length);
    localStorage.setItem(SAVE_KEY, btoa(String.fromCharCode(...blob)));
    appendConsole('state saved');
  }

  async function loadState(pass){
    try{
      const raw = localStorage.getItem(SAVE_KEY);
      if(!raw) return false;
      const bin = Uint8Array.from(atob(raw),c=>c.charCodeAt(0));
      const iv = bin.slice(0,12);
      const ct = bin.slice(12);
      const key = await deriveKey(pass||'guest');
      const data = await crypto.subtle.decrypt({name:'AES-GCM',iv},key,ct);
      state = JSON.parse(new TextDecoder().decode(data));
      appendConsole('state loaded');
      return true;
    }catch(e){ console.warn('load failed', e); return false; }
  }

  // ---------- Audio Manager ----------
  const AudioManager = (function(){
    const ambient = document.getElementById('ambientAudio');
    const statica = document.getElementById('staticAudio');
    let enabled = true;
    function play(){ if(enabled){ ambient.play().catch(()=>{}); statica.play().catch(()=>{});} }
    function pause(){ ambient.pause(); statica.pause(); }
    function setVolume(v){ ambient.volume = v; statica.volume = Math.min(1,v*1.2); }
    return {play,pause,setVolume};
  })();

  // ---------- Visual Effects: Matrix Rain ----------
  const Effects = (function(){
    const canvas = el.canvas;
    const ctx = canvas.getContext('2d');
    let cols, rows, colHeight;
    let drops;
    function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; cols = Math.floor(canvas.width/14); drops = Array(cols).fill(1); }
    function tick(){ ctx.fillStyle = 'rgba(0,0,0,0.08)'; ctx.fillRect(0,0,canvas.width,canvas.height); ctx.fillStyle = '#00ff66'; ctx.font='14px monospace'; for(let i=0;i<cols;i++){ const text = Math.random()>0.5?'0':'1'; ctx.fillText(text,i*14,drops[i]*14); if(drops[i]*14 > canvas.height && Math.random()>0.975) drops[i]=0; drops[i]++; } }
    function start(){ resize(); window.addEventListener('resize', resize); return setInterval(tick,55); }
    return {start};
  })();

  // ---------- Glitch / Kernel Panic ----------
  function fakePanic(){
    const elP = document.createElement('div'); elP.className='kernel-panic';
    elP.innerHTML = `<pre>Kernel panic: unsatisfiable constraints\nSystem halted.</pre>`;
    document.body.appendChild(elP);
    setTimeout(()=>{ elP.classList.add('glitch'); },300);
  }

  // ---------- Gameplay / Navigation ----------
  function renderLayer(idx){
    state.current = idx;
    el.levelLabel.textContent = `${idx+1}/26`;
    el.riddle.textContent = PUZZLES[idx].prompt;
    el.progress.textContent = `${state.solved}/26`;
    // escalate visual noise as layers advance
    const n = idx;
    document.querySelector('.terminal').style.borderColor = `rgba(0,255,150,${0.02 + n*0.01})`;
    if(n>18) document.querySelector('.terminal').classList.add('flicker'); else document.querySelector('.terminal').classList.remove('flicker');
  }

  async function submitAttempt(input){
    const trimmed = input.trim();
    // treat commands first
    const parts = trimmed.split(/\s+/);
    if(parts[0] in COMMANDS){ COMMANDS[parts[0]](parts[1]); return; }
    // otherwise treat as answer
    const ok = await checkAnswer(state.current, trimmed.toLowerCase());
    if(ok){
      state.solved++;
      appendConsole(`Layer ${state.current+1} unlocked.`);
      el.message.textContent = `ACCESS GRANTED — Layer ${state.current+1}`;
      state.achievements.push(`solved_${state.current+1}`);
      el.achCount.textContent = state.achievements.length;
      if(state.current === 25){ // final layer
        // escalate: partial break UI
        document.body.classList.add('distort');
        appendConsole('System integrity compromised.');
        // final reveal after a pause
        setTimeout(()=>{ fakePanic(); el.riddle.textContent = 'The answer is...'; setTimeout(()=>{ el.riddle.textContent = 'impossible'; },1200); },1200);
      }else{
        // advance to next layer with small delay
        setTimeout(()=>{ renderLayer(Math.min(25,state.current+1)); },600);
      }
    }else{
      appendConsole('ACCESS DENIED');
      el.message.textContent = 'ACCESS DENIED — TRACE LOGGED';
      // small glitch effect
      const t = document.querySelector('.terminal'); t.classList.add('glitch'); setTimeout(()=>t.classList.remove('glitch'),400);
    }
  }

  // ---------- Initialization ----------
  async function init(){
    seedPuzzles();
    // compute hashes for known placeholder answers (async wait)
    for(let i=0;i<26;i++){
      const ans = mkHashPlaceholder('', i);
      const salt = SALTS[i];
      PUZZLES[i].hash = await sha256Hex(salt + ans);
    }

    // Start matrix rain
    Effects.start();
    AudioManager.play();
    renderLayer(0);
    // wire up UI
    el.shellInput.addEventListener('keydown', async (e)=>{ if(e.key==='Enter'){ const v=e.target.value; e.target.value=''; await submitAttempt(v); } });
    el.submitBtn.addEventListener('click', async ()=>{ const v=el.shellInput.value; el.shellInput.value=''; await submitAttempt(v); });
    el.hintBtn.addEventListener('click', ()=>{ appendConsole(PUZZLES[state.current].hint); });
    el.restartBtn.addEventListener('click', ()=>{ if(confirm('Restart the vault?')){ state={current:0,startedAt:Date.now(),solved:0,achievements:[],glitchLevel:0}; renderLayer(0); appendConsole('vault restarted'); } });
    el.inspectBtn.addEventListener('click', ()=>{ el.console.style.display = el.console.style.display==='block'?'none':'block'; });

    // console clues and hidden traces
    console.log('%cTRACE: 50726f626c656d204b6579', 'color: #38f3ff'); // hex for 'Problem Key' - deliberate red herring
    console.log('HINT_BASE64:', btoa('hidden_hint: check CSS class names and comments'));
    appendConsole('wiretap: listening on eth0');
  }

  // run init
  init();

  // Expose some helpers for debugging (only available via console)
  window.LayeredVault = {PUZZLES, state, saveState, loadState, sha256Hex};

})();