let gameManager;
let soundManager;
let startButton;
let leaderboardButton;
let nameInput;
let submitButton;
let playerNameSubmitted = false;
let returnButton;

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

    startButton = createButton('Start Game');
    startButton.position(width / 2 - 50, height / 2 + 50);
    startButton.size(100, 40);
    startButton.style('font-size', '16px');
    startButton.mousePressed(() => {
      gameManager.startGame();
      startButton.hide();
      leaderboardButton.hide();
    });

    leaderboardButton = createButton('Leaderboard');
    leaderboardButton.position(width / 2 - 50, height / 2 + 100);
    leaderboardButton.size(100, 30);
    leaderboardButton.style('font-size', '14px');
    leaderboardButton.mousePressed(() => {
        gameManager.gameState = "leaderboard";
    });

    nameInput = createInput('');
    nameInput.position(width / 2 - 70, height / 2);
    nameInput.size(140, 30);
    nameInput.attribute('placeholder', 'Enter your name');

    submitButton = createButton('Submit');
    submitButton.position(width / 2 - 30, height / 2 + 40);
    submitButton.size(60, 30);
    submitButton.mousePressed(() => {
        const name = nameInput.value().trim();
        if (name) {
          gameManager.scoreManager.saveScore(name);
          playerNameSubmitted = true;
          nameInput.hide();
          submitButton.hide();
        }
    });

    returnButton = createButton('Return');
    returnButton.position(width / 2 - 50, height - 80);
    returnButton.size(100, 30);
    returnButton.style('font-size', 14);
    returnButton.mousePressed(() => {
    gameManager.gameState = "title";
    });
    returnButton.hide();

    nameInput.hide();
    submitButton.hide();
}

function draw() {
    background(0);

    if (gameManager.gameState === "title") {
        startButton.show();
        leaderboardButton.show();
        returnButton.hide();
        nameInput.hide();
        submitButton.hide();
        playerNameSubmitted = false;
    } else if (gameManager.gameState === "leaderboard") {
        startButton.hide();
        leaderboardButton.hide();
        returnButton.show();
        displayLeaderboard();
        return;
    } else {
        startButton.hide();
        leaderboardButton.hide();
        returnButton.hide();
    }
    
    if (gameManager.gameOver && !playerNameSubmitted) {
        push();
        fill(0, 200);
        noStroke();
        rectMode(CENTER);
        rect(width / 2, height / 2, 300, 150, 10);
        pop();
        nameInput.show();
        submitButton.show();
    }
    
    gameManager.updateGame();
}

function keyReleased() {
    if (keyCode === DOWN_ARROW) {
        gameManager.ship.canTeleport = true;
    }
}

function mousePressed() {
    if (gameManager.gameOver && playerNameSubmitted) {
        gameManager.restartGame();
    } 
    else {
        gameManager.ship.shoot();
    }
}

function displayLeaderboard() {
    push();
    fill(255);
    textAlign(CENTER, TOP);
    textSize(32);
    text("Leaderboard", width / 2, 50);
    textSize(20);
  
    let leaderboard = getItem("leaderboard") || [];
    for (let i = 0; i < leaderboard.length; i++) {
      let entry = leaderboard[i];
      text(`${i + 1}. ${entry.name} - ${entry.score}`, width / 2, 100 + i * 30);
    }
  
    if (leaderboard.length === 0) {
      text("No scores yet.", width / 2, height / 2);
    }
    pop();
  }
