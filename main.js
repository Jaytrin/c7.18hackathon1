var winCondition ;

$(document).ready(startGame);

function startGame(){
    console.log('StartGame: Im running yo');
    createHTMLBoard(3);
    clickHandler();
    
}

function clickHandler(){
    $('.tile').click(getClickData);//put a function name in click()
    $('.reset').click(reset);//put reset function in click();
    $('#start').click();//need to put a start game function here
    $('#boardSize3').click(changeBoardSize);
    $('#boardSize5').click(changeBoardSize);
    $('#boardSize7').click(changeBoardSize);
    $('#winCondition3').click(setWinCondition);
    $('#winCondition5').click(setWinCondition);
    $('#winCondition7').click(setWinCondition);
}


function reset() {

    var boardSize = 0;
    var boardTile = $(".tile") ;
    // board text clear
    boardTile.text('');
    // board  object set to null
    boardSize = boardTile.length;
    console.log("#boardSize",boardSize);
    for( var i = 1; i <= boardSize ; i++){
         $("#value" + i ).data('symbol',null);
    }
}

function setWinCondition(){
    winCondition = null;
    winCondition = parseInt( $(event.currentTarget).text());
    console.log('setWinCondition() : current target',$(event.currentTarget));
    console.log('setWinCondition() ; winCondition',winCondition);
}