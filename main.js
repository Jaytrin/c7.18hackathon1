/ global variable
var playerWho = null;


// whern click booard   check player  then  return  X , 0
function clickHandler() {
    console.log('clickHandler');
    var pressBoard= $(event.currentTarget) ;
    //playerWho = changePlayer();
    playerWho = '0';

    if ( playerWho === 'X') {
        pressBoard.text('X');
    } else{
        pressBoard.text('0');
    }

}