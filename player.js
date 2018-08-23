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
    return currentPlayer;
}