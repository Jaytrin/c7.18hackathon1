$(document).ready(startGame);

function startGame(){
    console.log('StartGame: Im running yo')
    clickHandler();
}

function clickHandler(){
    $('.tile').click(test);//put a function name in click()
    $('.reset').click(reset);//put reset function in click();
    $('#start').click();//need to put a start game function here
    $('#boardSize3').click(changeBoardSize);
    $('#boardSize5').click(changeBoardSize);
    $('#boardSize7').click(changeBoardSize);
    $('.winCondition').click();//put setWinCondition and parameters here
}

function test() {
    var pressBoard= $(event.currentTarget) ;
    playerWho = changePlayer();
    //playerWho = '0';
    //
    if ( playerWho === 'X') {
        pressBoard.text('X');
    } else{
        pressBoard.text('0');
    }
}

function reset() {
    // board clear
    var boardTile = $(".tile") ;
    boardTile.text('');

}