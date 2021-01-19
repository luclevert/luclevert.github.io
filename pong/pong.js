//global variables
var speedOfPaddle1 = 0;
var speedOfPaddle2 = 0;
const startPositionOfPaddle1 = document.getElementById("paddle1").offsetTop;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var paddleHeight1 = document.getElementById("paddle1").offsetHeight;
var paddleHeight2 = document.getElementById("paddle2").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;

var score1 = 0;
var score2 = 0;
var growCounter1 = 0;
var growCounter2 = 0;

const gameboardHeight = document.getElementById("gameBoard").offsetHeight;
const gameboardWidth = document.getElementById("gameBoard").offsetWidth;

const ballHeight = document.getElementById("ball").offsetHeight;

const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;
var direction = 1;

var scoreNoise = new sound("scoreNoise.mp3");
var bump = new sound("pong.mp3");

// used to control start/stop
var controlPlay;

// start ball motion
/*window.addEventListener('load', function(){
  startBall();
});*/

document.addEventListener('keydown', function(e) {
  
  if(e.keyCode == 87 || e.which == 87) {
	speedOfPaddle1 = -10;
  }
  if(e.keyCode == 83 || e.which == 83) {
	speedOfPaddle1 = 10;
  }
  if(e.keyCode == 38 || e.which == 38) {
	speedOfPaddle2 = -10;
  }
  if(e.keyCode == 40 || e.which == 40) {
	speedOfPaddle2 = 10;
  }
  
  
});

document.addEventListener('keyup', function(e) {
  
  if(e.keyCode == 87 || e.which == 87) {
	speedOfPaddle1 = 0;
  }//if
  if(e.keyCode == 38 || e.which == 38) {
	speedOfPaddle2 = 0;
  }//if
  if(e.keyCode == 83 || e.which == 83) {
	speedOfPaddle1 = 0;
  }
  if(e.keyCode == 40 || e.which == 40) {
	speedOfPaddle2 = 0;
  }//if
  
  //increases size of paddles for 3.5 seconds
  if(e.keyCode == 81 || e.which == 81){
	growCounter1++;
	  if(growCounter1 < 4){
        document.getElementById("paddle1").style.height = "350px";
	    paddleHeight1 = document.getElementById("paddle1").offsetHeight;
		if(growCounter1 == 1){
	    document.getElementById("paddleGrow1").innerHTML = "Q: • •";
	  } else if (growCounter1 == 2) {
		document.getElementById("paddleGrow1").innerHTML = "Q: •";
	  } else if(growCounter1 == 3) {
		document.getElementById("paddleGrow1").innerHTML = "Q: ";
	  }
	    setTimeout(function(){
		  document.getElementById("paddle1").style.height = "150px";
		  paddleHeight1 = document.getElementById("paddle1").offsetHeight;
       ;}, 3500);
	  }
    }
  
  if(e.keyCode == 77 || e.which == 77){
	growCounter2++;
	if(growCounter2 < 4){
      document.getElementById("paddle2").style.height = "350px";
	  paddleHeight2 = document.getElementById("paddle2").offsetHeight;
	  if(growCounter2 == 1){
	    document.getElementById("paddleGrow2").innerHTML = "• • :M";
	  } else if (growCounter2 == 2) {
		document.getElementById("paddleGrow2").innerHTML = "• :M";
	  } else if(growCounter2 == 3) {
		document.getElementById("paddleGrow2").innerHTML = ":M";
	  }
	
	  setTimeout(function(){
	    document.getElementById("paddle2").style.height = "150px";
	    paddleHeight2 = document.getElementById("paddle2").offsetHeight;
	  ;}, 3500);
    }
  }
  
 
});

function startBall() {
  topPositionOfBall = startTopPositionOfBall;
  leftPositionOfBall = startLeftPositionOfBall;
  
  //50% chance of starting in either direction
  if (Math.random() < 0.5) {
	direction = 1;
  } else {
    direction = -1;
  }
  topSpeedOfBall = 4;
  leftSpeedOfBall = direction * 4;
  
}// startBall


// update locations of paddles and ball
function show() {
	
	//update positions
	positionOfPaddle1 += speedOfPaddle1;
	positionOfPaddle2 += speedOfPaddle2;
	topPositionOfBall += topSpeedOfBall;
	leftPositionOfBall += leftSpeedOfBall;
	
	if(positionOfPaddle1 <= 0) {
	  positionOfPaddle1 = 0;
	}
	
	if(positionOfPaddle2 <= 0) {
	  positionOfPaddle2 = 0;
	}
	
	//stops paddle from leaving gameboard
	if(positionOfPaddle1 >= gameboardHeight - paddleHeight1) {
	  positionOfPaddle1 = gameboardHeight - paddleHeight1;
	}//if
	
	if(positionOfPaddle2 >= gameboardHeight - paddleHeight2) {
	  positionOfPaddle2 = gameboardHeight - paddleHeight2;
	}//if
	
	//if ball hits top or bottom of gameboard, change direction
	if (topPositionOfBall <= 0 || topPositionOfBall >= gameboardHeight - ballHeight){
	  topSpeedOfBall *= -1;
    }//if
	
	//ball on left edge of gameboard
	if (leftPositionOfBall <= paddleWidth) {
		
	  //if ball hits left paddle, change direction
	  if(topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight1) {
	    leftSpeedOfBall *= -1;
		bump.play();
	  } else {
		score2++;
		document.getElementById("score2").innerHTML = score2;
		scoreNoise.play();
		if(score2 == 5){
		  stopGame();
		} else {
	      startBall();
		}
	  }//else
	}//if

    // ball on right edge of gameboard
	if (leftPositionOfBall >= gameboardWidth - paddleWidth - ballHeight) {
	  
	  //if ball hits right paddle, change direction
	  if(topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight2) {
	    leftSpeedOfBall *= -1;
		bump.play();
	  } else {
		score1++;
		document.getElementById("score1").innerHTML = score1;
		scoreNoise.play();
		if(score1 == 5){
		  stopGame();
		} else {
	      startBall();
		}
	  }//else
	}//if
		


	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionOfBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";
	
	document.getElementById("paddle1").offsetTop;
    document.getElementById("paddle2").offsetTop;
}// show

//object constructor to play sounds
// https://www.w3schools.com/graphics/game_sound.asp
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

// resume game play
function resumeGame() {
	if(!controlPlay){
	  controlPlay = window.setInterval(show, 1000/60)
	}
} // resumeGame

//pause game play
function pauseGame() {
	window.clearInterval(controlPlay);
	controlPlay = false;
}// pauseGame

// resume game play
function startGame() {
	
	//reset score, ball and paddle locations
	score1 = 0;
	document.getElementById("score1").innerHTML = score1;
	score2 = 0;
	document.getElementById("score2").innerHTML = score2;
	positionOfPaddle1 = startPositionOfPaddle1;
	positionOfPaddle2 = startPositionOfPaddle2;
	
	startBall();
	
	if(!controlPlay){
	  controlPlay = window.setInterval(show, 1000/60)
	}
} // startGame

function stopGame() {
	window.clearInterval(controlPlay);
	controlPlay = false;
	
	// show lightbox with score
	let message1 = "Tie Game";
	let message2 = "Close to continue.";
	
	if (score2 > score1) {
	  message1 = "Player 2 has Won with " + score2 + " goals!";
	  message2 = "Player 1 only had " + score1 + " goals, good try!";
	} else if(score1 > score2){
	  message1 = "Player 1 has Won with " + score1 + " goals!";
	  message2 = "Player 2 only had " + score2 + " goals, good try!";
	}//elseif
	
	showLightBox(message1, message2);
	
}// stopGame

/*** Lightbox Code ***/
//changes the visibility of divID
function changeVisibility(divId){
  let elem = document.getElementById(divId);

  //if element exists, it is considered true
  if(elem){
    elem.className = (elem.className == "hidden") ? 'unhidden' : 'hidden';
  }//if
}//changeVisibility

//display message in lightbox
function showLightBox(message, message2){
    
    //set message
    document.getElementById("message").innerHTML = message;
    document.getElementById("message2").innerHTML = message2;
    
    //show lightbox
    changeVisibility("lightbox");
    changeVisibility("boundaryMessage");
}

//close light box
function continueGame(){
  changeVisibility("lightbox");
  changeVisibility("boundaryMessage");
  
}//continueGame
