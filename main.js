$(document).ready(startGame);

function startGame(){
    clickHandler();

function clickHandler(){
    $('.tile').click();
    $('.reset').click(reset);
}