// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    // random interval variable to set for enemy speed
    this.x = this.x + this.speed * dt;

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Let them go off of the screen before,
    // moving them back so that they travel off
    // smoothly.
    if (this.x > 500) {
        // Once off screen, need to reset the enemy position so there
        // are always 3 enemies on the screen
        this.x = -60;
        this.randomSpeed();
    }

    // Check if user hits enemy object
    if ( (player.x > this.x - 50) && (player.x < this.x + 50) && (player.y > this.y - 50) && (player.y < this.y + 50) ) {
        // Player has hit enemy object, reset player to default start position
        player.x = 200;
        player.y = 400;
        player.score = 0;
        player.key = 0;
    }
}

Enemy.prototype.randomSpeed = function() {
    var speedMultiply = Math.floor(Math.random() * 10 + 1);
    this.speed = 25 * speedMultiply;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.score = 0;
    this.key = 0;
}

Player.prototype.update = function() {
    document.getElementById("score").innerText="Score: " + player.score;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Handles user input of player character on screen
Player.prototype.handleInput = function(input) {
    if (input === 'left') {
        if (this.x > 0) {
            this.x = this.x - 100;
        }

    } else if ( input === 'up') {
        if (this.y > 0) {
            this.y = this.y - 80;
        }

    } else if ( input === 'right') {
        if (this.x < 400) {
            this.x = this.x + 100;
        }

    } else if ( input === 'down') {
        if (this.y < 400) {
            this.y = this.y + 80;
        }
    }
    if ( player.y === 0 ) {
        player.score = player.score + 1;
        //document.getElementById("score").innerText="Score: " + player.score; 
        //console.log(player.score);
        this.x = 200;
        this.y = 400;

        // generate new key location
        key.x = Math.floor( Math.random() * 5 ) * 100;
        key.y = (Math.floor( Math.random() * 3 ) + 1) * 80;
    }

}

var Key = function() {
    this.sprite = 'images/Key.png';
    this.x = Math.floor( Math.random() * 5 ) * 100;
    this.y = (Math.floor( Math.random() * 3 ) + 1) * 80;
}

Key.prototype.update = function() {
    console.log("key");
    console.log(player.key);
    // Check if user hits key object
    if ( (player.x > key.x - 50) && (player.x < key.x + 50) && (player.y > key.y - 50) && (player.y < key.y + 50) ) {
        // Player has hit key object, remove key object from screen
        player.key = player.key + 1;
        //document.getElementById("key").innerText="Key: " + player.key; 
        key.x  = -100;
        key.y = -100;
    }
    document.getElementById("key").innerText="Key: " + player.key;
}

Key.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    var tempSpeed = Math.floor(Math.random() * 5 + 1) * 75;
    allEnemies.push(new Enemy(-60, 60 + 85 * i, tempSpeed));

}
var player = new Player();
var key = new Key();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
