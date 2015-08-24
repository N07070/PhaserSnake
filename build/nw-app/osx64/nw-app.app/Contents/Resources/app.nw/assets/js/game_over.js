var Game_Over = {

    preload : function() {
        // Load the needed image for this game screen.
        game.load.image('gameover', './assets/images/gameover.png');
    },

    create : function() {

        music.pause();
        // Create button to start game like in Menu.
        this.add.button(0, 0, 'gameover', this.startGame, this);

        // Add text with information about the score from last game.
        game.add.text(235, 310, "LAST SCORE", { font: "bold 16px sans-serif", fill: "#46c0f9", align: "center"});
        game.add.text(350, 308, score.toString(), { font: "bold 20px sans-serif", fill: "#fff", align: "center" });
        game.add.text(250, 340, "Highscore", {font: "bold 16px sans-serif", fill: "#fff", align: "center" })
        game.add.text(200, 360, "Feature coming soon... ;-)", {font: "bold 16px sans-serif", fill: "#eee", align: "center" })
    },

    startGame: function () {

        // Change the state back to Game.
        this.state.start('Game');

    }

};
