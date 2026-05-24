// script.js

const levels = [

{
riddle:
`Layer 1

You awaken inside a dead machine.

A terminal flickers:

"Packets are arriving.
They wait in order.
The first to enter
must be the first to leave.

Name the structure
controlling the gateway."`,

answer: "queue",

hint: "FIFO"
},

{
riddle:
`Layer 2

The gateway opens.

Routers whisper:

"To escape this network,
find the shortest path,
even if negative edges exist."

Which algorithm survives here?`,

answer: "bellmanford",

hint: "Shortest path with negative weights"
},

{
riddle:
`Layer 3

The path reveals a hidden server.

Its address is unreadable.

A voice echoes:

"Translate names
into machine destinations."

What system performs this?`,

answer: "dns",

hint: "Internet phonebook"
},

{
riddle:
`Layer 4

The server opens.

Processes pile upward endlessly.

Only the newest may leave first.

Name the structure.`,

answer: "stack",

hint: "LIFO"
},

{
riddle:
`Layer 5

The stack collapses into fragments.

A recursive signal appears:

"Divide.
Sort.
Merge.
Repeat."

Which algorithm speaks?`,

answer: "mergesort",

hint: "Divide and conquer"
},

{
riddle:
`Layer 6

Sorted memory reveals deadlocked resources.

The system asks:

"Find a safe state
before allocation."

Which algorithm protects the machine?`,

answer: "bankersalgorithm",

hint: "Operating Systems"
},

{
riddle:
`Layer 7

The system stabilizes.

A browser opens.

Warning:
"Connection insecure."

Choose the secure protocol.`,

answer: "https",

hint: "Encrypted web protocol"
},

{
riddle:
`Layer 8

The encrypted tunnel leads into a forest.

Every node struggles
to remain balanced.

Two inventors guard the entrance.

Name their tree.`,

answer: "avl",

hint: "Self-balancing BST"
},

{
riddle:
`Layer 9

The tree roots connect
to transport channels.

Packets lost will return.
Order is sacred.

Name the protocol.`,

answer: "tcp",

hint: "Reliable transport"
},

{
riddle:
`Layer 10

Reliable transport unlocks source code.

The machine cannot understand it.

"Translate human logic
into machine instructions."

What must execute?`,

answer: "compiler",

hint: "Programming Languages"
},

{
riddle:
`Layer 11

Compiled code enters a database vault.

Dependencies spread like infection.

Transitive dependency
must disappear.

Which normal form restores order?`,

answer: "3nf",

hint: "Database normalization"
},

{
riddle:
`Layer 12

Inside the vault lies a blockchain.

Every block bears
the same cryptographic mark.

Name the hashing algorithm.`,

answer: "sha256",

hint: "Used in Bitcoin"
},

{
riddle:
`Layer 13

Hashes flood the CPU.

Processes compete for execution.

"Execute the process
with shortest remaining time."

Name the scheduler.`,

answer: "srtf",

hint: "Preemptive scheduling"
},

{
riddle:
`Layer 14

The scheduler opens
virtualization chambers.

Machines run within machines.

Who controls these worlds?`,

answer: "hypervisor",

hint: "VM manager"
},

{
riddle:
`Layer 15

The virtual world forms a graph.

Traversal begins
layer by layer.

A queue guides the journey.

Name the traversal.`,

answer: "bfs",

hint: "Breadth First"
},

{
riddle:
`Layer 16

Traversal reveals corrupted memory.

Bits have flipped.

Extra parity must repair them.

Name the code.`,

answer: "hammingcode",

hint: "Error correction"
},

{
riddle:
`Layer 17

Recovered data reveals
an ancient SQL terminal.

A command blinks:

"Remove the table completely."

Type the command.`,

answer: "drop",

hint: "DDL"
},

{
riddle:
`Layer 18

Deleted tables expose
an API gateway.

Servers answer distant clients.

Name the architecture.`,

answer: "clientserver",

hint: "Distributed systems"
},

{
riddle:
`Layer 19

The gateway measures
search efficiency.

Each split halves
the remaining space.

State the complexity.`,

answer: "logn",

hint: "Binary search"
},

{
riddle:
`Layer 20

The search locates hidden files.

They travel securely
through SSH tunnels.

Name the protocol.`,

answer: "sftp",

hint: "Secure file transfer"
},

{
riddle:
`Layer 21

The files overflow memory.

Old pages fade first.

Which algorithm decides
what survives?`,

answer: "lru",

hint: "Page replacement"
},

{
riddle:
`Layer 22

One surviving file
contains plaintext secrets.

They must become unreadable.

Name the process.`,

answer: "encryption",

hint: "Cryptography"
},

{
riddle:
`Layer 23

Encrypted scripts awaken
a runtime.

Built upon Chrome's V8 engine,
it escapes the browser.

Name it.`,

answer: "nodejs",

hint: "JavaScript runtime"
},

{
riddle:
`Layer 24

The runtime creates an object.

Only one instance
may ever exist.

Name the design pattern.`,

answer: "singleton",

hint: "Creational pattern"
},

{
riddle:
`Layer 25

The final chamber opens.

Beneath memory,
processes,
schedulers,
and machines themselves...

One hidden layer controls all.

Name it.`,

answer: "operatingsystem",

hint: "Kernel space"
}

];

let currentLevel =
  parseInt(
    localStorage.getItem("cse_level")
  ) || 0;

const levelTitle =
  document.getElementById("levelTitle");

const riddleText =
  document.getElementById("riddleText");

const answerInput =
  document.getElementById("answerInput");

const submitBtn =
  document.getElementById("submitBtn");

const message =
  document.getElementById("message");

const progressText =
  document.getElementById("progressText");

const hintBox =
  document.getElementById("hintBox");

const gameCard =
  document.getElementById("gameCard");

const restartBtn =
  document.getElementById("restartBtn");

function loadLevel() {

  if (currentLevel >= levels.length) {

    gameCard.innerHTML = `
      <div class="final-screen">

        <h1>
          🏆 You Escaped All 25 Layers
        </h1>

        <p>
          You survived one of the hardest
          Computer Science puzzle vaults.

          <br><br>

          Algorithms.<br>
          Networking.<br>
          Operating Systems.<br>
          Cryptography.<br>
          Databases.<br>
          Distributed Systems.<br>

          <br>

          Respect.
        </p>

        <div class="small">
          Refresh the page to play again.
        </div>

      </div>
    `;

    return;
  }

  const level =
    levels[currentLevel];

  levelTitle.innerText =
    `Layer ${currentLevel + 1}`;

  riddleText.innerText =
    level.riddle;

  progressText.innerText =
    `Progress:
     ${currentLevel + 1}
     / ${levels.length}`;

  answerInput.value = "";

  message.innerText = "";

  hintBox.style.display = "none";
}

function showHint() {

  hintBox.innerText =
    "💡 Hint: " +
    levels[currentLevel].hint;

  hintBox.style.display = "block";
}

submitBtn.addEventListener(
  "click",
  () => {

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

      message.innerText =
        "✅ Correct. Next layer unlocked.";

      message.className =
        "success";

      currentLevel++;

      localStorage.setItem(
        "cse_level",
        currentLevel
      );

      setTimeout(
        loadLevel,
        1000
      );

    } else {

      message.innerText =
        "❌ Incorrect password.";

      message.className =
        "error";

      setTimeout(
        showHint,
        2000
      );
    }

  }
);

answerInput.addEventListener(
  "keypress",
  e => {

    if (e.key === "Enter") {
      submitBtn.click();
    }

  }
);

restartBtn.addEventListener(
  "click",
  () => {

    const confirmRestart =
      confirm(
        "Restart the entire game?"
      );

    if (confirmRestart) {

      localStorage.removeItem(
        "cse_level"
      );

      currentLevel = 0;

      loadLevel();

      message.innerText =
        "Game restarted.";

      message.className =
        "success";
    }

  }
);

loadLevel();