$(document).ready(startGame);

function startGame(){
    console.log('StartGame: Im running yo');
    createHTMLBoard(3);
    clickHandler();
}

function clickHandler(){
    $('.tile').click();//put a function name in click()
    $('.reset').click();//put reset function in click();
    $('#start').click();//need to put a start game function here
    $('#boardSize3').click(changeBoardSize);
    $('#boardSize5').click(changeBoardSize);
    $('#boardSize7').click(changeBoardSize);
    $('.winCondition').click();//put setWinCondition and parameters here
}
