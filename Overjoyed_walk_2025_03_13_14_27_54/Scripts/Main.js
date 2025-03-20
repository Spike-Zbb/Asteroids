let gameManager;
let soundManager;

function preload() {
    Ship.image = loadImage('Image/Player.png', img => {
        Ship.size = img.width;
    });

    Asteroid.image = loadImage('Image/Asteroid.png', img => {
        Asteroid.size = img.width;
    });
  
    Saucer.image = loadImage('Image/Saucer.png', img => {
        Saucer.size = img.width;
    });
  
    soundManager = new SoundManager();
    soundManager.loadSounds();
}

function setup() {
    createCanvas(800, 600);
    gameManager = new GameManager();
  
    soundManager.loadSounds();
}

function draw() {
    background(0);
    gameManager.updateGame();
}

function keyReleased() {
    if (keyCode === DOWN_ARROW) {
        gameManager.ship.canTeleport = true;
    }
}

function mousePressed() {
    if (gameManager.gameState === "title") {
        gameManager.startGame();
    } else {
        gameManager.ship.shoot();
    }
    // TODO: shoot sound resource
    // soundManager.playSound("shoot");
}
