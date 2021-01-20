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
var currentAnimation; //allows 1 animation per level

//start game
window.addEventListener("load", function() {
  loadLevel();
});

// load levels 0 - max level
function loadLevel() {
  let levelMap = levels[currentLevel];
  let animateBoxes;
  riderOn = false;

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
	    index += 5;
		direction = "down";
	  } else {
		index -= 5;
	  } 
	} else if (direction == "down") {
		if(index == 0){
		  index -= 5;
		  direction = "up";
		} else {
		  index += 5;
		}  
	}//else if
	
	currentAnimation = setTimeout(function() {
	  animateEnemy(boxes, index, direction);
	}, 750);
	  
}// animate enemy
