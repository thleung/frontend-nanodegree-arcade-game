// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

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
    this.col = 2;
    this.row = 5;
}

Player.prototype.locx = function() {
    return this.col * 101;
}

Player.prototype.locy = function() {
    return (this.row * 81);
}

Player.prototype.update = function() {

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.locx(), this.locy());

}

// Handles user input of player character on screen
Player.prototype.handleInput = function(input) {
    console.log(input);
    if (input === 'left') {
        if (this.col > 0) {
            this.col = this.col - 1;
        }

    } else if ( input === 'up') {
        if (this.row > 0) {
            this.row = this.row - 1;
        }

    } else if ( input === 'right') {
        if (this.col < 4) {
            this.col = this.col + 1;
        }

    } else if ( input === 'down') {
        if (this.row < 5) {
            this.row = this.row + 1;
        }
    }

}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var Enemy1 = new Enemy('Bill');
var allEnemies = [Enemy1];
var player = new Player();


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
