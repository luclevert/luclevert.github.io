//changes the visibility of divID
function changeVisibility(divId){
	
  let elem = document.getElementById(divId);
  
  //if element exists, it is considered true
  if(elem){
	elem.className = (elem.className == "hidden") ? 'unhidden' : 'hidden';
  }//if
	  
  
}//changeVisibility

// display lightbox with big image in it
function displayLightBox(alt, imageFile){
	let bigImage = document.getElementById("bigImage");
	let image = new Image();
	
	//update the big image to access
	image.src = "images/" + imageFile;
	
	//force big image to preload so we can access width
	//to center image on page
	image.onload = function () {
	  let width = image.width;
	  document.getElementById("boundaryBigImage").style.width = width +"px";
	}
	
	bigImage.src = image.src;
	bigImage.alt = alt;
	
	changeVisibility("lightbox");
	changeVisibility("positionBigImage");
	
}