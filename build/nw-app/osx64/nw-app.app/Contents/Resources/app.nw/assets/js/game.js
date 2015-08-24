var snake, apple, squareSize, score, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue,
    textStyle_Key, textStyle_Value;

var Game = {

    preload : function() {
        game.load.image('snake', './assets/images/snake.png');
        game.load.image('apple', './assets/images/apple.png');
        game.load.audio('music_loop', ['./assets/music/loop.mp3', './assets/music/loop.ogg'])
        game.load.audio('eat_apple', ['./assets/music/eat_apple.mp3','./assets/music/eat_apple.ogg'])
    },

    create : function() {

        // Make the variables available

        snake = [];                     // The snake stack
        apple = {};                     // The apple object
        squareSize = 15;                // The snake image is 15x15 pixels.
        score = 0;                      // Game score
        speed = 0;                      // Game speed
        updateDelay = 0;                // Update rates.
        direction = 'right';            // The direction of the snake
        new_direction = null;           // A buffer to store the new direction
        addNew = false;                 // A variable used when an apple has been eaten

        // Set up a keybord input
        cursors = game.input.keyboard.createCursorKeys();

        for(var i = 0; i < 10; i++){
            snake[i] = game.add.sprite(150+i*squareSize, 150, 'snake');  // Parameters are (X coordinate, Y coordinate, image)
        }

        // Genereate the first apple.
        this.generateApple();

        // Add Text to top of game.
        text_style_Key = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center" };
        text_style_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };

        // Score.
        game.add.text(30, 20, "SCORE", text_style_Key);
        scoreTextValue = game.add.text(90, 18, score.toString(), text_style_Value);
        // Speed.
        game.add.text(500, 20, "SPEED", text_style_Key);
        speedTextValue = game.add.text(558, 18, speed.toString(), text_style_Value);

        // When you eat that apple

        eat_apple_fx = game.add.audio('eat_apple');

        // Let's play some music !

        music = game.add.audio('music_loop');

        if (music.paused) {
                music.loopFull();
        }else {
            music.loopFull();
        }
    },

    update: function() {

        // Handle the key press
        if (cursors.right.isDown && direction!='left')
        {
            new_direction = 'right';
        }
        else if (cursors.left.isDown && direction!='right')
        {
            new_direction = 'left';
        }
        else if (cursors.up.isDown && direction!='down')
        {
            new_direction = 'up';
        }
        else if (cursors.down.isDown && direction!='up')
        {
            new_direction = 'down';
        }

        // Genereate the speed based on the score
        speed = Math.min(12, Math.floor(score/2));
        // Update speed value on game screen.
        speedTextValue.text = speed;

        // Increase a counter on every update call.
        updateDelay++;

        if (updateDelay % (10 - speed) == 0) {


            // Snake movement

            var firstCell = snake[snake.length - 1],
                lastCell = snake.shift(),
                oldLastCellx = lastCell.x,
                oldLastCelly = lastCell.y;

            // If a new direction has been chosen from the keyboard, make it the direction of the snake now.
            if(new_direction){
                direction = new_direction;
                new_direction = null;
            }


            // Change the last cell's coordinates relative to the head of the snake, according to the direction.

            if(direction == 'right'){

                lastCell.x = firstCell.x + 15;
                lastCell.y = firstCell.y;
            }
            else if(direction == 'left'){
                lastCell.x = firstCell.x - 15;
                lastCell.y = firstCell.y;
            }
            else if(direction == 'up'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - 15;
            }
            else if(direction == 'down'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + 15;
            }


            // Place the last cell in the front of the stack.
            // Mark it the first cell.

            snake.push(lastCell);
            firstCell = lastCell;

        if(addNew){
            snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
            addNew = false;
        }

        // Check for apple collision.
        this.appleCollision();

        // Check for collision with self. Parameter is the head of the snake.
        this.selfCollision(firstCell);

        // Check with collision with wall. Parameter is the head of the snake.
        this.wallCollision(firstCell);

        }
    },

    generateApple: function(){

        // Chose a random place on the grid.
        // X is between 0 and 585 (39*15)
        // Y is between 0 and 435 (29*15)

        var randomX = Math.floor(Math.random() * 40 ) * squareSize,
            randomY = Math.floor(Math.random() * 30 ) * squareSize;

        // Add a new apple.
        apple = game.add.sprite(randomX, randomY, 'apple');
    },

    appleCollision: function() {

        // Check if any part of the snake is overlapping the apple.
        // This is needed if the apple spawns inside of the snake.
        for(var i = 0; i < snake.length; i++){
            if(snake[i].x == apple.x && snake[i].y == apple.y){

                // Next time the snake moves, a new block will be added to its length.
                addNew = true;

                // Destroy the old apple.
                eat_apple_fx.play();
                apple.destroy();

                // Make a new one.
                this.generateApple();

                // Increase score.
                score++;

                // Refresh scoreboard.
                scoreTextValue.text = score.toString();

            }
        }
    },

    selfCollision: function(head) {

        // Check if the head of the snake overlaps with any part of the snake.
        for(var i = 0; i < snake.length - 1; i++){
            if(head.x == snake[i].x && head.y == snake[i].y){

                // If so, go to game over screen.
                game.state.start('Game_Over');
            }
        }

    },

    wallCollision: function(head) {

        // Check if the head of the snake is in the boundaries of the game field.

        if(head.x >= 600 || head.x < 0 || head.y >= 450 || head.y < 0){


            // If it's not in, we've hit a wall. Go to game over screen.
            game.state.start('Game_Over');
        }

    }
};
