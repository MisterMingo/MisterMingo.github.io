const levels = [
	//level 0
	["flag", "rock", "", "", "", 
	 "obstacle", "rock", "", "", "rider",
	 "", "tree", "animate", "animate","animate",
	 "", "water", "", "", "",
	 "", "obstacle", "", "spaceshipN", ""],
	 
	 //level 1
	["flag", "water", "", "", "", 
	 "obstacle", "water", "", "", "rider",
	 "animate", "bridge animate", "animate", "animate","animate",
	 "", "water", "", "", "",
	 "", "water","spaceshipN", "", ""],
	 
	 //level 2
	["", "water", "water", "water", "water", 
	 "flag", "water", "", "tree", "rider",
	 "animate", "bridge animate", "animate", "animate","animate",
	 "", "water", "", "", "",
	 "spaceshipN", "water","", "", ""],
	 
	 //level 3
	["flag", "tree", "rock", "water", "spaceshipN", 
	 "", "rock", "", "water", "",
	 "", "obstacle", "", "bridge animate","",
	 "", "water", "rider", "water", "",
	 "", "rock","rock", "water", ""],
	 
	 
 ];
 
 const gridBoxes = document.querySelectorAll("#gameBoard div");
 const noPassObstacles = ["rock", "tree", "water"];
 
 var currentLevel = 0; //starting level
 var riderOn = false; //is the rider on?
 var currentLocationOfShip = 23;
 var currentAnimation; //allows 1 animation per level
 var startPoint;
 var widthOfBoard = 5;
 var marsLocation = 0;
 var tf = false;
 var jumping = false;
 
 window.addEventListener("load", function () {
	 loadLevel(); 
 });
 
 //move horse
 document.addEventListener("keydown", function (e) {
	 if (!jumping) {
	 switch (e.keyCode) {
		case 65: // a key
		  if (currentLocationOfShip % widthOfBoard !== 0) {
			  tryToMove("W");
		  }
		  break;
		case 87: // w key
		  if (currentLocationOfShip - widthOfBoard >= 0){
			  tryToMove("N");
		  }
		  break;
		case 68: //d key
		  if (currentLocationOfShip % widthOfBoard < widthOfBoard - 1) {
			  tryToMove("E");
		  }
		  break;
		case 83: //s key
		  if (currentLocationOfShip + widthOfBoard < widthOfBoard * widthOfBoard){
			  tryToMove("S");
		  }
		  break;
	 } //switch
   }
 }); //event listener
 
 //try to move
 async function tryToMove (direction) {
	 
	 //let location before move
	 let oldLocation = currentLocationOfShip;
	 
	 // class of location before move
	 let oldClassName = gridBoxes[oldLocation].className;
	 
	 let nextLocation = 0; // location we wish to move to
	 let nextClass = "";   //class of location we wish to move to
	 
	 let nextLocation2 = 0;
	 let nextClass2 = 0;
	 
	 let newClass = "";    // new class to switch to if move successful
	 
	 
  switch (direction) {
	 case "W": 
	 nextLocation = currentLocationOfShip - 1;
	 break;
	 case "E":
	  nextLocation = currentLocationOfShip + 1;
	 break;
	 case "S":
	 nextLocation = currentLocationOfShip + widthOfBoard;
	 break;
	 case "N":
	 nextLocation = currentLocationOfShip - widthOfBoard;
	 break;
  }//switch
	 
	 nextClass = gridBoxes[nextLocation].className;
	 
	 //if the obstacle is not passable, don't move
	 if (noPassObstacles.includes (nextClass)) {return;}
	 
	 // if it's a fence, and there is no rider, don't move
	 if (!riderOn && nextClass.includes("obstacle")) {return;}
	 
	 // if there is a fence, and the rider is on, move two spaces with animation
	 if (nextClass.includes("obstacle")) {
		 
		 // rider must be on to jump the fence
		 if (riderOn) {
			 jumping = true;
			 gridBoxes[currentLocationOfShip].className = "";
			 oldClassName = gridBoxes[nextLocation].className;
			 
			 // set values according to direction
			 if (direction == "W") {
				 nextClass = "obstacleW";
				 nextClass2 = "shipRiderW";
				 nextLocation2 = nextLocation - 1;
			 } else if (direction == "E") {
				 nextClass = "obstacleE";
				 nextClass2 = "shipRiderE";
				 nextLocation2 = nextLocation + 1;
			 } else if (direction == "N") {
				 nextClass = "obstacleN";
				 nextClass2 = "shipRiderN";
				 nextLocation2 = nextLocation - widthOfBoard;
			 } else if (direction == "S"){
				 nextClass = "obstacleS";
				 nextClass2 = "shipRiderS";
				 nextLocation2 = nextLocation + widthOfBoard;
			 }
			 
			 // show horse jumping
			 gridBoxes[nextLocation].className = nextClass;
			 
			 setTimeout(function() {
				 
			// set jump back to just a fence
			gridBoxes[nextLocation].className = oldClassName;
				 
			// update current location of the horse
			currentLocationOfShip = nextLocation2;
				 
			// get class of box after jump
			nextClass = gridBoxes[currentLocationOfShip].className;
				 
			// show horse and rider on other side of fence
			gridBoxes[currentLocationOfShip].className = nextClass2;
				 
			// if next box is flag, go up a level
			levelUp(nextClass);
				 
			jumping = false;
			 }, 350);
			 return;
		 } // if rider on
		 
	 }// if class has fence 
	 
	 
	 
	 // if there is a rider, add rider
	 if ( nextClass == "rider") {
		 riderOn = true;
	 }
	 
	 // ever
	 if ( currentLocationOfShip == marsLocation) {
		 tf = true;
	 }
	 
	 // if there is a bridge in the old location keep it
	 if (oldClassName.includes("bridge")) {
		 gridBoxes[oldLocation].className = "bridge"; 
	 } else {
		 gridBoxes[oldLocation].className = "";
	 } //else
	 
	 // build name of new class
	 newClass = (riderOn) ? "shipRider" : "spaceship";
	 newClass += direction;
	 
	 // if there is a bridge in the next location, keep it
	 if (gridBoxes[nextLocation].classList.contains("bridge")) {
		 newClass += " bridge";
	 }
	 
	 // move 1 spaces
	 currentLocationOfShip = nextLocation;
	 gridBoxes[currentLocationOfShip].className = newClass;
	 
	 // if it is an enemy, end the gameBoard
	 if (nextClass.includes("asteroid")) {
		 document.getElementById("lose").style.display = "block";
		 await sleep(2000);
		 document.getElementById("lose").style.display = "none";
		 menu();
		 return;
	 }
	 
	 // if we hit a flag, move up a level
	 levelUp(nextClass);
	 
 }//try to move
 
 //move up one level
function levelUp(nextClass) {
	 if(nextClass == "flag" && riderOn ) {
		 currentLevel++;
		
		if (currentLevel == 4) {
			
			document.getElementById("win").style.display = "block";
			setTimeout (function() {
				document.getElementById("win").style.display = "none";
			 console.log("225");
			 menu(); 
			}, 1000);
			 return;
		 }
		 
		 document.getElementById("levelup").style.display = "block";
		 clearTimeout(currentAnimation);
		 setTimeout (function() {
		   document.getElementById("levelup").style.display = "none";
		   loadLevel();
		 }, 1000);
	 }//if

}// level up
 
 
 //load level 0 - max level
 function loadLevel () {
	 let levelMap = levels[currentLevel];
	 let animateBoxes;
	 riderOn = false;
	 
	 //load board
	 for (i = 0; i < gridBoxes.length; i++) {
		 gridBoxes[i].className = levelMap[i];
		 if (levelMap[i].includes("spaceship")) currentLocationOfShip = i;
		 if (levelMap[i].includes("rider")) marsLocation = i; 		 
		 
	
	 }//for
	 
	 animateBoxes = document.querySelectorAll(".animate");
	  if (currentLevel == 0) {startPoint = 2;}
	  if (currentLevel == 1) {startPoint = 4;}
	 animateEnemy(animateBoxes, startPoint, "left");
	 
	 
 }//loadLevel
 
 //animate enemy left to right, could add up and down
 function animateEnemy(boxes, index, direction) {
	 
	 //exit funciton if no animation
	 if (boxes.length <= 0) {return;} 
	 
	 //update images 
	 if (direction == "right") {
		 boxes[index].classList.add("asteroidE");
		 
	 } else {  
	 console.log(index);
	 boxes[index].classList.add("asteroidW");
	 
	 }//else
		 
	 //remove images from other boxes
	 for (i = 0; i < boxes.length; i++) {
		 if (i != index) {
		     boxes[i].classList.remove("asteroidW");
		     boxes[i].classList.remove("asteroidE");
		}//if 
    }//for
   
   
   if(direction == "right") {
	   
	   //wrap around right side if edge hit
	   if(index == boxes.length -1) {
		   index =0;
	   } else {
		   index++;
	   }
   } else {
	   
	   //wrap around left side if edge hit
	   if ( index == 0) {
		   index = boxes.length - 1;
	   } else {
		   index--;
	   }
   }
   
   
   
   //moving right
  /* if( direction == "right") {
	   turn around if hit right side
	   if (index == boxes.length - 1) {
		   index --;
		   direction = "left";
	   } else {
		   index++; 
	   }
	   
	   //moving left
		} else {
		//turn around if hit left side
		if (index == 0) {
			index = startPoint;
			direction = "left";	
		} else {
			index--; 
		} **/
			
	//else
		if (tf) {
				 gridBoxes[marsLocation].className = "riderMars";
				 tf = false;
			} 
		
   currentAnimation = setTimeout(function() {
	   animateEnemy(boxes, index, direction);
   }, 750);
 }//amimateEnemy
 
 function startGame() {
	 menu();
	 currentLevel = 0;
	 
	 // load level, only way it works
	 setTimeout (function() {
		   loadLevel();
		 }, 1000);
		 
	 document.getElementById("lose").style.display = "none";
	 
 }
 
function instructions() {
	location.replace("menu.html");
}

function instructions2() {
	location.replace("index.html");
}


/** LightBox Code **/

function changeVisibility (divID) {
	var element = document.getElementById(divID);
	
	//if element exists, switch its class name
	if(element) {
		element.className = (element.className == 'hidden')? 'unhidden': 'hidden';
	}//if
}//changeVisibility

//display message in lighbox
function menu() {
	
	//show light box
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
	
}//show light box

//close light box

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}