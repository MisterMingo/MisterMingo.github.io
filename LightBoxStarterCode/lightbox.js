// change the visibility of divID
function changeVisibility (divID) {
	var element = document.getElementById(divID);
	
	//if element exists, switch its class name
	//between hidden and unhidden
	if(element) {
		element.className = (element.className == 'hidden')? 'unhidden': 'hidden';
	}//if
}//changeVisibility

//diplay light box with big image in it
function displayLightBox(imageFile, alt) {
		
		var image = new Image ();
		var bigImage= document.getElementById("bigImage");
		
		image.src = "images/" + imageFile;
		image.alt = alt;
		
		//look up anonymous function for more
		//force big image to preload so we can have 
		//access to its width so it will be centered
		image.onload = function () {
			var width = image.width;
			document.getElementById("boundaryBigImage").style.width = width + "px";
		};
		
		
		bigImage.src = image.src;
		bigImage.alt = image.alt;
		console.log(bigImage.src);

	changeVisibility('lightbox');
	changeVisibility('boundaryBigImage');
	
}//display LightBox