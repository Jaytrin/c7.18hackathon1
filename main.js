$(document).ready(startGame);

function startGame(){
    clickHandler();
}

function clickHandler(){
    $('.tile').click(test);//put a function name in click()
    $('.reset').click(reset);//put reset function in click();
    $('#start').click();//need to put a start game function here
    $('.boardSize').click();//changeBoardSize and parameters go in here
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