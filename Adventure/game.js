const levels = [

  //level 0
  ["goal", "blocker1", "", "apple", "obstacle2",
  "blockforward", "blocker1", "", "", "rider",
  "", "obstacle2", "animate", "animate", "animate",
  "", "water", "", "", "obstacle2",
  "", "blockside", "", "riderup", ""],

	// level 1
  ["goal", "water","apple", "", "obstacle2",
   "blockforward", "water", "blocker1", "", "rider",
   "animate", "animate", "animate", "animate", "animate",
   "", "water", "obstacle2", "", "obstacle2",
   "", "water", "riderup", "", ""],
	 
	// level 2
  ["obstacle2", "obstacle2","goal", "obstacle2", "obstacle2",
   "animate", "animate", "animate", "animate", "animate",
   "water", "", "water", "water", "water",
   "", "", "", "blockside", "",
   "rider", "blocker1", "", "", "riderup"],
	 
	// level 3
  ["obstacle2", "rider","blocker1", "water", "",
   "blocker1", "", "", "water", "",
   "", "animate", "animate", "animate", "animate",
   "blockforward", "obstacle2", "blocker1", "water", "",
   "", "goal", "obstacle2", "water", "riderup"],
	 
	 // level 4
  ["obstacle2", "goal","obstacle2", "blocker1", "obstacle2",
   "blocker1", "", "blockside", "", "blocker1",
   "water", "water", "water", "", "water",
   "animate", "animate", "animate", "animate", "animate",
   "blocker1", "riderup", "", "obstacle2", "rider"],

];

const levelsBackground = [

  //level 0
  ["grass", "grass", "grass", "grass", "grass",
  "grass", "grass", "grass", "grass", "grass",
  "grass", "grass", "grass", "grass", "grass",
  "grass", "grass", "grass", "grass", "grass",
  "grass", "grass", "grass", "grass", "grass"],

	// level 1
  ["grass", "grass","grass", "grass", "grass",
   "grass", "grass", "grass", "grass", "grass",
   "grass", "bridgeright", "grass", "grass", "grass",
   "grass", "grass", "grass", "grass", "grass",
   "grass", "grass", "grass", "grass", "grass"],
	 
	// level 2
  ["grass", "grass","grass", "grass", "grass",
   "grass", "grass", "grass", "grass", "grass",
   "grass", "bridgeup", "grass", "grass", "grass",
   "grass", "grass", "grass", "grass", "grass",
   "grass", "grass", "grass", "grass", "grass"],
	 
	// level 3
  ["grass", "grass", "grass", "grass", "grass",
   "grass", "grass", "grass", "grass", "grass",
   "grass", "grass", "grass", "bridgeright", "grass",
   "grass", "grass", "grass", "grass", "grass",
   "grass", "grass", "grass", "grass", "grass"],
	 
	 // level 4
  ["grass", "grass", "grass", "grass", "grass",
   "grass", "grass", "grass", "grass", "grass",
   "grass", "grass", "grass", "bridgeup", "grass",
   "grass", "grass", "grass", "grass", "grass",
   "grass", "grass", "grass", "grass", "grass"],

];

const gridBoxes = document.querySelectorAll("#gameBoard div");
const gridBoxesBackground = document.querySelectorAll("#gameBoardBackground div");
const noPassObstacles = ["blocker1", "obstacle2", "water"];

var currentLevel = 0; //starting level
var levelNum = 0;
var levelMap = levels[currentLevel];
var levelMapBackground = levelsBackground[currentLevel];
var riderIsOn = false; //is the rider on?
var currentLocationOfRider = 0;
var currentLocationOfBridge = 0;
var currentAnimation; //allows 1 animation per level
var widthOfBoard = 5;
var playerLives = 3;
var controlAnimation = true;

var currentBox;
var currentDirection;
var currentIndex;

//start game
function startGame(){
	document.getElementById("startGame").style.display = "none";
	document.getElementById("start").style.display = "none";
	document.getElementById("info").style.display = "none";
}

//restarts the game from level 1
function restartGame() {
	
	document.getElementById("endgame").style.display = "none";
	document.getElementById("restart").style.display = "none";
	document.getElementById("lives").innerHTML = "♥ ♥ ♥";
	
	currentLevel = 0;
	levelNum = 0;
	levelMap = levels[currentLevel];
	riderIsOn = false; 
	currentAnimation = false; 
	widthOfBoard = 5;
	playerLives = 3;
	currentAnimation = null;
	controlAnimation = true;
	
	moveRider();
	loadLevel();
} //restartGame

//shows info screen
function showInfo(){
	document.getElementById("infoScreen").style.display = "block";
	document.getElementById("return").style.display = "block";
	document.getElementById("start").style.display = "none";
	document.getElementById("info").style.display = "none";
} //showInfo

//shows start screen
function showStartScreen(){
	document.getElementById("endgame").style.display = "none";
	document.getElementById("infoScreen").style.display = "none";
	document.getElementById("return").style.display = "none";
	document.getElementById("startGame").style.display = "block";
	document.getElementById("start").style.display = "inline-block";
	document.getElementById("info").style.display = "inline-block";
} // showStartScreen

//reloads a level
function reloadLevel(){
	document.getElementById("noBike").style.display = "none";
	document.getElementById("lose").style.display = "none";
	document.getElementById("retry").style.display = "none";
	document.getElementById("lives").innerHTML = "♥ ○ ○";
	playerLives = 1;
	controlAnimation = true;
	moveRider();
	loadLevel();
} // reloadLevel


window.addEventListener("load", function load() {
	loadLevel();
});
	
//let's the rider move
moveRider();

// move rider
function moveRider() {
	document.addEventListener("keydown", keyDown = function keyDown(e) {
		
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
	}, false); // key event listener
}//move 

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
	
	//if approached at the wrong way (right/left), you don't jump the fence
	if (nextClass.includes("blockforward") && direction == "left" || nextClass.includes("blockforward") && direction == "right"){ return; }
	
	//if approached at the wrong way (up/down), you don't jump the fence
	if (nextClass.includes("blockside") && direction == "up" || nextClass.includes("blockside") && direction == "down"){ return; }
  
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
		
		document.removeEventListener("keydown", keyDown, false);
		
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
			} else {
				moveRider();
			} // else
		}, 350);
		return;
  } // if includes block
	
	// regain health from apple
	if (nextClass == "apple") {
		regainHealth();
	}
  
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
	  hitEnemy();
  } //if

  // next level
	if (nextClass == "goal" && riderIsOn == true) {
		levelNum++;
		nextLevel(nextClass);
	} else if(nextClass == "goal" && riderIsOn == false){
		noBike();
	}// else
	
} // tryToMove

// move up a level
function nextLevel(nextClass) {
	if(levelNum != levels.length){
	  document.getElementById("levelup").style.display = "block";  
	  clearTimeout(currentAnimation);
		document.removeEventListener("keydown", keyDown, false);
	  setTimeout (function() {
			document.getElementById("levelup").style.display = "none";  
			currentLevel++;
			moveRider();
			loadLevel();
		}, 1000);
	} else {
		endGame();
	}
}

// load levels 0 - max level
function loadLevel() {
	levelMap = levels[currentLevel];
	levelMapBackground = levelsBackground[currentLevel];
  let animateBoxes;
  riderIsOn = false;
	let direction;

  // load board
  for (var i = 0; i < gridBoxes.length; i++){
    gridBoxes[i].className = levelMap[i];
		gridBoxesBackground[i].className = levelMapBackground[i];
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
	
	//controls if the animation plays
	if(controlAnimation == true){
		
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
				hitEnemy();
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
		} //else
		
		//change direction if hit top
		if (index == boxes.length + widthOfBoard) {
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
		
		currentBox = boxes;
		currentDirection = direction;
		currentIndex = index;
		
		currentAnimation = setTimeout(function() {
			animateEnemy(boxes, index, direction);
		}, 750);
	} else {
		return;
	}//else
}// animate enemy

function regainHealth(){
	if(playerLives == 2){
		playerLives++;
		document.getElementById("lives").innerHTML = "♥ ♥ ♥";
		return;
	} else if(playerLives == 1) {
		playerLives++;
		document.getElementById("lives").innerHTML = "♥ ♥ ○";
		return;
	} else if(playerLives == 3){
		playerLives++;
		document.getElementById("lives").innerHTML = "♥ ♥ ♥ ♥";
		return;
	} else if(playerLives == 4){
		playerLives++;
		document.getElementById("lives").innerHTML = "♥ ♥ ♥ ♥ ♥";
		return;
	}
} // regainHealth()

//shows end screen and stops the game
function endGame(){
	document.getElementById("endgame").style.display = "block";
	document.getElementById("restart").style.display = "block";
	controlAnimation = false;
  document.removeEventListener("keydown", keyDown, false);
} // endGame()

function loseGame(){
	document.getElementById("lose").style.display = "block";
	document.getElementById("retry").style.display = "block";
	controlAnimation = false;
	document.removeEventListener("keydown", keyDown, false);
} // loseGame()

function noBike(){
	document.getElementById("noBike").style.display = "block";
	document.getElementById("retry").style.display = "block";
	controlAnimation = false;
	document.removeEventListener("keydown", keyDown, false);
}

function hitEnemy(){
	playerLives--;
	if(playerLives == 2){
		document.getElementById("lives").innerHTML = "♥ ♥ ○";
		return;
	} else if(playerLives == 1){
		document.getElementById("lives").innerHTML = "♥ ○ ○";
		return;
	} else if(playerLives == 0){
		document.getElementById("lives").innerHTML = "○ ○ ○";
		loseGame();
		return;
	} else if(playerLives == 3){
		document.getElementById("lives").innerHTML = "♥ ♥ ♥";
		return;
	} else if(playerLives == 4){
		document.getElementById("lives").innerHTML = "♥ ♥ ♥ ♥";
		return;
	} 
	return;
} // hitEnemy()

//By a person on stack overflow
function timeInLevel(){
	var timeleft = 100;
	var downloadTimer = setInterval(function(){
		if(timeleft <= 0 ){
			clearInterval(downloadTimer);
			document.getElementById("time").innerHTML = "Finished";
			loseGame();
		}else {
		  document.getElementById("time").value = 10 - timeleft;
		}
		timeleft -= 1;
	}, 1000);
}