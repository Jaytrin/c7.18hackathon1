//Creating an array of objects that has the position of the board that the check will look for the currrent players matching symbol.
//Using nested arrays since the positions checked will come in pairs
var directionVector = [
    [{left:{'x': -1, 'y': 0}},{right:{'x': 1, 'y': 0}}],
    [{down:{x: 0, y: -1}},{up:{x: 0, y: 1}}],
    [{upLeft:{x: -1, y: 1}},{downRight:{x: 1, y: -1}}],
    [{upRight:{x: 1, y: 1}},{downLeft:{x: -1, y: -1}}]
];

function  changeBoardSize(boardSize){
      var strElement = null;
      var newDiv = null
      var numWidth = 0;
      var numHeight = 0;

//Runs a check in one direction from the directionVector to see if there are any matches.
function checkOneDirection(){
    ;}

//Creating object to be used in DOM creation

    // get gameboard size %
    numWidth =   (1/boardSize)*100 ;
    numHeight =  (1/boardSize)*100 ;
    console.log(numWidth, numHeight );
    //delete existing tile divs
      $("#gameboard").remove(".tile");


      for( var i= 1 ; i <= boardSize*boardSize ; i ++){
          strElement = "<div class='tile'>" +
                       "<div id='value" + i + "'" + "></div>" +
                       "</div>" ;
          // append new tile
          $("#gameboard").append(strElement);
          console.log(strElement);
          strElement = null;
      }
      $(".tile").css( {"width" : numWidth +"%" , "height" : numHeight+"%" } );

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
