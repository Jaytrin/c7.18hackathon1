//Creating an array of objects that has the position of the board that the check will look for the currrent players matching symbol.
//Using nested arrays since the positions checked will come in pairs
var directionVector = [
    [{left:{'x': -1, 'y': 0}},{right:{'x': 1, 'y': 0}}],
    [{down:{x: 0, y: -1}},{up:{x: 0, y: 1}}],
    [{upLeft:{x: -1, y: 1}},{downRight:{x: 1, y: -1}}],
    [{upRight:{x: 1, y: 1}},{downLeft:{x: -1, y: -1}}]
];


