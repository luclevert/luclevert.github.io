let currentPlayer = "X";
let gameStatus = ""; //"" - continue game, "Tie", "X/O Wins"
let numTurns = 0;
let idNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

//reset board and all variables
function newGame() {
	
	//reset board
	for(var i = 0; i< idNames.length; i++){
		document.getElementById(idNames[i]).innerHTML = "";
	}// for
	
	numTurns = 0;
	gameStatus = "";
	currentPlayer = "X";
	
	changeVisibility("controls");
	
}// newGame

//player takes turn
function playerTakeTurn(e) {
  if (e.innerHTML == "") {
		e.innerHTML = currentPlayer;
		checkGameStatus();
		
		if(gameStatus == ""){
			computerTakeTurn();
			checkGameStatus();
		}
			
	} else {
		showLightBox("This box has already been selected.", "Select an empty box.");
		return;
	}// else
}// playerTakeTurn

//computer takes a turn
function computerTakeTurn(){
	let idName = "";
	
	//choose random boxes until an empty box is found
	do{
		let rand = parseInt(Math.random()*9) + 1; //1 - 9
		idName = idNames[rand - 1];
		
		//check if chosen box is empty
		if(document.getElementById(idName).innerHTML == "") {
			document.getElementById(idName).innerHTML == currentPlayer;
			break;
		}
		
	}while(true);
	
}

//after each turn, check for a winner, a tie
//or continue playing
function checkGameStatus(){
	numTurns++;
	
	//check for win
	if(checkWin()){
		gameStatus = currentPlayer + " wins!";
		showLightBox(gameStatus, "Game Over!");
	}
	
	//check for tie
	if(numTurns == 9) {
		gameStatus = "Tie Game";
		showLightBox(gameStatus, "Game Over...");
	}
	
	//switch current player
	currentPlayer = (currentPlayer == "X" ? "O" : "X" );
	
} //checkGameStatus

//check for win
function checkWin() {
	let cb = []; // current board
	cb[0] = ""; //not used
	cb[1] = document.getElementById("one").innerHTML;
	cb[2] = document.getElementById("two").innerHTML;
	cb[3] = document.getElementById("three").innerHTML;
	cb[4] = document.getElementById("four").innerHTML;
	cb[5] = document.getElementById("five").innerHTML;
	cb[6] = document.getElementById("six").innerHTML;
	cb[7] = document.getElementById("seven").innerHTML;
	cb[8] = document.getElementById("eight").innerHTML;
	cb[9] = document.getElementById("nine").innerHTML;
   
	if(cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3]){
		return true;
	}
	else if(cb[2] != "" && cb[2] == cb[5] && cb[5] == cb[8]){
		return true;
	}
	else if(cb[3] != "" && cb[3] == cb[5] && cb[5] == cb[7]){
		return true;
	}
	else if(cb[4] != "" && cb[4] == cb[5] && cb[5] == cb[6]){
			return true;
	}
	else if(cb[7] != "" && cb[7] == cb[8] && cb[8] == cb[9]){
			return true;
	}
	else if(cb[1] != "" && cb[1] == cb[5] && cb[5] == cb[9]){
			return true;
	}
	else if(cb[1] != "" && cb[1] == cb[4] && cb[4] == cb[7]){
			return true;
	}
	else if(cb[3] != "" && cb[3] == cb[6] && cb[6] == cb[9]){
			return true;
	}
   
}// checkWin

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
   
  //if the game is over, show controls
  if(gameStatus != ""){
    changeVisibility("controls");
  }//if
 
}//continueGam
	
