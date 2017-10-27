function pageLoad() {
	createPuzzle();
	//document.getElementById("shufflebutton").onclick = shufflePuzzle;
}

window.onload = pageLoad;

function createPuzzle() {
	var child =document.getElementById('puzzlearea').getElementsByTagName('div');
	var i = 0;
	//var id = 0;

	//document.getElementById("shufflebutton").onclick = shufflePuzzle;

	for ( x = 0; x < 4; x++){
		for ( y = 0; y <4; y++){
			/*childDivs[i].id = id;
			id++;
			//call to hoverCall() method when cursor hovers over tiles
			childDivs[i].onmouseover = hoverCall;
			//call to mouseOut() method when cursor goes off the tile
			childDivs[i].onmouseout = mouseOut;
			//call to clickCall() method when click event occur on tile
			childDivs[i].onclick = clickCall;
			
			//The loop will break when the position for last tile reached
			if(x===parseInt("3") && y===parseInt("3")){
				break;
			}
			*/
			child[i].className = "puzzlepiece";
			//child[i].setAttribute("class","puzzlepiece");

		//Nested if statements for tile positions
			if(x==0 || y==0){
				if(x==0 && y==0){
					child[i].style.top = "0px";
					child[i].style.left = "0px";
					child[i].style.backgroundPosition = '0px 0px';
					//childDivs[n].style.backgroundPositionY = "0px";
					i++;
					//alert(childDivs[n].style.left);
					continue;
				}
				else if(x==0){
					child[i].style.left = (parseInt(y)) * 100 + "px";
					child[i].style.top = "0px";
					child[i].style.backgroundPosition = (parseInt(-y)*100)+ 'px 0px';
					//childDivs[n].style.backgroundPositionY = "0px";
				}
				else if(y==0){
					child[i].style.left = "0px";
					child[i].style.top = (parseInt(x)) * 100 + "px";
					child[i].style.backgroundPosition = '0px '+(parseInt(-x)*100)+ 'px';
					//childDivs[n].style.backgroundPositionY = (parseInt(-i)*100)+ "px";
				}
			}
			else{
				child[i].style.top = (parseInt(x)) * 100 + "px";
				child[i].style.left = (parseInt(y)) * 100 + "px";
				child[i].style.backgroundPosition = (parseInt(-y)*100)+ 'px '+(parseInt(-x)*100)+ 'px';
				//childDivs[n].style.backgroundPositionY = (parseInt(-i)*100)+ "px";
			}
			i++;
			//child[x].className = "puzzlepiece";
			//child.style.position = "absolute";
			//child.style.left = (size * (x % column)) + "px";
			//child.style.top = size * Math.floor((x / column)) + "px";
		}
	}
}
