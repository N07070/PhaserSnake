var game;

//Create a new game
game = new Phaser.Game(600, 450, Phaser.AUTO, '');

// Create a new state for the menu
game.state.add('Menu', Menu);

// Adding the Game state.
game.state.add('Game', Game);

// Add the Game Over state
game.state.add('Game_Over', Game_Over);

// Start the menu
game.state.start('Menu');
