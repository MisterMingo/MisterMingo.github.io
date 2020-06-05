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
	 "", "water","spaceshipN", "", ""]
	 
	 
	 
 ];
 
 const gridBoxes = document.querySelectorAll("#gameBoard div");
 var currentLevel = 0; //starting level
 var riderOn = false; //is the rider on?
 var currentLocationOfShip = 0;
 var currentAnimation; //allows 1 animation per level
 var startPoint;
 
 window.addEventListener("load", function () {
	 loadLevel(); 
 });
 
 //load level 0 - max level
 function loadLevel () {
	 let levelMap = levels[currentLevel];
	 let animateBoxes;
	 riderOn = false;
	 
	 //load board
	 for (i = 0; i < gridBoxes.length; i++) {
		 gridBoxes[i].className = levelMap[i];
		 if (levelMap[i].includes("spaceship")) currentLocationOfShip = i; 
	
	 }//for
	 
	 animateBoxes = document.querySelectorAll(".animate");
	 startPoint = 2;
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
	 boxes[index].classList.add("asteroidW");
	 }//else
		 
	 //remove images from other boxes
	 for (i = 0; i < boxes.length; i++) {
		 if (i != index) {
		     boxes[i].classList.remove("asteroidW");
		     boxes[i].classList.remove("asteroidE");
		}//if 
    }//for
   
   //moving right
   if( direction == "right") {
	   //turn around if hit right side
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
		}
			
	}//else
		
   currentAnimation = setTimeout(function() {
	   animateEnemy(boxes, index, direction);
   }, 750);
 }//amimateEnemy
