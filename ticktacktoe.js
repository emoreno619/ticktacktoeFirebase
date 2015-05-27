// ticktacktoe.js

//TODO:

// work on read and rebuild build
// create winner var for game end
// authenticate github pages with firebase

function makeGrid(){
	
	var divArr = []

	for (var i = 0; i < 9; i++){
		var aSquare = document.createElement("div");
		var $aSquare = $(aSquare)
		$("#gridContainer").append($aSquare);
		divArr.push(aSquare);
	}

	makeStyle(divArr);
	tileArr = makeTiles(divArr);
	gameLogic(divArr, tileArr);
}

function makeTiles(divArr){

	var tileArr = []

	for (var i = 0; i < 9; i++){
		var aSquare = document.createElement("div");
		var $aSquare = $(aSquare);
		$("body").append($aSquare);
		$aSquare.css("position","absolute")
		tileArr.push(aSquare);
	}

	makeTileStyle(tileArr, divArr);
	return tileArr;
}

function makeTileStyle(tileArr, divArr){

	for (var i = 0; i < 9; i++){
		$(tileArr[i]).offset($(divArr[i]).offset()).css("width", "17%")

	}

}

////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
// var myDataRef = new Firebase('https://resplendent-heat-9896.firebaseio.com/');

// myDataRef.push({divArr : divArr});
var moveCounter = 0;
var myDataRef = new Firebase('https://resplendent-heat-9896.firebaseio.com/');

// myDataRef.authWithOAuthPopup("github", function(error, authData) {
//   if (error) {
//     console.log("Login Failed!", error);
//   } else {
//     console.log("Authenticated successfully with payload:", authData);
//   }
// });


function resetDB(){
	for (var j = 0; j < 9; j++){
		bMove = "move" + j;
		myDataRef.child(bMove).set("")
	}
}

function gameLogic(divArr, tileArr){

	var turnID = 1
	resetDB();
	

	$("#gridContainer").children().click(function(event){  
		flip($(this));

	})

	function flip(clickedSquare){
		if(!clickedSquare.hasClass("flipped")){
			clickedSquare.addClass("flipped")
			if(!turnID){
				// $(tileArr[parseInt(clickedSquare.attr("id"))]).html('<img src="https://i0.wp.com/theaveragejess.com/wp-content/uploads/2012/02/redx-300x297.jpg" >')
				// $(tileArr[parseInt(clickedSquare.attr("id"))]).children().css("maxWidth", "78%").css("padding", "2%")
				clickedSquare.addClass("anX")
				turnID = !turnID
				if(checkWin(divArr))
					console.log("WINNER!")
			} else {
				// $(tileArr[parseInt(clickedSquare.attr("id"))]).html('<img src="http://dailydropcap.com/images/O-7.jpg" >')
				// $(tileArr[parseInt(clickedSquare.attr("id"))]).children().css("maxWidth", "93%").css("padding", "2%")
				clickedSquare.addClass("anO")
				turnID = !turnID
				if(checkWin(divArr))
					console.log("WINNER!")
			}
			////////////////////////////////////
			////////////////////////////////////
			////////////////////////////////////
			
			var aMove = "move";
			aMove += moveCounter;
			if (moveCounter <= 8)
				moveCounter += 1;

			myDataRef.child(aMove).set(clickedSquare.attr('id') + " " + clickedSquare.attr('class'))
			
			//Reset game
			if (moveCounter == 9) {
				alert("Game over")
				endGame();
			}
		}
	}

	function endGame(){
		resetDB();
		for(var k = 0; k < tileArr.length; k++){
			$(tileArr[k]).html('')
			$(divArr[k]).attr("class", "")
		}
		moveCounter = 0
	}

 	myDataRef.on('child_changed', function(snapshot) { 

 		var boardUpdate = snapshot.val();
 		updateSquare(boardUpdate);
 		//write function to extract divArr from snapshot and assign to local divArr

	})

	function updateSquare(boardUpdate){
		var divID = boardUpdate.slice(0,1)
 		var flippedClass = boardUpdate.slice(2,9)
 		var symbolClass = boardUpdate.slice(10,13)

 		console.log(symbolClass)

 		// if ($(divArr[parseInt(divID)]).hasClass(flippedClass)){

	 		if (symbolClass == "anO") {
	 			// $(tileArr[parseInt(divID)]).html('BOOP')
	 			$(tileArr[parseInt(divID)]).html('<img src="http://dailydropcap.com/images/O-7.jpg" >')
	 			$(tileArr[parseInt(divID)]).children().css("maxWidth", "90%").css("padding", "4.75%")
	 		} else {
	 			$(tileArr[parseInt(divID)]).html('<img src="https://i0.wp.com/theaveragejess.com/wp-content/uploads/2012/02/redx-300x297.jpg" >')
	 			$(tileArr[parseInt(divID)]).children().css("maxWidth", "78%").css("padding", "5.75%")
			}
		// }
	}

	function checkWin(divArr){
		var possibleWinners = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]

		for (var i = 0; i < possibleWinners.length; i++) {
			if($(divArr[possibleWinners[i][0]]).hasClass("anX") && $(divArr[possibleWinners[i][1]]).hasClass("anX") && $(divArr[possibleWinners[i][2]]).hasClass("anX")){
				return true
			} else if ($(divArr[possibleWinners[i][0]]).hasClass("anO") && $(divArr[possibleWinners[i][1]]).hasClass("anO") && $(divArr[possibleWinners[i][2]]).hasClass("anO")){
				return true
			}
		}
	}
}



function makeStyle(divArr){

	$("#topMargin").css("padding-bottom", "2%").css("backgroundColor", "red")
	$("#rightMargin").css("padding-right", "10%").css("width", "12.5%").css("float", "right").css("backgroundColor", "red").css("padding-bottom", "50%")
	$("#leftMargin").css("padding-right", "10%").css("width", "12.5%").css("float", "left").css("backgroundColor", "red").css("padding-bottom", "50%")

	$("#gridContainer").children().css("width", "17%").css("float", "left").css("padding-bottom", "15%").css("backgroundColor", "white").css("zIndex", -1)

	$(divArr[0]).attr("id", "0").css("border-right", "8px solid black").css("border-bottom", "8px solid black").css("margin-top", "2%").css("margin-left", "1.3%")
	$(divArr[1]).attr("id", "1").css("border-right", "8px solid black").css("border-bottom", "8px solid black").css("margin-top", "2%")
	$(divArr[2]).attr("id", "2").css("border-bottom", "8px solid black").css("margin-top", "2%")
	$(divArr[3]).attr("id", "3").css("border-right", "8px solid black").css("border-bottom", "8px solid black").css("margin-left", "1.3%")
	$(divArr[4]).attr("id", "4").css("border-right", "8px solid black").css("border-bottom", "8px solid black")
	$(divArr[5]).attr("id", "5").css("border-bottom", "8px solid black")
	$(divArr[6]).attr("id", "6").css("border-right", "8px solid black").css("margin-left", "1.3%")
	$(divArr[7]).attr("id", "7").css("border-right", "8px solid black")
	$(divArr[8]).attr("id", "8")

}

$(function(){
	makeGrid();
})