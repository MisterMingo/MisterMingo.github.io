//global variables

var speedOfPaddle1 = 0;
const startPositionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var speedOfPaddle2 = 0;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;

const gameboardHeight = document.getElementById("gameBoard").offsetHeight;
const gameboardWidth = document.getElementById("gameBoard").offsetWidth;

const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;

const ballHeight = document.getElementById("ball").offsetHeight;
let penguin = document.getElementById("ball");

const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;

var score1 = parseInt(document.getElementById("score1").innerHTML);
var score2 = parseInt(document.getElementById("score2").innerHTML);

var bounce = new sound("splat.ogg");
var off = new sound("splash.wav");
var hit = new sound("splat2.wav");

var stop = false;

//used tp control game start/stop
var controlPlay;

//start ball motion
/*window.addEventListener('load', function() {
	startBall();
});*/

//paddle1 movement
document.addEventListener('keydown', function (e) {
	
	if (e.keyCode == 87 || e.which == 87) {
		speedOfPaddle1 = -10;
	}
	if (e.keyCode == 83 || e.which == 83) {
		speedOfPaddle1 = 10;
	}
	
//paddle2 movement

	
	if (e.keyCode == 38 || e.which == 38) { //up arrow
		speedOfPaddle2 = -10;
	}
	if (e.keyCode == 40 || e.which == 40) { //down arrow
		speedOfPaddle2 = 10;
	}
	
	
});
	
document.addEventListener('keyup', function (e) {
	
	if (e.keyCode == 87 || e.which == 87) {
		speedOfPaddle1 = 0;
	}
	
	if (e.keyCode == 83 || e.which == 83) {
		speedOfPaddle1 = 0;
	}

	//console.log("Key up" + e.keyCode);
	if (e.keyCode == 38 || e.which == 38) {
		speedOfPaddle2 = 0;
	}
	
	if (e.keyCode == 40 || e.which == 40) {
		speedOfPaddle2 = 0;
	}
});	

//object constructor
//https://www.w3schools.com/graphics/game_sound.asp
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
	
// start the ball movement
function startBall(){
	let direction = 1;
	
	topPositionOfBall = startTopPositionOfBall;
	leftPositionOfBall = startLeftPositionOfBall;
	
	// 50% chance of starting in either direction
	if(Math.random() < 0.5) {
		penguin.src="rightPenguin.png";
		direction = 1;	
	} else {
		penguin.src="leftPenguin.png";
		direction = -1;
	}
	
	topSpeedOfBall = Math.random() * 2 + 3; // 3-4.999
	leftSpeedOfBall = direction * (Math.random() * 2 + 3);
}
// update locations of the paddles and ball
function show() {
	
	positionOfPaddle2 += speedOfPaddle2;
	positionOfPaddle1 += speedOfPaddle1;
	topPositionOfBall += topSpeedOfBall;
	leftPositionOfBall += leftSpeedOfBall;
	
	// stop paddle from leaving top of gameboard
	if(positionOfPaddle1 <= 0) {
		positionOfPaddle1 = 0;
	}
	
	if(positionOfPaddle2 <= 0) {
		positionOfPaddle2 = 0;
	}
	
	//stop the paddle from leaving bottom of gameboard
	if ( positionOfPaddle1 >= gameboardHeight - paddleHeight) {
		positionOfPaddle1 = gameboardHeight - paddleHeight;
	}
	if ( positionOfPaddle2 >= gameboardHeight - paddleHeight) {
		positionOfPaddle2 = gameboardHeight - paddleHeight;
	}
	
	//if ball hits top, or bottom, of gameboard, change direction
	if(topPositionOfBall <= 0 || topPositionOfBall >= gameboardHeight - (2 * ballHeight)){
	hit.play();
	topSpeedOfBall *= -1;
	} // if
	
	// ball on left edge of gameboard
	if( leftPositionOfBall <= paddleWidth) {
		
		// if ball hits left paddle, change direction
		if (topPositionOfBall > positionOfPaddle1 - ballHeight && topPositionOfBall < positionOfPaddle1 + paddleHeight + ballHeight) {
			bounce.play();
			leftSpeedOfBall *= -1.1;
			penguin.src="rightPenguin.png";
		} else {	
			off.play();
			startBall();
			
			score2 += 1;
			document.getElementById("score2").innerHTML = score2;
		} // else		
	} // if 

	// ball on right edge of gameboard
	if ( leftPositionOfBall >= gameboardWidth - paddleWidth - ballHeight) {
		 
		 // if ball hits rght paddle, change direction
		if (topPositionOfBall > positionOfPaddle2 - ballHeight && topPositionOfBall < positionOfPaddle2 + paddleHeight + ballHeight) {
			bounce.play();
			leftSpeedOfBall *= -1.1;
			penguin.src="leftPenguin.png";
		} else {	
			off.play();
			startBall();
			
			
			score1 += 1;
			document.getElementById("score1").innerHTML = score1;
		} // else		
	} // if 
		
	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionOfBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";
} //show

//resume gameplay
function resumeGame() {
  if (!stop) {
		if (!controlPlay){
	  controlPlay = window.setInterval(show, 1000/60 );
	}//if
  }//if
}// resumeGame

//pause gameplay
function pauseGame() {
	window.clearInterval(controlPlay);
	controlPlay = false;
} //pausegame

//start gameplay
function startGame() {
	
 if (!stop) { //reset scores, ball, and paddles
  score1 = 0;
  score2 = 0;
  postitionOfPaddle1 = startPositionOfPaddle1;
  postitionOfPaddle2 = startPositionOfPaddle2;
  startBall();
  
  if (!controlPlay){
	  controlPlay = window.setInterval(show, 1000/60 );
  }
 }//if
}// resumeGame

//stop gameplay
function stopGame() {
	pauseGame();
	
	stop = true;
	//show lightbox with score1
	let message1 ="Tie Game";
	let message2="Close to continue";
	
	if(score2 > score1) {
		message1 = "player 2 wins with" + score2 + " points!";
		message2 = "player had" + score1 + " points!";
	} else if (score1 > score2 ) {
		message1 = "player 2 wins with" + score2 + " points!";
		message2 = "player 1 had" + score1 + " points!";
		
	}//else
		
	showLightBox(message1, message2);
	
}//stopGame

/** LightBox Code **/

function changeVisibility (divID) {
	var element = document.getElementById(divID);
	
	//if element exists, switch its class name
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
	
	stop = false;
	resumeGame();
}// continueGame



