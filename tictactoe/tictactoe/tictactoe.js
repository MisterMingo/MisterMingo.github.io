let currentPlayer = "X";
let gameStatus = ""; //"" continue, :Tie", "X wins" , "O wins"
let numTurns = 0;
let gameOver = false;

//take player turn
function playerTakeTurn(e) {
	if(e.innerHTML == "") {
		e.innerHTML	= currentPlayer;
		checkGameStatus();
	} else {
		showLightBox("This box is already selected." , "Please try another.");
		return;
	}//else
		
	

	if(gameStatus!= "") {
		showLightBox(gameStatus, "Game Over.");
		gameOver = true;
	}//if
	
	if(gameOver) {
		clearGame();
	}//if
	
}//playerTakeTurn


//after each turn, check for a winnner, a tie,
// or continue playing
function checkGameStatus() {
	numTurns++; //count turns
	
	//check for tie
	if (numTurns == 9) {
		gameStatus = "Tie Game";
	}//numTurns
	
	//check window
	if (checkWin()) {
		gameStatus = currentPlayer + " wins!";
	}//check wins

	//switch current player
	currentPlayer = (currentPlayer == "X" ? "O" : "X" );
}//checkGameStatus


//check for a Win, there * win paths
function checkWin() {
	let cb =[]; //current board
	cb[0] = ""; // not going to use it
	cb[1] = document.getElementById("one").innerHTML;
	cb[2] = document.getElementById("two").innerHTML;
	cb[3] = document.getElementById("three").innerHTML;
	cb[4] = document.getElementById("four").innerHTML;
	cb[5] = document.getElementById("five").innerHTML;
	cb[6] = document.getElementById("six").innerHTML;
	cb[7] = document.getElementById("seven").innerHTML;
	cb[8] = document.getElementById("eight").innerHTML;
	cb[9] = document.getElementById("nine").innerHTML;
	
	//top row
	if(cb[1] != "" && cb[1] == cb[2] && cb[2] ==cb[3]) {
		return true;	
			
	}//if
	
		//middle row
	if(cb[4] != "" && cb[4] == cb[5] && cb[5] ==cb[6]) {
		return true;	
			
	}//if
	
		//bottom row
	if(cb[7] != "" && cb[7] == cb[8] && cb[8] ==cb[9]) {
		return true;	
			
	}//if
	
		//left side
	if(cb[1] != "" && cb[1] == cb[4] && cb[4] ==cb[7]) {
		return true;	
			
	}//if
	
		//middle
	if(cb[2] != "" && cb[2] == cb[5] && cb[5] ==cb[8]) {
		return true;	
			
	}//if
	
		//right side
	if(cb[3] != "" && cb[3] == cb[6] && cb[6] ==cb[9]) {
		return true;	
			
	}//if
	
		//diagonal 1
	if(cb[1] != "" && cb[1] == cb[5] && cb[5] ==cb[9]) {
		return true;	
			
	}//if
	
		//diagonal 2
	if(cb[3] != "" && cb[3] == cb[5] && cb[5] ==cb[7]) {
		return true;	
			
	}//if
	
}//check wins

function changeVisibility (divID) {
	var element = document.getElementById(divID);
	
	//if element exists, switch its class name
	//between hidden and unhidden
	if(element) {
		element.className = (element.className == 'hidden')? 'unhidden': 'hidden';
	}//if
}//changeVisibility


//display message in lighbox
function showLightBox(message, message2) {
	//set messages
	document.getElementById("message").innerHTML = message;
	document.getElementById("message2").innerHTML = message2;
	
	//show light box
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
	
}//show light box

//close light box

function continueGame() {
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
	
	//if the game is over, show controls
	
}// continueGame

function clearGame() {
		
	document.getElementById("one").innerHTML = "";
	document.getElementById("two").innerHTML = "";
	document.getElementById("three").innerHTML = "";
	document.getElementById("four").innerHTML = "";
	document.getElementById("five").innerHTML = "";
	document.getElementById("six").innerHTML = "";
	document.getElementById("seven").innerHTML = "";
	document.getElementById("eight").innerHTML = "";
	document.getElementById("nine").innerHTML = "";
	
	gameOver = false;
	currentPlayer = "X";
	gameStatus = ""; 
	numTurns = 0;
	
}