const input =
document.getElementById("commandInput");

const output =
document.getElementById("output");

const clueArea =
document.getElementById("clueArea");

const stages = [

{
answer:"echo",

clues:[

{
trigger:"help",
text:
`
AVAILABLE MODULES:

- repeat
- reflect
- listen
`
},

{
trigger:"listen",
text:
`
The machine returns
whatever enters unchanged.
`
},

{
trigger:"reflect",
text:
`
Reflection without transformation.
`
},

{
trigger:"repeat",
text:
`
Input equals output.
`
}

],

fake:[
"dijkstra",
"ping",
"print"
]
},

{
answer:"bellmanford",

clues:[

{
trigger:"route",
text:
`
Shortest path requested.
`
},

{
trigger:"repair",
text:
`
Negative cost detected.
`
},

{
trigger:"analyze",
text:
`
Dijkstra aborted.
`
},

{
trigger:"graph",
text:
`
Algorithm survives below zero.
`
}

],

fake:[
"bfs",
"dfs",
"dijkstra"
]
}

];

let currentStage = 0;

function loadStage(){

  output.innerHTML = "";

  clueArea.innerHTML = "";

  input.value = "";

  const fake =
  stages[currentStage].fake;

  console.log(
    "DEBUG:",
    fake[
      Math.floor(
        Math.random()*fake.length
      )
    ]
  );

}

function unlockNextStage(){

  currentStage++;

  if(currentStage >= stages.length){

    document.querySelector(".content")
    .innerHTML = `
      <div class="main-clue">
        SYSTEM ASCENSION COMPLETE
      </div>

      <div class="clue">
        You learned to investigate,
        not guess.
      </div>
    `;

    return;
  }

  document.getElementById("mainClue")
  .innerText =
  "Some routes fail when the debt becomes negative.";

  loadStage();

}

input.addEventListener(
"keydown",
function(e){

if(e.key !== "Enter") return;

const value =
input.value
.trim()
.toLowerCase();

output.innerHTML += `
<div>
>> ${value}
</div>
`;

input.value = "";

const stage =
stages[currentStage];

if(value === stage.answer){

  output.innerHTML += `
  <div class="success">
    ACCESS GRANTED
  </div>
  `;

  setTimeout(
    unlockNextStage,
    1500
  );

  return;
}

const clue =
stage.clues.find(
c => c.trigger === value
);

if(clue){

  const div =
  document.createElement("div");

  div.className = "clue";

  div.innerText = clue.text;

  clueArea.appendChild(div);

}else{

  output.innerHTML += `
  <div class="error">
    UNKNOWN COMMAND
  </div>
  `;
}

});

loadStage();

/*
Hidden clue:

VGhlIG1hY2hpbmUgc3BlYWtzIGluIGVjaG9lcw==

(base64)
*/