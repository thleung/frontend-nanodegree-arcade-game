/** Nanodegree Arcade Game Frogger Imitation */

/** Represents an enemy object
 *  @param {integer} x - The x coordinate of the enemy object
 *  @param {integer} y - The y coordinate of the enemy object
 *  @param {integer} speed - The speed of the enemy object
 *  @param {image} sprite - The image location of the enemy object
 */
var Enemy = function(x, y, speed) {

    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

/** Update the enemy's position during game
 *  @param {decimal} dt - a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    /** You should multiply any movement by the dt parameter
     *  which will ensure the game runs at the same speed for
     *  all computers.
     */
    
    /** Multiply dt with speed to incrmentally move the enemy object */
    this.x = this.x + this.speed * dt;

    /** Check if enemy is offscreen */
    if (this.x > 500) {
        this.x = -100;

        /** Enemy has exited the screen, randomly change the speed and placement of the enemy */
        this.randomSpeed();
        this.randomYLocation();
    }

    /** Check if user hits enemy object */
    if ( (player.x > this.x - 50) && (player.x < this.x + 50) && (player.y > this.y - 50) && (player.y < this.y + 50) ) {
        /** Player has collided with enemy object, reset player to default start position */
        player.x = 200;
        player.y = 400;
        player.score = 0;   /** Reset score */
        player.key = 0;     /** Reset key score */
    }
};

/** Randomly changes enemy speed */
Enemy.prototype.randomSpeed = function() {
    this.speed = 25 * Math.floor(Math.random() * 10 + 1);
};

/** Randomly changes enemy location */
Enemy.prototype.randomYLocation = function() {
    var col = Math.floor(Math.random() * 3);
    this.y = 60 + 85 * col;
};

/** Draw the enemy on the screen */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** Represents player object
 *  @param {integer} x - x coordinate of player
 *  @param {integer} y - y coordinate of player
 *  @param {integer} score - total score
 *  @param {integer} key - total key score
 *  @param {image} sprite - the image location of the player
 */
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.score = 0;
    this.key = 0;
};

/** Update player score */
Player.prototype.update = function() {
    document.getElementById("score").innerText="Score: " + player.score;
};

/** Display player image on screen */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** Handles user input of player character on screen */
Player.prototype.handleInput = function(input) {
    /** Handles up,left,right,down key entries.  Ignores all other inputs */
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
        /** If player reaches top of screen, increase score and reset player position */
        player.score = player.score + 1;
        this.x = 200;
        this.y = 400;

        /** After player reaches top, generate new key location for next play */
        //key.x = Math.floor( Math.random() * 5 ) * 100;
        //key.y = (Math.floor( Math.random() * 3 ) + 1) * 80;
        key.init();
    }

};

/** Represents key object
 *  @param {image} sprite - the image location of the key
 *  @param {integer} x - the x coordinate of the key
 *  @param {integer} y - the y coordinate of the key
 */
var Key = function() {
    this.sprite = 'images/Key.png';

    // Each time init is run, randomizes the location of key object
    this.init = function(){
        this.x = Math.floor( Math.random() * 5 ) * 100;
        this.y = (Math.floor( Math.random() * 3 ) + 1) * 80;
    }
    this.init();
};

/** Updates key object position when player collides with it.
 *  Moves the key object off screen
 */
Key.prototype.update = function() {
    /** Checks if user hits key object */
    if ( (player.x > key.x - 50) && (player.x < key.x + 50) && (player.y > key.y - 50) && (player.y < key.y + 50) ) {
        /** Player has hit key object, move key object off screen */
        player.key = player.key + 1;
        key.x  = -100;
        key.y = -100;
    }
    document.getElementById("key").innerText="Key: " + player.key;
};

/** Displays key object on screen */
Key.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Declaration for enemy objects to be stored in
var allEnemies = [];

/** Creating three enemy objects on acreen */
for (var i = 0; i < 3; i++) {
    // Randomize enemy location and speed
    var col = Math.floor(Math.random() * 3);
    var speed = Math.floor(Math.random() * 5 + 1) * 75;
    /** Moves newly created enemy object to allEnemies array */
    allEnemies.push(new Enemy(-100, 60 + 85 * col, speed));
}

var player = new Player();
var key = new Key();

/** This listens for key presses and sends the keys to your
 *  Player.handleInput() method
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
