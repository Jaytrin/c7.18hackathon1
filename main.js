$(document).ready(startGame);

function startGame(){
    clickHandler();
    $(".tile").click(clickHandler);
}