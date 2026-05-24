// script.js

const levels = [

{
riddle:
"In a directed graph with weighted edges, I guarantee shortest paths only if no edge relaxes after |V|-1 iterations. Name the algorithm.",
answer: "bellmanford",
hint: "Negative weights are allowed."
},

{
riddle:
"I am the CPU scheduling algorithm whose average waiting time is optimal in theory but impossible to implement perfectly without future knowledge.",
answer: "sjf",
hint: "Shortest ___ First"
},

{
riddle:
"In database normalization, I remove partial dependency but still allow transitive dependency. Which normal form am I?",
answer: "2nf",
hint: "Second Normal Form"
},

{
riddle:
"I am the attack where branch predictor timing leaks cryptographic secrets from speculative execution.",
answer: "spectre",
hint: "2018 CPU vulnerability"
},

{
riddle:
"I am the consistency model where writes become visible in the same order to all processors.",
answer: "sequentialconsistency",
hint: "Stronger than causal consistency"
},

{
riddle:
"In operating systems, I occur when a process keeps waiting forever due to unfair scheduling.",
answer: "starvation",
hint: "Opposite of fairness"
},

{
riddle:
"I am the theorem proving no distributed consensus algorithm can tolerate even one faulty process in a fully asynchronous system.",
answer: "flpimpossibility",
hint: "Named after Fischer, Lynch, and Paterson"
},

{
riddle:
"I am the hashing collision attack exploiting the birthday paradox.",
answer: "birthdayattack",
hint: "Probability paradox"
},

{
riddle:
"I naturally produces postfix notation in expression trees.",
answer: "postorder",
hint: "Tree traversal"
},

{
riddle:
"I am the lock-free synchronization primitive abbreviated CAS.",
answer: "compareandswap",
hint: "Atomic hardware operation"
},

{
riddle:
"I am the database isolation anomaly where two transactions overwrite each other unknowingly.",
answer: "lostupdate",
hint: "Concurrency issue"
},

{
riddle:
"I am the page replacement algorithm suffering from Belady’s anomaly.",
answer: "fifo",
hint: "First In..."
},

{
riddle:
"I am the routing protocol using split horizon and poison reverse.",
answer: "rip",
hint: "Distance vector routing"
},

{
riddle:
"I am the complexity class containing problems verifiable in polynomial time.",
answer: "np",
hint: "P vs ?"
},

{
riddle:
"I prevent deadlocks by forcing resource requests in increasing numerical order.",
answer: "resourceordering",
hint: "Deadlock prevention technique"
},

{
riddle:
"I am the normal form removing multivalued dependencies.",
answer: "4nf",
hint: "Beyond BCNF"
},

{
riddle:
"I am the compiler optimization where repeated expressions are computed once.",
answer: "commonsubexpressionelimination",
hint: "Optimization acronym: CSE"
},

{
riddle:
"I redirect LAN traffic using fake ARP replies.",
answer: "arpspoofing",
hint: "MITM attack"
},

{
riddle:
"I state a language is regular iff its equivalence relation has finite index.",
answer: "myhillnerode",
hint: "Automata theory theorem"
},

{
riddle:
"I am the distributed systems problem involving unreliable communication between generals.",
answer: "twogeneralsproblem",
hint: "Classic impossibility proof"
},

{
riddle:
"I am the cache coherence protocol with states Modified, Exclusive, Shared, Invalid.",
answer: "mesi",
hint: "4-state protocol"
},

{
riddle:
"I combine momentum and adaptive learning rates in deep learning optimization.",
answer: "adam",
hint: "Popular optimizer"
},

{
riddle:
"I am the cryptographic vulnerability caused by nonce reuse in stream ciphers.",
answer: "noncereuse",
hint: "Never repeat random values"
},

{
riddle:
"I exploit overlapping subproblems and optimal substructure.",
answer: "dynamicprogramming",
hint: "Memoization"
},

{
riddle:
"I am the consensus algorithm designed as a simpler alternative to Paxos.",
answer: "raft",
hint: "Used in etcd and Kafka ecosystem"
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