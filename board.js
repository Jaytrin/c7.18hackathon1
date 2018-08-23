//Creating an array of objects that has the position of the board that the check will look for the currrent players matching symbol.
//Using nested arrays since the positions checked will come in pairs
var directionVector = [
    [{row: -1, column: 0},{row: 1, column: 0}],
    [{row: 0, column: -1},{row: 0, column: 1}],
    [{row: -1, column: 1},{row: 1, column: -1}],
    [{row: 1, column: 1},{row: -1, column: -1}]
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
      for( var i= 0 ; i < boardSize*boardSize ; i ++){
          strElement = $('<div>').attr('id','value' + i).addClass('tile').data(tileObjectCreator(boardSize,i));
          // append new tile
          $("#gameboard").append(strElement);
          strElement = null;
      }
      $(".tile").css( {"width" : numWidth +"%" , "height" : numHeight+"%" } );
      setLimitOnWinConditions(boardSize);//limit user choice on win conditions based on the board size
        createjsArray(boardSize);
      winCondition = boardSize;
}
//
// function createJSBoard(boardSizeInput){
//     var board = [];
//     for(var i = 0; i < boardSizeInput; i++){
//     var newArray = [];
//         for( var u = 0; u < boardSizeInput; u++){
//          newArray.push(' ');
//         }
//     board.push(newArray);
//     }
//     return board;
// }

function tileObjectCreator(sizeOfBoard,currentIndex){
    var tileObject = {};
    tileObject.row = Math.abs(Math.floor((currentIndex / sizeOfBoard)));
    tileObject.column = currentIndex - (sizeOfBoard * tileObject.row);
    tileObject.symbol = null;
    return tileObject;
}

function changeBoardSize(){
    $('#winCondition5').removeClass('hide');
    $('#winCondition7').removeClass('hide');
    var boardSizeClick = parseInt($(event.currentTarget).text());
    createHTMLBoard(boardSizeClick);
    clickHandler();
    return boardSizeClick;
}

function setLimitOnWinConditions(boardSize){
    if(boardSize===3){
        $('#winCondition5').addClass('hide');
        $('#winCondition7').addClass('hide');
    } else if(boardSize===5){
        $('#winCondition7').addClass('hide');
    }
}

var currentData = [];//might not need
function getClickData(){
    currentData = [];
    console.log('im running');
    var currentTileClick = $(event.currentTarget);
    var currentSymbol = $(event.currentTarget).text();

    if(currentSymbol!==""){
        return;
    }
    var data = currentTileClick.data();
    console.log(data);
    var row = data.row;
    var column = data.column;
    var symbol = players[currentPlayer].symbol;//check this
    currentData.push(row,column,symbol);
    $(event.currentTarget).text(symbol);
    storeSymbolToArray(row,column,symbol);
    $(event.currentTarget).data('symbol',symbol);
    checkForMatch(row,column,symbol);
    changePlayer();
    return currentData;
}


//Creates array to store objects containing the symbol.
//Need to tie the clicked object to the jsArray
//jsArray[rowFromClicked][columnFromClicked].symbol to check.

var jsArray = [];
function createjsArray(boardSize){
    for(var i = 0 ; i < boardSize; i++){
        var innerArray = [];
        for(var u = 0; u < boardSize; u++){
            var tileArrayObject = {};
            tileArrayObject.row = i;
            tileArrayObject.column = u;
            tileArrayObject.symbol = null;
            innerArray.push(tileArrayObject);
        }
        jsArray.push(innerArray);
    }
    return jsArray;
}
var newPosition = {newRow: null, newColumn: null};
var checkArray = [];
function checkForMatch(rowFromClicked, columnFromClicked, symbolFromClicked) {
    console.log('checkFunction running');
    checkArray = [];
    var lastTile = null;
    var firstTile = null;
    var secondTile = null;
    var originalTile = jsArray[rowFromClicked][columnFromClicked];
    for (var i = 0; i < directionVector.length; i++){
        var matchCounter = 1;
        var direction0 = directionVector[i][0];
        var direction1 = directionVector[i][1];

        nextDirection(direction0.row, direction0.column,jsArray[rowFromClicked][columnFromClicked]);
        firstTile = jsArray[newPosition.newRow][newPosition.newColumn];

        nextDirection(direction1.row, direction1.column,jsArray[rowFromClicked][columnFromClicked]);
        secondTile = jsArray[newPosition.newRow][newPosition.newColumn];

        console.log('first tile:',firstTile);
        console.log('first tile row:',firstTile.row);

        lastTile = null;
        while(firstTile.symbol === symbolFromClicked && firstTile !== lastTile && firstTile !== originalTile){
            lastTile = firstTile;
            console.log('First While Loop');
            matchCounter++;
            nextDirection(direction0.row, direction0.column,jsArray[newPosition.newRow][newPosition.newColumn]);
            firstTile = jsArray[newPosition.newRow][newPosition.newColumn];
        }

        lastTile = null;
        while(secondTile.symbol === symbolFromClicked && secondTile !== lastTile && secondTile !== originalTile){
            lastTile = secondTile;
            console.log('Second While Loop');
            matchCounter++;
            nextDirection(direction1.row, direction1.column,jsArray[newPosition.newRow][newPosition.newColumn]);
            secondTile = jsArray[newPosition.newRow][newPosition.newColumn];
        }

        console.log('checkArray:',checkArray);
        console.log('match counter:',matchCounter);
        checkArray.push(matchCounter);
        console.log('checkArray:',checkArray);
    }
        if(Math.max.apply(null,checkArray) === winCondition){
        win();
        } else {checkForDraw();}
}

//Creates new currentTile to be checked for symbol match
function nextDirection(rowChange, columnChange, currentTile){

        if(parseInt(currentTile.row + rowChange) >= 0){
            newPosition.newRow = parseInt(currentTile.row + rowChange);
        } else {newPosition.newRow = currentTile.row;}

        if(parseInt(currentTile.column + columnChange) >= 0){
            newPosition.newColumn = parseInt(currentTile.column + columnChange);
        } else {newPosition.newColumn = currentTile.column;}
        return newPosition;
}

//Checks jsArray for any object where symbol = null. Calls draw function if no symbols are null.
function checkForDraw(){
    var notDraw = false;
    for(var i = 0; i < jsArray.length; i++){
        for (var u = 0; u < jsArray.length; u++){
            if (jsArray[i][u].symbol === null){
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
    alert('You Win!')
}

function storeSymbolToArray(row,column,symbol){
    jsArray[row][column].symbol = symbol;
}
