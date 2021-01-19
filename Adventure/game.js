const levels = [

  //level 0
  ["goal", "blocker1", "", "", "",
  "blockforward", "blocker1", "", "", "rider",
  "", "obstacle2", "animate", "animate", "animate",
  "", "water", "", "", "",
  "", "blockside", "", "riderup", ""],

// level 1
  ["goal", "water","", "", "",
   "blockside", "water", "", "", "rider",
   "animate", "bridge animate", "animate", "animate", "animate",
   "", "water", "", "", "",
   "", "water", "riderup", "", ""],

];

const gridBoxes = document.querySelectorAll("#gameBoard div");
var currentLevel = 0; //starting level
var riderOn = false; //is the rider on?
var currentLocationOfRider = 0;

//start game
window.addEventListener("load", function () {
  loadLevel();
});

// load levels 0 - max level
function loadLevel() {
  let levelMap = levels[currentLevel];
  let animateBoxes;
  riderOn = false;
  console.log(gridBoxes.length);

  // load board
  for (var i = 0; i < gridBoxes.length; i++){
    gridBoxes[i].className = levelMap[i];
    if(levelMap[i].includes("riderup")) currentLocationOfRider = i;
  } // for

} // loadLevel