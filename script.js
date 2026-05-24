
const levels = [

{
riddle:
"Layer 1\n\nYou awaken inside a dead machine.\nA terminal flickers:\n\n'Packets are arriving.\nThey wait in order.\nThe first to enter must be the first to leave.\nName the structure controlling the gateway.'",
answer: "queue",
hint: "FIFO"
},

{
riddle:
"Layer 2\n\nThe gateway opens.\nInside, routers whisper:\n\n'To escape this network,\nyou must discover the path of minimum cost.\nNegative edges may exist.\nWhich algorithm survives here?'",
answer: "bellmanford",
hint: "Works with negative weights"
},

{
riddle:
"Layer 3\n\nThe shortest path reveals a hidden server.\nIts address is unreadable.\nA voice echoes:\n\n'Names are meaningless.\nTranslate the domain.\nWhat system converts names into IP addresses?'",
answer: "dns",
hint: "Internet phonebook"
},

{
riddle:
"Layer 4\n\nThe IP resolves.\nA locked process appears.\nTasks pile upward endlessly.\nOnly the most recent can leave first.\n\nName the structure.",
answer: "stack",
hint: "LIFO"
},

{
riddle:
"Layer 5\n\nThe stack collapses into fragments.\nA recursive signal appears:\n\n'Divide.\nSort.\nMerge.\nRepeat.'\n\nWhich algorithm speaks?",
answer: "mergesort",
hint: "Divide and conquer"
},

{
riddle:
"Layer 6\n\nSorted memory reveals corrupted processes.\nResources are deadlocking.\nA hidden protocol asks:\n\n'Find a safe state before allocation.\nWhich algorithm protects the system?'",
answer: "bankersalgorithm",
hint: "Operating Systems"
},

{
riddle:
"Layer 7\n\nThe system stabilizes.\nA browser opens.\nBut the warning reads:\n\n'Connection insecure.'\n\nYou must choose the secure protocol.",
answer: "https",
hint: "Encrypted web"
},

{
riddle:
"Layer 8\n\nThe encrypted tunnel leads into a forest.\nEvery node tries to remain balanced.\nTwo inventors guard the entrance.\n\nName their tree.",
answer: "avl",
hint: "Self-balancing BST"
},

{
riddle:
"Layer 9\n\nThe tree roots connect to transport channels.\nOne guarantees delivery.\nPackets lost will return.\nOrder is sacred.\n\nName the protocol.",
answer: "tcp",
hint: "Reliable transport"
},

{
riddle:
"Layer 10\n\nReliable transport unlocks source code.\nBut the machine cannot understand it.\n\n'Translate human logic into machine instructions.'\n\nWhat must execute?",
answer: "compiler",
hint: "High-level to machine code"
},

{
riddle:
"Layer 11\n\nThe compiled code enters a database vault.\nDependencies spread like infection.\nTransitive dependency must disappear.\n\nWhich normal form restores order?",
answer: "3nf",
hint: "Normalization"
},

{
riddle:
"Layer 12\n\nInside the vault lies a blockchain.\nBlocks cannot be forged.\nEvery block bears the same cryptographic mark.\n\nName the hashing algorithm.",
answer: "sha256",
hint: "Bitcoin"
},

{
riddle:
"Layer 13\n\nHashes flood the CPU.\nProcesses compete for execution.\nThe scheduler whispers:\n\n'Execute the process with shortest remaining time.'\n\nName the algorithm.",
answer: "srtf",
hint: "Preemptive scheduling"
},

{
riddle:
"Layer 14\n\nThe scheduler opens virtualization chambers.\nMachines run within machines.\n\n'Who controls the virtual worlds?'",
answer: "hypervisor",
hint: "VM manager"
},

{
riddle:
"Layer 15\n\nThe virtual world forms a graph.\nTraversal begins level by level.\nA queue guides the journey.\n\nName the traversal.",
answer: "bfs",
hint: "Breadth"
},

{
riddle:
"Layer 16\n\nTraversal reveals corrupted memory.\nBits have flipped.\nExtra parity must repair them.\n\nName the code.",
answer: "hammingcode",
hint: "Error correction"
},

{
riddle:
"Layer 17\n\nRecovered data points toward an ancient SQL terminal.\nA command blinks:\n\n'Remove the table completely.'\n\nType the command.",
answer: "drop",
hint: "DDL"
},

{
riddle:
"Layer 18\n\nThe deleted tables expose an API gateway.\nServers answer distant clients.\nThe architecture becomes clear.\n\nName the model.",
answer: "clientserver",
hint: "Distributed systems"
},

{
riddle:
"Layer 19\n\nThe gateway measures search efficiency.\nEach split halves the remaining space.\n\nState the complexity.",
answer: "logn",
hint: "Binary search"
},

{
riddle:
"Layer 20\n\nThe search locates hidden files.\nThey travel securely through SSH tunnels.\n\nName the protocol.",
answer: "sftp",
hint: "Secure file transfer"
},

{
riddle:
"Layer 21\n\nThe files overflow memory.\nPages must be replaced.\nThe oldest untouched memories fade first.\n\nWhich algorithm decides?",
answer: "lru",
hint: "Page replacement"
},

{
riddle:
"Layer 22\n\nOne surviving file contains plaintext secrets.\nThey must become unreadable.\n\nName the process.",
answer: "encryption",
hint: "Cryptography"
},

{
riddle:
"Layer 23\n\nEncrypted scripts awaken a runtime.\nBuilt upon Chrome's V8 engine,\nit escapes the browser.\n\nName it.",
answer: "nodejs",
hint: "JavaScript runtime"
},

{
riddle:
"Layer 24\n\nThe runtime creates an object.\nOnly one instance may ever exist.\n\nName the design pattern.",
answer: "singleton",
hint: "Creational pattern"
},

{
riddle:
"Layer 25\n\nThe final chamber opens.\nBeneath every abstraction,\nbeneath memory, processes, schedulers,\nand machines themselves...\n\nOne hidden layer controls all.\n\nName it.",
answer: "operatingsystem",
hint: "Kernel space"
}

];

let currentLevel = parseInt(localStorage.getItem("cse_level")) || 0;

const levelTitle = document.getElementById("levelTitle");
const riddleText = document.getElementById("riddleText");
const answerInput = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");
const progressText = document.getElementById("progressText");
const hintBox = document.getElementById("hintBox");
const gameCard = document.getElementById("gameCard");

function loadLevel() {

  if (currentLevel >= levels.length) {

    gameCard.innerHTML = `
      <div class="final-screen">
        <h1>🏆 You Escaped All 25 Layers</h1>

        <p>
          You survived one of the hardest Computer Science riddle vaults.<br><br>

          Algorithms.<br>
          Distributed Systems.<br>
          Operating Systems.<br>
          Cryptography.<br>
          Networking.<br>
          Theory of Computation.<br><br>

          Respect.
        </p>

        <div class="small">
          Progress is saved automatically.
        </div>
      </div>
    `;

    return;
  }

  const level = levels[currentLevel];

  levelTitle.innerText = `Layer ${currentLevel + 1}`;

  riddleText.innerText = level.riddle;

  progressText.innerText =
    `Progress: ${currentLevel + 1} / ${levels.length}`;

  answerInput.value = "";

  message.innerText = "";

  hintBox.style.display = "none";
}

function showHint() {
  hintBox.innerText = "💡 Hint: " + levels[currentLevel].hint;
  hintBox.style.display = "block";
}

submitBtn.addEventListener("click", () => {

  const userAnswer =
    answerInput.value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "");

  const correct =
    levels[currentLevel]
      .answer
      .toLowerCase();

  if (userAnswer === correct) {

    message.innerText = "✅ Correct. Next layer unlocked.";
    message.className = "success";

    currentLevel++;

    localStorage.setItem("cse_level", currentLevel);

    setTimeout(loadLevel, 1200);

  } else {

    message.innerText = "❌ Incorrect password.";
    message.className = "error";

    setTimeout(showHint, 2000);
  }

});

answerInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    submitBtn.click();
  }
});

loadLevel();