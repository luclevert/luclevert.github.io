let currentPlayer = "X";
let gameStatus = ""; //"" - continue game, "Tie", "X Wins", "O Wins"
let numTurns = 0;
let idNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
let idName = "";

//reset board and all variables
function newGame() {
    
  //reset the board
  for (var i = 0; i < idNames.length; i++) {
    document.getElementById(idNames[i]).innerHTML = "";
  }//for

  numTurns = 0;
  gameStatus = "";
  currentPlayer = "X";
    
  changeVisibility("controls");
    
}// newGame

//take player turn
function playerTakeTurn(e){
  
  if (e.innerHTML == ""){
    e.innerHTML = currentPlayer;
    checkGameStatus();
      
    //if game not over, computer goes
    if(gameStatus == "") {
	  setTimeout(function() {
          computerTakeTurn();
          checkGameStatus();
	    }, 300
	  );
    }// if
      
  } else {
    showLightBox("This box has already been selected.", "Please choose a different box.");
  }//else

} // playerTakeTurn

//computer takes a turn
function computerTakeTurn(){
  var cb = []; // current board
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
	
	//checks for possibilities of winning
	if(cb[1] != "" && cb[1] == cb[2] && cb[3] == ""){
		winDeny(2);
		return;
	} else if(cb[4] != "" && cb[4] == cb[5] && cb[6] == ""){
		winDeny(5);
		return;
	} else if(cb[7] != "" && cb[7] == cb[8] && cb[9] == ""){
		winDeny(8);
		return;
	} else if(cb[9] != "" && cb[9] == cb[8] && cb[7] == ""){
		winDeny(6);
		return;
	} else if(cb[6] != "" && cb[6] == cb[5] && cb[4] == ""){
		winDeny(3);
		return;
	} else if (cb[3] != "" && cb[3] == cb[2] && cb[1] == ""){
		winDeny(0);
		return;
	} else if(cb[9] != "" && cb[9] == cb[7] && cb[8] == ""){
		winDeny(7);
		return;
	} else if(cb[6] != "" && cb[6] == cb[4] && cb[5] == ""){
		winDeny(4);
		return;
	} else if (cb[3] != "" && cb[3] == cb[1] && cb[2] == ""){
		winDeny(1);
		return;
	} else if(cb[9] != "" && cb[9] == cb[3] && cb[6] == ""){
		winDeny(5);
		return;
	} else if(cb[8] != "" && cb[8] == cb[2] && cb[5] == ""){
		winDeny(4);
		return;
	} else if (cb[7] != "" && cb[1] == cb[7] && cb[4] == ""){
		winDeny(3);
		return;
	} else if (cb[7] != "" && cb[3] == cb[7] && cb[5] == ""){
		winDeny(4);
		return;
	} else if (cb[9] != "" && cb[1] == cb[9] && cb[5] == ""){
		winDeny(4);
		return;
	} else if (cb[1] != "" && cb[1] == cb[5] && cb[9] == ""){
		winDeny(8);
		console.log("14");
		return;
	} else if (cb[3] != "" && cb[3] == cb[5] && cb[6] == ""){
		winDeny(6);
		return;
	} else if(cb[1] != "" && cb[1] == cb[4] && cb[7] == ""){
		winDeny(6);
		return;
	} else if(cb[2] != "" && cb[2] == cb[5] && cb[8] == ""){
		winDeny(7);
		return;
	} else if(cb[3] != "" && cb[3] == cb[5] && cb[7] == ""){
		winDeny(6);
		return;
	} else if(cb[7] != "" && cb[7] == cb[4] && cb[1] == ""){
		winDeny(0);
		return;
	} else if(cb[8] != "" && cb[8] == cb[5] && cb[2] == ""){
		winDeny(1);
		return;
	} else if(cb[9] != "" && cb[9] == cb[6] && cb[3] == ""){
		winDeny(2);
		return;
	} else if(cb[9] != "" && cb[9] == cb[5] && cb[1] == ""){
		winDeny(0);
		return;
	}
 
  computerMakeDecision()
 
}// computer take turn

//after each turn, check for a winner, a tie,
//or continue playing
function checkGameStatus(){
    numTurns++; //count turn
    
    //check Win
    if(checkWin()) {
        gameStatus = currentPlayer + " wins!";
		
	 //game is over
	 if (gameStatus != "") {
       setTimeout(function() {showLightBox(gameStatus, "Game Over!");}, 400);
     }
	  
	//check for tie
    }else if(numTurns == 9 && !checkWin()) {
        gameStatus = "Tie Game!";
	  if (gameStatus != "") {
        setTimeout(function() {showLightBox(gameStatus, "Game Over...");}, 400);
      }
    }//if
   
    //switch current player
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
}

//check for a Win, there are 8 possible win paths
function checkWin(){
    var cb = []; // current board
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
  
}//continueGame

//saves computer input
function winDeny(number){
  idName = idNames[number];
  if(document.getElementById(idName).innerHTML == ""){
    document.getElementById(idName).innerHTML = currentPlayer;
	return;
  } else {
    computerMakeDescision();
  }//else
  
}//winDeny

//computer choose a spot to put an O
function computerMakeDecision() {
	let counter = 0;
	let corner = ["one", "three", "seven", "nine"];
	
	//puts it in a corner
    do{
      counter++;
      let rand = parseInt(Math.random()*4) + 1;
      idName = corner[rand-1];
      if(document.getElementById(idName).innerHTML == "") {
        document.getElementById(idName).innerHTML = currentPlayer; 
        return;
      }
    }while(counter < 5)

    //if all else fails
    do{	  
      let rand = parseInt(Math.random()*9) + 1;
	  idName = idNames[rand-1];
	  if (document.getElementById(idName).innerHTML == "") {
	    document.getElementById(idName).innerHTML = currentPlayer; //enters computer's input
	    return;
	  }//if
    }while(true)
}//computerMakeDecision