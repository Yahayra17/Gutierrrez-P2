// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function rotate(){
	if ($(".moreIndicator").hasClass("rot90")) {
		$(".moreIndicator").removeClass("rot90").addClass("rot270");
		$(".details").slideToggle( "slow" );
	} else {
		$(".moreIndicator").removeClass("rot270").addClass("rot90");
		$(".details").slideToggle( "slow" );
	}
}

$( "#nextPhoto" ).click(function() {
	mCurrentIndex += 1;
	swapPhoto();
});

$( "#prevPhoto" ).click(function() {
	mCurrentIndex -= 1;
	swapPhoto();
});

function swapPhoto() {
	if(mCurrentIndex >= mImages.length) {
		mCurrentIndex = 0;
	}
	if(mCurrentIndex < 0) {
		mCurrentIndex = mImages.length-1;
	}
 	document.getElementById("photo").src = mImages[mCurrentIndex].img;
	var location = document.getElementsByClassName("location")[0];
	var description = document.getElementsByClassName("description")[0];
	var date = document.getElementsByClassName("date")[0];
	location.innerHTML = "Location: " + mImages[mCurrentIndex].location;
	description.innerHTML = "Description: " + mImages[mCurrentIndex].description;
	date.innerHTML = "Date: " + mImages[mCurrentIndex].date;
	mLastFrameTime = 0;
	mCurrentIndex += 1;
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	console.log('swap photo');
}

function iterateJSON() {
	for (x = 0; x < mJson.images.length; x++) {
		mImages[x] = new GalleryImage();
		mImages[x].location = mJson.images[x].imgLocation;
		mImages[x].description = mJson.images[x].description;
		mImages[x].date = mJson.images[x].date;
		mImages[x].img = mJson.images[x].imgPath;
	}
};

// Counter for the mImages array
var mCurrentIndex = 0;

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json';



// XMLHttpRequest variable
var request = new XMLHttpRequest();
request.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		mJson = JSON.parse(request.responseText);
		iterateJSON(mJson);
	}
};
request.open("GET", mUrl, true);
request.send();

// Array holding GalleryImage objects (see below).
var mImages = [];


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	request();
	// This initially hides the photos' metadata information
	// $('.details').eq(0).hide();
	
});

window.addEventListener('load', function() {
	$("#nextPhoto").position({
		my: "right bottom",
		at: "right bottom",
		of: "#nav"
	});
	console.log('window loaded');

}, false);



function GalleryImage() {
	var location;
	var description;
	var date;
	var img;
}
	
