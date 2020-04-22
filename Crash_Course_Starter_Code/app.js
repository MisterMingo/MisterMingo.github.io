// Write your JS in here

var pics = [
	"imgs/soly.jpg",
	"imgs/soly2.jpg",
	"imgs/soly3.jpg",
	"imgs/soly4.jpg",
	"imgs/soly5.jpg",
	
]

var btn = document.querySelector("button");
var img = document.querySelector("img");
var counter = 1;

btn.addEventListener("click", function(){
	img.src = pics[counter]
	counter++;
	if( counter == 5) {
		counter = 0;
	}
});

