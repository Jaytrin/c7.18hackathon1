//Creating an array of objects that has the position of the board that the check will look for the currrent players matching symbol.
//Using nested arrays since the positions checked will come in pairs
var directionVector = [
    [{left:{'x': -1, 'y': 0}},{right:{'x': 1, 'y': 0}}],
    [{down:{x: 0, y: -1}},{up:{x: 0, y: 1}}],
    [{upLeft:{x: -1, y: 1}},{downRight:{x: 1, y: -1}}],
    [{upRight:{x: 1, y: 1}},{downLeft:{x: -1, y: -1}}]
];


function  changeBoardSize( boardSize){
      var strElement = null;
      var newDiv = null
      var numWidth = 0;
      var numHeight = 0;

    // get gameboard size %
    numWidth =   (1/boardSize)*100 ;
    numHeight =  (1/boardSize)*100 ;
    console.log(numWidth, numHeight );
    // deletd  exigst tile div
      $("#gameboard").remove(".tile");


      for( var i= 1 ; i <= boardSize*boardSize ; i ++){
          strElement = "<div class='tile'>" +
                       "<div id='value" + i + "'" + "></div>" +
                       "</div>" ;
          // append  new tile
          $("#gameboard").append(strElement);
          console.log(strElement);
          strElement = null;
      }
      $(".tile").css( {"width" : numWidth +"%" , "height" : numHeight+"%" } );

}



git