const vault = [

{
id: 0,

name: "BOOT",

mode: "LOW",

gate:
["09","8f","6b","cd","46"],

text:
`The machine only repeats what it hears.

Commands:
help
listen
reflect
repeat`
},

{
id: 1,

name: "NEGATIVE ROUTES",

mode: "MEDIUM",

gate:
["7f","92","aa","3c","ef"],

text:
`A routing failure occurred.

Dijkstra aborted.

One edge became negative.

Commands:
help
route
graph
trace`
},

{
id: 2,

name: "MEMORY PRESSURE",

mode: "HIGH",

gate:
["5a","8d","1f","b0","ce"],

text:
`The oldest untouched page vanished.

FIFO failed.

Recently used memory survived.

Commands:
help
memory
pages
trace`
}

];

let current = 0;

const output =
  document.getElementById("output");

const input =
  document.getElementById("input");

const level =
  document.getElementById("level");

const progress =
  document.getElementById("progress");

const difficulty =
  document.getElementById("difficulty");

const clock =
  document.getElementById("clock");

const terminal =
  document.getElementById("terminal");

let started =
  Date.now();

function now() {

  const elapsed =
    Math.floor(
      (Date.now() - started) / 1000
    );

  const mins =
    String(
      Math.floor(elapsed / 60)
    ).padStart(2, "0");

  const secs =
    String(elapsed % 60)
      .padStart(2, "0");

  clock.innerText =
    `${mins}:${secs}`;
}

setInterval(now, 1000);

function reveal(text, speed = 14) {

  output.innerText = "";

  let i = 0;

  const typing =
    setInterval(() => {

      output.innerText += text[i];

      i++;

      if (i >= text.length) {
        clearInterval(typing);
      }

    }, speed);
}

function stage() {

  const item =
    vault[current];

  if (!item) {

    terminal.classList.add(
      "glitch"
    );

    reveal(
`VAULT BREACHED

You escaped.

Or perhaps:

the system wanted
to be found.`,
      20
    );

    return;
  }

  level.innerText =
    `Layer ${current + 1}
     // ${item.name}`;

  progress.innerText =
    `${current + 1}/${vault.length}`;

  difficulty.innerText =
    item.mode;

  reveal(item.text);
}

function shell(cmd) {

  const logs = {

help:
`Available:
help
inspect
trace
listen
analyze`,

inspect:
`The system appears unstable.`,

trace:
`Packet corruption detected.`,

listen:
`The machine speaks in echoes.`,

analyze:
`False trail detected.`,

repeat:
`No transformation occurred.`,

reflect:
`Input mirrored successfully.`,

route:
`Negative edge detected.`,

graph:
`Shortest path assumptions violated.`,

memory:
`Recently touched pages survived.`,

pages:
`Victim page selected.`

  };

  return logs[cmd] ||
    null;
}

async function hash(data) {

  const encoded =
    new TextEncoder()
      .encode(data);

  const buffer =
    await crypto.subtle.digest(
      "SHA-256",
      encoded
    );

  return Array
    .from(
      new Uint8Array(buffer)
    )
    .map(x =>
      x
        .toString(16)
        .padStart(2, "0")
    )
    .join("");
}

async function auth(value) {

  const item =
    vault[current];

  const digest =
    await hash(
      value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "")
    );

  const lock =
    item.gate.join("");

  return digest.startsWith(lock);
}

async function execute(raw) {

  const cmd =
    raw
      .trim()
      .toLowerCase();

  if (!cmd) return;

  const result =
    shell(cmd);

  if (result) {

    output.innerText +=
`\n\n> ${cmd}

${result}`;

    return;
  }

  const access =
    await auth(cmd);

  if (access) {

    output.innerText +=
`\n\n> ${cmd}

ACCESS GRANTED`;

    current++;

    localStorage.setItem(
      "vault-state",
      current
    );

    setTimeout(
      stage,
      1200
    );

  } else {

    output.innerText +=
`\n\n> ${cmd}

ACCESS DENIED`;

    console.log(
      "False trail detected."
    );
  }
}

input.addEventListener(
  "keydown",
  async e => {

    if (e.key === "Enter") {

      await execute(
        input.value
      );

      input.value = "";
    }

  }
);

function rain() {

  const canvas =
    document.getElementById("matrix");

  const ctx =
    canvas.getContext("2d");

  canvas.width =
    window.innerWidth;

  canvas.height =
    window.innerHeight;

  const chars =
    "01";

  const size = 14;

  const columns =
    canvas.width / size;

  const drops =
    Array(
      Math.floor(columns)
    ).fill(1);

  function draw() {

    ctx.fillStyle =
      "rgba(0,0,0,0.08)";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.fillStyle =
      "#00ff99";

    ctx.font =
      `${size}px monospace`;

    for (
      let i = 0;
      i < drops.length;
      i++
    ) {

      const char =
        chars[
          Math.floor(
            Math.random() *
            chars.length
          )
        ];

      ctx.fillText(
        char,
        i * size,
        drops[i] * size
      );

      if (
        drops[i] * size >
          canvas.height &&
        Math.random() > 0.975
      ) {
        drops[i] = 0;
      }

      drops[i]++;
    }

    requestAnimationFrame(draw);
  }

  draw();
}

console.log(
  "Trust nothing."
);

console.log(
  "Not every clue is truthful."
);

const state =
  parseInt(
    localStorage.getItem(
      "vault-state"
    )
  );

if (!isNaN(state)) {
  current = state;
}

rain();

stage();