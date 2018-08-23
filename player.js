var players = [
    {
      symbol: 'X',
      'class': 'playerX',
      color: 'white'
    },
    {
      symbol: 'O',
      'class': 'playerO',
      color: 'white'
    }
  ]

var currentPlayer = 0;

function changePlayer() {
    currentPlayer = 1 - currentPlayer;
    return  players[currentPlayer].symbol;
}