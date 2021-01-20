const levels = [

  //level 0
  ["goal", "blocker1", "", "", "",
  "blockforward", "blocker1", "", "", "rider",
  "", "obstacle2", "animate", "animate", "animate",
  "", "water", "", "", "",
  "", "blockside", "", "riderup", ""],

// level 1
  ["goal", "water","", "", "",
   "blockforward", "water", "", "", "rider",
   "animate", "bridge animate", "animate", "animate", "animate",
   "", "water", "", "", "",
   "", "water", "riderup", "", ""],

];

const gridBoxes = document.querySelectorAll("#gameBoard div");
const noPassObstacles = ["blocker1", "obstacle2", "water"];

var currentLevel = 0; //starting level
var levelNum = 0;
var levelMap = levels[currentLevel];
var riderOn = false; //is the rider on?
var currentLocationOfRider = 0;
var currentLocationOfEnemy = 0;
var currentAnimation; //allows 1 animation per level
var widthOfBoard = 5;

//start game
window.addEventListener("load", function() {
  loadLevel();
});

// move rider
document.addEventListener("keydown", function (e) {
	
  switch (e.keyCode) {
	case 37: //left arrow
	  if(currentLocationOfRider % widthOfBoard !== 0) {
	    tryToMove("left");
	  }
	  break;
	case 38: //up
	  if (currentLocationOfRider - widthOfBoard >= 0) {
	    tryToMove("up");
	  }
	  break;
	case 39: //right
	  if (currentLocationOfRider % widthOfBoard < widthOfBoard - 1) {
	    tryToMove("right");
	  }
	  break;
	case 40: //down
	  if (currentLocationOfRider + widthOfBoard < widthOfBoard * widthOfBoard) {
		  tryToMove("down");
	  }
	break;
  }//switch
}); // key event listener

// try to move rider
function tryToMove(direction){
  
  // location before move
  let oldLocation = currentLocationOfRider;
  
  // class of location before move
  let oldClassName = gridBoxes[oldLocation].className;
  
  let nextLocation = 0;  // location we wish to move to
  let nextClass = "";    // class of location we wish to move
  
  let nextLocation2 = 0;
  let nextClass2 = 0;
  
  let newClass = "";  // new class to switch to if successful
	
  switch (direction) {
		case "left":
			nextLocation = currentLocationOfRider - 1;
			break;
		case "right":
			nextLocation = currentLocationOfRider + 1;
			break;
		case "up":
			nextLocation = currentLocationOfRider - widthOfBoard;
			break;
		case "down":
			nextLocation = currentLocationOfRider + widthOfBoard;
			break;
  } // switch
  
  nextClass = gridBoxes[nextLocation].className;
  
  // if the obstacle is not passable, don't move
  if (noPassObstacles.includes(nextClass)) { return; }
  
  // if it's a fence, and there is no rider, don't move
  if (!riderIsOn && nextClass.includes("block")) { return; }
  
  // if there is a fence, move two spaces with animation
  if (nextClass.includes("block")){
	  
	  // rider must be on to jump
	  if(riderIsOn) {
		gridBoxes[currentLocationOfRider].className = "";
		oldClassName = gridBoxes[nextLocation].className;
		
			// set values according to direction
			if(direction == "left") {
			  nextClass = "riderjumpleft";
			  nextClass2 = "rideronleft";
			  nextLocation2 = nextLocation - 1;
			} else if (direction == "right") {
			  nextClass = "riderjumpright";
			  nextClass2 = "rideronright";
			  nextLocation2 = nextLocation + 1;
			} else if (direction == "up") {
			  nextClass = "riderjumpup";
			  nextClass2 = "rideronup";
			  nextLocation2 = nextLocation - widthOfBoard; 
			} else if (direction == "down") {
			  nextClass = "riderjumpdown";
			  nextClass2 = "riderondown";
			  nextLocation2 = nextLocation + widthOfBoard;
			}
		
	  }// if rider is on
		
		// show jumping over fence
		gridBoxes[nextLocation].className = nextClass;
		
		setTimeout(function() {
		  
		  // set jump back to just a fence
		  gridBoxes[nextLocation].className = oldClassName;
		  
		  // update current location of horse to be 2 spaces past take off
		  currentLocationOfRider = nextLocation2;
		  
		  // get class of box after jump
		  nextClass = gridBoxes[currentLocationOfRider].className;
		  
		  //show horse and rider after landing
		  gridBoxes[currentLocationOfRider].className = nextClass2;
		  
		  // if next box is a flag, go up a level
			if (nextClass == "goal" && riderIsOn) {
				levelNum++;
		    nextLevel(nextClass);
			}
		}, 350);
		return;
	  
  } // if includes block
  
  // if there is a rider, add rider
  if (nextClass == "rider") {
	riderIsOn = true;  
  }
  
  // if there is a bridge in the old location keep it
  if (oldClassName.includes("bridge")) {
	gridBoxes[oldLocation].className = "bridge";
  } else {
	gridBoxes[oldLocation].className = "";
  } // else
  
  // build name of new class
  newClass = (riderIsOn) ? "rideron" : "rider";
  newClass += direction;
  
  // if there is a bridge in the next location, keep it
  if (gridBoxes[nextLocation].classList.contains("bridge")) {
	newClass += " bridge";  
  }
  
  // move 1 space
  currentLocationOfRider = nextLocation;
  gridBoxes[currentLocationOfRider].className = newClass;
  
  // if it is an enemy
  if (nextClass.includes("enemy")) {
	  loseGame();
  }

  // next level
	if (nextClass == "goal" && riderIsOn) {
		levelNum++;
		nextLevel(nextClass);
	}
	
} // tryToMove

// move up a level
function nextLevel(nextClass) {
	if(levelNum != levels.length){
	  document.getElementById("levelup").style.display = "block";  
	  clearTimeout(currentAnimation);
	  setTimeout (function() {
			document.getElementById("levelup").style.display = "none";  
			currentLevel++;
			loadLevel();
		}, 1000);
	} else {
		endGame();
	}
}

// load levels 0 - max level
function loadLevel() {
	levelMap = levels[currentLevel];
  let animateBoxes;
  riderIsOn = false;

  // load board
  for (var i = 0; i < gridBoxes.length; i++){
    gridBoxes[i].className = levelMap[i];
    if(levelMap[i].includes("riderup")) currentLocationOfRider = i;
  } // for
  
  animateBoxes = document.querySelectorAll(".animate");
  
  animateEnemy(animateBoxes, 0, "right");

} // loadLevel

// animate enemy left to right (could add up and down)
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
function animateEnemy(boxes, index, direction) {
	console.log("animate enemy location : " + index);
	
	// exit function if no animation
	if (boxes.length <= 0) { return; }
	
	// update images
	if (direction == "right"){
	  boxes[index].classList.add("enemyright");
	} else if (direction == "left"){
	  boxes[index].classList.add("enemyleft");
	} else if (direction == "up"){
	  boxes[index].classList.add("enemyup");
	} else if (direction == "down"){
	  boxes[index].classList.add("enemydown");
	}
	
	//remove images from other boxes
	for(var i = 0; i < boxes.length; i++){
	  if(i != index){
		boxes[i].classList.remove("enemyleft");
		boxes[i].classList.remove("enemyright");
		boxes[i].classList.remove("enemyup");
		boxes[i].classList.remove("enemydown");
	  } // if
	} // for
    
    // if the enemy hits you
	if (boxes[index].className.includes("rider")) {
      loseGame();
			return;
    }
	
	//moving right
	if (direction == "right") {
		
		// turn around if hit right side
		if (index == boxes.length - 1) {
		  index--;
		  direction = "left";
		} else {
		  index++;
		}
	} else if (direction == "left"){
	  if (index == 0) {
			index++;
			direction = "right";
	  } else {
		  index--;
	  }
	} else if (direction == "up") {
	  if(index == 0) {
	    index += widthOfBoard;
			direction = "down";
	  } else {
		  index -= widthOfBoard;
	  } 
	} else if (direction == "down") {
		if(index == 0){
		  index -= widthOfBoard;
		  direction = "up";
		} else {
		  index += widthOfBoard;
		}  
	}//else if
	
	currentAnimation = setTimeout(function() {
	  animateEnemy(boxes, index, direction);
	}, 750);
	  
}// animate enemy

function endGame(){
	document.getElementById("endgame").style.display = "block";
	stopGame();
}

function loseGame(){
	document.getElementById("lose").style.display = "block";
	stopGame();
}

function stopGame() {


}
