//Extra Feature - Game Time 

function pageLoad() {
	createPuzzle();
	document.getElementById("shufflebutton").onclick = shufflePuzzle;
	  var start_time = 0; //Game start time
 	  var timer; // variable for timer 
	  var total_time = 0; // total gameplay time
	  var sec = 0; //Time in seconds
 
     //timer function
     var timer = function(){
     var showtime = document.getElementsByClassName("explanation");
     var interval = setInterval(function(){
       sec++;
       showtime.innerHTML = "Time Taken: "+sec+" seconds "+"Moves Made: "+moves;
     }, 1000);
   };
}

window.onload = pageLoad;


function createPuzzle() {
	var child =document.getElementById('puzzlearea').getElementsByTagName('div');
	var i = 0;
	var id = 0;

	document.getElementById("shufflebutton").onclick = shufflePuzzle;

	for ( x = 0; x < 4; x++){
		for ( y = 0; y <4; y++){
			child[i].id = id;
			id++;

			child[i].onmouseover = hover;
			child[i].onmouseout = mouseOut;
			child[i].onclick = click;
			
			//End loop when he position of the last tile is reached
			if(x===parseInt("3") && y===parseInt("3")){
				break;
			}
			
			child[i].className = "puzzlepiece";


		//Nested if statements to allocate tile positions 
			if(x==0 || y==0){
				if(x==0 && y==0){
					child[i].style.top = "0px";
					child[i].style.left = "0px";
					child[i].style.backgroundPosition = '0px 0px';
					i++;
					continue;
				}
				else if(x==0){
					child[i].style.left = (parseInt(y)) * 100 + "px";
					child[i].style.top = "0px";
					child[i].style.backgroundPosition = (parseInt(-y)*100)+ 'px 0px';
				}
				else if(y==0){
					child[i].style.left = "0px";
					child[i].style.top = (parseInt(x)) * 100 + "px";
					child[i].style.backgroundPosition = '0px '+(parseInt(-x)*100)+ 'px';
				}
			}
			else{
				child[i].style.top = (parseInt(x)) * 100 + "px";
				child[i].style.left = (parseInt(y)) * 100 + "px";
				child[i].style.backgroundPosition = (parseInt(-y)*100)+ 'px '+(parseInt(-x)*100)+ 'px';
			}
			i++;
		}
	}
}


function shufflePuzzle()
{
	if(document.getElementById('empty') === null){
		//Added empty div if it doesn't exists
		CreateDiv();
	}
	var index = 0;
	var last_num = 0;
	var count = 0;
	
	//loop to 100 times
	while(count < 100)
	{

		var empty_x = document.getElementById('empty').style.left;
		var empty_y = document.getElementById('empty').style.top;
	
	
		//array will have the neighbours of the empty tile and choose any one among them to swap the position
		var neighs = [];
		var empty_div_curr_loc = document.getElementById('empty').value;
	
		//Possible neighbours
		var leftid = parseInt(empty_div_curr_loc)-1;
		var rightid = parseInt(empty_div_curr_loc)+1;
		var topid = parseInt(empty_div_curr_loc)-4;
		var downid = parseInt(empty_div_curr_loc)+4;
	
		var left_neigh;
		var right_neigh;
		var top_neigh;
		var down_neigh;
	
		//Get the neighbours distance from the source empty div
		if(leftid>=0 && leftid<=15){
			left_neigh = (document.getElementById(leftid).style.left);
		}
		if(rightid>=0 && rightid<=15){
			right_neigh = (document.getElementById(rightid).style.left);
		}
		if(topid>=0 && topid<=15){
			top_neigh = (document.getElementById(topid).style.top);
		}
		if(downid>=0 && downid<=15){
			down_neigh = (document.getElementById(downid).style.top);
		}
	
		//Block the wrong pointers to the neighbour
		if (parseInt(empty_div_curr_loc)==4 || parseInt(empty_div_curr_loc)==8 || parseInt(empty_div_curr_loc)==12 || parseInt(empty_div_curr_loc)==0){
			left_neigh = undefined;
		}
		if (parseInt(empty_div_curr_loc)==3 || parseInt(empty_div_curr_loc)==7 || parseInt(empty_div_curr_loc)==11 || parseInt(empty_div_curr_loc)==15){
			right_neigh = undefined;
		}
		if (parseInt(empty_div_curr_loc)==0 || parseInt(empty_div_curr_loc)==1 || parseInt(empty_div_curr_loc)==2 || parseInt(empty_div_curr_loc)==3){
			top_neigh = undefined;
		}
		if (parseInt(empty_div_curr_loc)==12 || parseInt(empty_div_curr_loc)==13 || parseInt(empty_div_curr_loc)==14 || parseInt(empty_div_curr_loc)==15){
			down_neigh = undefined;
		}
	
		//Check the empty space in the neighbour
		if(left_neigh){
			neighs.push(leftid);
		}
	
		if(right_neigh){
			neighs.push(rightid);
		}
	
		if(down_neigh){
			neighs.push(downid);
		}
	
		if(top_neigh){
			neighs.push(topid);
		}
		
		//Select the random neighbour tile
		index = newRandomGen(neighs.length, last_num);
		var emp_div_id = document.getElementById('empty').value;
		var cur_div = neighs[parseInt(index)-1];
		document.getElementById('empty').value = cur_div;
		document.getElementById(cur_div).setAttribute('id', emp_div_id);
		
		interchangeCoords('empty', emp_div_id);
		
		neighs.length = 0;
		last_num = index;
		count++;
	}
}


/**
 * This is a helper method to generate random number of given maximum range
*/
function newRandomGen(maxi, lastnum)
{
	var rannum = Math.floor((Math.random() * parseInt(maxi)) + 1);
	while(true){
		rannum = Math.floor((Math.random() * parseInt(maxi)) + 1);
		if(lastnum != rannum){
			break;
		}
	}
	return rannum;
}

/**
 * This method is called when cursor hovers over any of the tile
*/
function hover()
{
	//Get the coordinates of the empty div
	var empty_x = document.getElementById('empty').style.left;
	var empty_y = document.getElementById('empty').style.top;
	
	//Get the coordinate of the source div
	var left_x = document.getElementById(this.id).style.left; 
	var top_y = document.getElementById(this.id).style.top;	
	
	//Check whether the clicked tile exists at the  left of empty div
	if((parseInt(left_x) == parseInt(parseInt(empty_x) - 100)) && (parseInt(top_y) == parseInt(empty_y))){
		document.getElementById(this.id).className += " movablepiece";
	}
	//Check whether the clicked tile exists at the right of empty div
	if((parseInt(left_x) == parseInt(parseInt(empty_x) + 100)) && (parseInt(top_y) == parseInt(empty_y))){
		document.getElementById(this.id).className += " movablepiece";
	}
	//Check whether the clicked tile exists at the top of empty div
	if((parseInt(top_y) == parseInt(parseInt(empty_y) - 100)) && (parseInt(left_x) == parseInt(empty_x))){
		document.getElementById(this.id).className += " movablepiece";
	}
	//Check whether the clicked tile exists at the  bottom of empty div
	if((parseInt(top_y) == parseInt(parseInt(empty_y) + 100)) && (parseInt(left_x) == parseInt(empty_x))){
		document.getElementById(this.id).className += " movablepiece";
	}
}

/**
 * This method is called when a tile is clicked to slide to the empty space
*/
function click()
{
	if(document.getElementById('empty') === null){
		alert("Please shuffle the puzzle to Start the game");
	}
	//Get the position of 'empty' div
	var empty_x = document.getElementById('empty').style.left;
	var empty_y = document.getElementById('empty').style.top;

	
	//Get the coordinates of the clicked div
	var left_x = document.getElementById(this.id).style.left; 
	var top_y = document.getElementById(this.id).style.top;	
	

	
	//Check whether the clicked tile exists at the left of empty div
	if((parseInt(left_x) == parseInt(parseInt(empty_x) - 100)) && (parseInt(top_y) == parseInt(empty_y))){
		document.getElementById('empty').value = this.id;
		this.id = parseInt(this.id)+1;
		currentDiv = this.id;

		interchangeCoords('empty', currentDiv);
	}
	
	//Check whether the clicked tile exists at the right of empty div
	if((parseInt(left_x) == parseInt(parseInt(empty_x) + 100)) && (parseInt(top_y) == parseInt(empty_y))){

		document.getElementById('empty').value = this.id;
		this.id = parseInt(this.id)-1;
		currentDiv = this.id;

		interchangeCoords('empty', currentDiv);
	}
	
	//Check whether the clicked tile exists at the  top of empty div
	if((parseInt(top_y) == parseInt(parseInt(empty_y) - 100)) && (parseInt(left_x) == parseInt(empty_x))){

		document.getElementById('empty').value = this.id;
		this.id = parseInt(this.id)+4;
		currentDiv = this.id;

		interchangeCoords('empty', currentDiv);
	}
	
	//Check whether the clicked tile exists at the  bottom of empty div
	if((parseInt(top_y) == parseInt(parseInt(empty_y) + 100)) && (parseInt(left_x) == parseInt(empty_x))){

		document.getElementById('empty').value = this.id;
		this.id = parseInt(this.id)-4;
		currentDiv = this.id;

		interchangeCoords('empty', currentDiv);
	}
}

/**
 * Method which is used to create the empty div and append to the parent div (puzzlearea)
*/
function CreateDiv()
{
	var adiv = document.createElement('div');

	adiv.id = 'empty';
	document.getElementById('puzzlearea').appendChild(adiv);
	document.getElementById('empty').value = "15";
	document.getElementById('empty').style.left = "300px";
	document.getElementById('empty').style.top = "300px";
}

/**
 * Method is called when cursor goes off the tile to reset it's CSS property
*/
function mouseOut()
{
	this.className = this.className.replace("movablepiece", '');
}

/**
 * Method called to interchange the coordinates of two element ids
*/
function interchangeCoords(id1, id2)
{
	var empty_x = document.getElementById(id1).style.left;
	var empty_y = document.getElementById(id1).style.top;
	
	var left_x = document.getElementById(id2).style.left; 
	var top_y = document.getElementById(id2).style.top;	
	
	document.getElementById(id1).style.left = left_x;
	document.getElementById(id1).style.top = top_y;
	
	document.getElementById(id2).style.left = empty_x;
	document.getElementById(id2).style.top = empty_y;
}
