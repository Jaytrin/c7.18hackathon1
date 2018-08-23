//Creating an array of objects that has the position of the board that the check will look for the currrent players matching symbol.
//Using nested arrays since the positions checked will come in pairs
var directionVector = [
    [{left:{x: -1, y: 0}},{right:{x: 1, y: 0}}],
    [{down:{x: 0, y: -1}},{up:{x: 0, y: 1}}],
    [{upLeft:{x: -1, y: 1}},{downRight:{x: 1, y: -1}}],
    [{upRight:{x: 1, y: 1}},{downLeft:{x: -1, y: -1}}]
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


function getClickData(){
    console.log('im running');
    var currentData = [];
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

// console.log(createVectorArray(3));

function checkForMatch(rowFromClicked, columnFromClicked, symbolFromClicked){
    
}

function storeSymbolToArray(row,column,symbol){
    vectorArray[row-1][column-1].symbol = symbol;
}
