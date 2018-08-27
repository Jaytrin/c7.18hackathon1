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
      responsiveText();
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
    var currentSymbol = $(event.currentTarget).text();
    if(currentSymbol!==""){
        return;
    }
    currentData = [];
    var audio = new Audio('sound.wav');
    audio.play();
    var currentTileClick = $(event.currentTarget);
    var symbol = players[currentPlayer].symbol;//check this
    $(event.currentTarget).text(symbol);
    var data = currentTileClick.data();
    console.log(data);
    var row = data.row;
    var column = data.column;
    currentData.push(row,column,symbol);
    storeSymbolToArray(row,column,symbol);
    $(event.currentTarget).data('symbol',symbol);
    // checkForMatch(row,column,symbol);
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
// var newPosition = {newRow: null, newColumn: null};
var checkArray = [];

function checkForMatch(rowFromClicked, columnFromClicked, symbolFromClicked){
    var matchCounter = 1;
    var clickedTile = jsArray[rowFromClicked][columnFromClicked];

    for(var i = 0; i < directionVector.length; i++){
    var firstRowChange = directionVector[i][0].row + rowFromClicked; //gives the new row
    var firstColumnChange = directionVector[i][0].column + columnFromClicked; //give the new column
    var secondRowChange = directionVector[i][1].row + rowFromClicked;
    var secondColumnChange = directionVector[i][1].column + columnFromClicked;


    var newCoodinate1 = getSymbolAtCoordinates(firstRowChange,firstColumnChange);
    var newCoordinate2 = getSymbolAtCoordinates(secondRowChange,secondColumnChange);

    while(newCoodinate1 === symbolFromClicked){
        console.log('First While Loop');
        matchCounter++;
        firstRowChange = firstRowChange + directionVector[i][0].row;
        firstColumnChange = firstColumnChange + directionVector[i][0].column;
        newCoodinate1 = getSymbolAtCoordinates(firstRowChange,firstColumnChange);
    }

    while(newCoodinate2 === symbolFromClicked){
        console.log('Second While Loop');
        matchCounter++;
        secondRowChange = secondRowChange + directionVector[i][0].row;
        secondColumnChange = secondColumnChange + directionVector[i][0].column;
        newCoodinate2 = getSymbolAtCoordinates(secondRowChange,firstColumnChange);
    }

    checkArray.push(matchCounter);

    if(Math.max.apply(null,checkArray) === winCondition){
    win();
    } else {checkForDraw();}
}}


//     console.log('checkFunction running');
//     checkArray = [];
//     var lastTile = null;
//     var firstTile = null;
//     var secondTile = null;
//     var originalTile = jsArray[rowFromClicked][columnFromClicked];
//     for (var i = 0; i < directionVector.length; i++){
//         var matchCounter = 1;
//         var direction0 = directionVector[i][0];
//         var direction1 = directionVector[i][1];
//
//         nextDirection(direction0.row, direction0.column,jsArray[rowFromClicked][columnFromClicked]);
//         firstTile = jsArray[newPosition.newRow][newPosition.newColumn];
//
//         var possible = nextDirection(direction1.row, direction1.column,jsArray[rowFromClicked][columnFromClicked]);
//         if(possible===false){
//             continue;
//         }
//         secondTile = jsArray[newPosition.newRow][newPosition.newColumn];
//
//         console.log('first tile:',firstTile);
//         console.log('first tile row:',firstTile.row);
//
//         lastTile = null;
//         while(firstTile.symbol === symbolFromClicked && firstTile !== lastTile && firstTile !== originalTile){
//             lastTile = firstTile;
//             console.log('First While Loop');
//             matchCounter++;
//             nextDirection(direction0.row, direction0.column,jsArray[newPosition.newRow][newPosition.newColumn]);
//             firstTile = jsArray[newPosition.newRow][newPosition.newColumn];
//         }
//
//         lastTile = null;
//        // while( getSymbolAtCoordinates(direction0.col+1, direction0.col+1) === getSymbolAtCoordinates(direction0.col, direction0.col))
//         while(secondTile.symbol === symbolFromClicked && secondTile !== lastTile && secondTile !== originalTile){
//             lastTile = secondTile;
//             console.log('Second While Loop');
//             matchCounter++;
//             nextDirection(direction1.row, direction1.column,jsArray[newPosition.newRow][newPosition.newColumn]);
//             secondTile = jsArray[newPosition.newRow][newPosition.newColumn];
//         }
//
//         console.log('checkArray:',checkArray);
//         console.log('match counter:',matchCounter);
//         checkArray.push(matchCounter);
//         console.log('checkArray:',checkArray);
//     }
//         if(Math.max.apply(null,checkArray) === winCondition){
//         win();
//         } else {checkForDraw();}
// }

///Dan Code
//Checks if the coordinate exists on the board
function getSymbolAtCoordinates(x, y){
    if(x >= jsArray.length || x < 0 || y >= jsArray.length || y<0){
        return false;
    }
    return jsArray[x][y];
}

// Creates new currentTile to be checked for symbol match
function nextDirection(rowChange, columnChange, currentTile){
        var nextRow = parseInt(currentTile.row + rowChange);
        var nextCol = parseInt(currentTile.column + columnChange);
        if(nextRow >= jsArray.length || nextCol >= jsArray.length || nextRow < 0 || nextCol < 0){
            return false;
        }
        if(nextRow >= 0){
            newPosition.newRow = parseInt(currentTile.row + rowChange);
        } else {newPosition.newRow = currentTile.row;}

        if(nextCol >= 0){
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
    var audio = new Audio('draw.wav');
    audio.play();
}

function win(){
    alert('You Win!')
    var audio = new Audio('win.flac');
    audio.play();
}

function storeSymbolToArray(row,column,symbol){
    jsArray[row][column].symbol = symbol;
}

function  responsiveText() {
    var tile = $('.tile');
    var currentfontSize =  tile.css('font-size');
    var currentWidth = tile.width();
    var currentHeight = tile.height();
    var constraint = 5 * (currentWidth /100) ;
    // console.log('responsiveText', constraint)
    tile.css('font-size', constraint + 'em');

}