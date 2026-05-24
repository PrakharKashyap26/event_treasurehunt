// Better structure:
// NEVER use:
// answer: "queue"
//
// Instead:
// - store fragmented hashes
// - reconstruct at runtime
// - avoid obvious naming
// - make reverse engineering harder

const levels = [

{
id: 1,

name: "BOOT",

difficulty: "LOW",

gate:
[
"e3",
"b0",
"c4",
"42",
"98",
"fc"
],

text:
`The machine only repeats what it hears.

Commands available:
help
listen
reflect
repeat`
},

{
id: 2,

name: "NEGATIVE ROUTES",

difficulty: "MEDIUM",

gate:
[
"fa",
"34",
"9d",
"12",
"8b",
"aa"
],

text:
`A routing failure occurred.

Dijkstra aborted.

One edge became negative.

Commands available:
help
route
trace
graph`
},

{
id: 3,

name: "MEMORY PRESSURE",

difficulty: "HIGH",

gate:
[
"8f",
"c2",
"91",
"77",
"4e",
"da"
],

text:
`The oldest untouched page disappeared.

FIFO failed.

Recently used memory survived.

Commands available:
help
memory
pages
trace`
}

];

// ======================================
// Runtime validation
// ======================================

async function digest(input) {

  const encoded =
    new TextEncoder()
      .encode(input);

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

// ======================================
// Hidden matcher
// ======================================

async function verify(input, current) {

  const hashed =
    await digest(
      input
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "")
    );

  const target =
    levels[current]
      .gate
      .join("");

  return hashed.startsWith(target);
}

// ======================================
// Example usage
// ======================================

async function unlock(text) {

  const ok =
    await verify(
      text,
      currentLevel
    );

  if (ok) {

    output.innerText +=
`\n\nACCESS GRANTED`;

    currentLevel++;

    setTimeout(
      loadLevel,
      1000
    );

  } else {

    output.innerText +=
`\n\nACCESS DENIED`;

    console.log(
      "False trail detected."
    );
  }
}