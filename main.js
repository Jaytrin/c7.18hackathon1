$(document).ready(startGame);

function startGame(){
    clickHandler();
}

function clickHandler(){
    $('.tile').click();//put a function name in click()
    $('.reset').click();//put reset function in click();
    $('#start').click();//need to put a start game function here
    $('.boardSize').click();//changeBoardSize and parameters go in here
    $('.winCondition').click();//put setWinCondition and parameters here
}
