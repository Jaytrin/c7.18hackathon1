//Creating an array of objects that has the position of the board that the check will look for the currrent players matching symbol.
//Using nested arrays since the positions checked will come in pairs
var directionVector = [
    [{left:{row: -1, column: 0}},{right:{row: 1, column: 0}}],
    [{down:{row: 0, column: -1}},{up:{row: 0, column: 1}}],
    [{upLeft:{row: -1, column: 1}},{downRight:{row: 1, column: -1}}],
    [{upRight:{row: 1, column: 1}},{downLeft:{row: -1, column: -1}}]
];

//Creating object to be used in DOM creation

function  createHTMLBoard(boardSize){//boardSize should be maximum at 7 for functionality and aesthetics
      var strElement = null;
      var newDiv = null;
      var numWidth = 0;
      var numHeight = 0;

    // get gameboard size %
    numWidth =   100/(boardSize+0.65) ;//to get percentage for tile width
    numHeight =  100/(boardSize+0.65) ;//to get percentage for tile height
    //delete existing tile divs
      $("#gameboard").empty();
      for( var i= 1 ; i <= boardSize*boardSize ; i ++){
          strElement = $('<div>').attr('id','value' + i).addClass('tile').data(tileObjectCreator(boardSize,i));
          // append new tile
          $("#gameboard").append(strElement);
          strElement = null;
      }
      $(".tile").css( {"width" : numWidth +"%" , "height" : numHeight+"%" } );
      setLimitOnWinConditions(boardSize);//limit user choice on win conditions based on the board size
}

function createJSBoard(boardSizeInput){
    var board = [];
    for(var i = 0; i < boardSizeInput; i++){
    var newArray = [];
        for( var u = 0; u < boardSizeInput; u++){
         newArray.push(' ');
        }
    board.push(newArray);
    }
    return board;
}

function tileObjectCreator(sizeOfBoard,currentIndex){
    var tileObject = {};
    tileObject.row = Math.ceil(currentIndex / sizeOfBoard);
    tileObject.column = currentIndex - (sizeOfBoard * (tileObject.row - 1));
    tileObject.symbol = null;
    return tileObject;
}
function changeBoardSize(){
    $('#winCondition5').removeClass('hide');
    $('#winCondition7').removeClass('hide');
    var boardSizeClick = parseInt( $(event.currentTarget).text());
    createHTMLBoard(boardSizeClick);
    clickHandler();
}

function setLimitOnWinConditions(boardSize){
    if(boardSize===3){
        $('#winCondition5').addClass('hide');
        $('#winCondition7').addClass('hide');
    } else if(boardSize===5){
        $('#winCondition7').addClass('hide');
    }
}

var currentData = [];
function getClickData(){
    currentData = [];
    console.log('im running');
    var audio = new Audio('sound.wav');
    audio.play();
    var currentTileClick = $(event.currentTarget);
    var currentSymbol = $(event.currentTarget).text();
    if(currentSymbol!==""){
        return;
    }
    var data = currentTileClick.data();
    console.log(data);
    var row = data.row;
    var column = data.column;
    var symbol = changePlayer();
    currentData.push(row,column,symbol);
    $(event.currentTarget).text(symbol);
    storeSymbolToArray(row,column,symbol);
    return currentData;
}


//Creates array to store objects containing the symbol.
//Need to tie the clicked object to the vectorArray
//vectorArray[rowFromClicked][columnFromClicked].symbol to check.

var vectorArray = [];
function createVectorArray(boardSize){
    for( var i = 1 ; i <= boardSize; i++){
        var innerArray = [];
        for(var u = 1; u <= boardSize; u++){
            var tileArrayObject = {};
            tileArrayObject.row = i;
            tileArrayObject.column = u;
            tileArrayObject.symbol = null;
            innerArray.push(tileArrayObject);
        }
        vectorArray.push(innerArray);
    }
    return vectorArray;
}

function checkForMatch(rowFromClicked, columnFromClicked, symbolFromClicked) {
    var checkArray = [];
    for (var i = 0; i < directionVector.length - 1; i++){
        var matchCounter = 1;
        var direction0 = directionVector[i][0];
        var direction1 = directionVector[i][1];

        var firstTile = nextDirection(direction0.row, direction0.column,vectorArray[rowFromClicked][columnFromClicked]);
        var secondTile = nextDirection(direction1.row, direction1.column,vectorArray[rowFromClicked][columnFromClicked]);

        while(firstTile.symbol === symbolFromClicked){
            matchCounter++;
            firstTile = nextDirection(direction0.row, direction0.column,vectorArray[rowFromClicked][columnFromClicked]);
        }

        while(secondTile.symbol === symbolFromClicked){
            matchCounter++;
            secondTile = nextDirection(direction1.row, direction1.column,vectorArray[rowFromClicked][columnFromClicked]);
        }
        checkArray.push(matchCounter);
    }
        if(Math.max(apply(null,checkArray))===winCondition){
        win();
        } else {checkForDraw();}
}

//Creates new currentTile to be checked for symbol match
function nextDirection(rowChange, columnChange, currentTile){
        currentTile.row = currentTile.row + rowChange;
        currentTile.column = currentTile.column + columnChange;
        return currentTile;
}

//Checks vectorArray for any object where symbol = null. Calls draw function if no symbols are null.
function checkForDraw(){
    var notDraw = false;
    for(var i = 0; i < vectorArray.length - 1; i++){
        for (var u = 0; u < vectorArray.length - 1; u++) {
            if (vectorArray[i][u].symbol = null) {
                notDraw = true;
                break;
    }}}
    if(!notDraw){
        draw()}
}

function draw(){
    alert('Cat\'s Game!');
}

function win(){
    alert('You Win!');
}

function storeSymbolToArray(row,column,symbol){
    vectorArray[row-1][column-1].symbol = symbol;
}
