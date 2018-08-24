var players = [
    {
      symbol: 'O',
      'class': 'playerO',
      color: 'white'
    },
    {
      symbol: 'X',
      'class': 'playerX',
      color: 'white'
    }
  ]

var currentPlayer = 0;

function changePlayer(){
    currentPlayer = 1 - currentPlayer;
    displayCurrentPlayer();
    return  players[currentPlayer].symbol;
}

function displayCurrentPlayer(){
  $('.player1').removeClass('currentPlayer');
  $('.player2').removeClass('currentPlayer');
  if(currentPlayer===0){
    $('.player1').addClass('currentPlayer');
  } else{
    $('.player2').addClass('currentPlayer');
  }
}