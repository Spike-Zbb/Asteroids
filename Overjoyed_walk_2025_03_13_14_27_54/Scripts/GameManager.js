console.log("GameManager.js loaded!");

class GameManager {
    constructor() {
      console.log("Creating GameManager instance...");
      this.ship = new Ship(width / 2, height / 2);
      this.asteroids = [];
      this.bullets = [];
      this.saucers = [];
      this.collisionSystem = new CollisionSystem();
      this.spawnInterval = 1000;
      this.lives = 3;
      this.gameOver = false;
      this.scoreManager = new ScoreManager();
      this.spawnAsteroids(5);
      this.saucerSpawnInterval = 400;
      this.frameCounter = 0;
    }

    spawnAsteroids(count) {
      for (let i = 0; i < count; i++) {
        let sizeOptions = [Asteroid.LARGE, Asteroid.MEDIUM, Asteroid.SMALL];
        let randomSize = random(sizeOptions);
        this.asteroids.push(new Asteroid(random(width), random(height), randomSize));
      }
    }

    spawnSaucer() {
      this.frameCounter++;
      if (this.frameCounter >= this.saucerSpawnInterval) {
        this.saucers.push(new Saucer());
        this.frameCounter = 0;
      }

      this.saucers = this.saucers.filter(saucer => saucer.x > -100 && saucer.x < width + 100);
    }
  
    updateGame() {
      if (this.gameOver) {
        this.displayGameOver();
        return;
      }

      this.ship.update();
      for (let asteroid of this.asteroids) {
        asteroid.update();
      }
      for (let bullet of this.bullets) {
        bullet.update();
      }
      for (let saucer of this.saucers) {
        saucer.update();
      }
      this.bullets = this.bullets.filter(bullet => !bullet.isDead());
      this.spawnSaucer();
      this.checkCollisions();

      //  Display score and lives on the screen
      this.displayHUD(); 
    }

    gainLife() {
      this.lives++;
      console.log("Extra Life! Lives left:", this.lives);
    }

    loseLife() {
      this.lives--;
      if (this.lives <= 0) {
        this.gameOver = true;
      } else {
        this.respawnShip();
      }
    }

    respawnShip() {
      console.log("Respawning ship...");
      this.ship.x = width / 2;
      this.ship.y = height / 2;
      this.ship.velocity.set(0, 0);

      this.ship.isInvincible = true;
      this.ship.invincibilityTimer = 120;
    }

    checkCollisions() {
      let bulletsToRemove = new Set();
      let asteroidsToRemove = new Set();
      let saucersToRemove = new Set();
      let newAsteroids = [];

      // Player Bullet vs Asteroid
      for (let i = 0; i < this.bullets.length; i++) {
        if (this.bullets[i].owner === "player") {
          for (let j = 0; j < this.asteroids.length; j++) {
            if (this.collisionSystem.checkCollision(this.bullets[i], this.asteroids[j])) {
              console.log("Bullet hit asteroid!");

              let asteroid = this.asteroids[j];

              if (asteroid.size === Asteroid.LARGE) {
                newAsteroids.push(new Asteroid(asteroid.x, asteroid.y, Asteroid.MEDIUM));
                newAsteroids.push(new Asteroid(asteroid.x, asteroid.y, Asteroid.MEDIUM));
              } else if (asteroid.size === Asteroid.MEDIUM) {
                newAsteroids.push(new Asteroid(asteroid.x, asteroid.y, Asteroid.SMALL));
                newAsteroids.push(new Asteroid(asteroid.x, asteroid.y, Asteroid.SMALL));
              }

              bulletsToRemove.add(i);
              asteroidsToRemove.add(j);

              let points = this.scoreManager.calculatePoints(asteroid);
              this.scoreManager.addScore(points);
            }
          }
        }
      }

      // Ship vs Asteroid
      for (let j = 0; j < this.asteroids.length; j++) {
        let asteroid = this.asteroids[j];

        if (!this.ship.isInvincible && this.collisionSystem.checkCollision(this.ship, asteroid)) {
          console.log('Ship collided with asteroid!');

          if (asteroid.size === Asteroid.LARGE) {
            newAsteroids.push(new Asteroid(asteroid.x, asteroid.y, Asteroid.MEDIUM));
            newAsteroids.push(new Asteroid(asteroid.x, asteroid.y, Asteroid.MEDIUM));
          } else if (asteroid.size === Asteroid.MEDIUM) {
            newAsteroids.push(new Asteroid(asteroid.x, asteroid.y, Asteroid.SMALL));
            newAsteroids.push(new Asteroid(asteroid.x, asteroid.y, Asteroid.SMALL));
          }

          asteroidsToRemove.add(j);

          let points = this.scoreManager.calculatePoints(asteroid);
          this.scoreManager.addScore(points);

          this.loseLife();
        }
      }

      // Player Bullet vs Saucer
      for (let i = 0; i < this.bullets.length; i++) {
        if (this.bullets[i].owner === "player") {
          for (let j = 0; j < this.saucers.length; j++) {
            if (this.collisionSystem.checkCollision(this.bullets[i], this.saucers[j])) {
              console.log("Bullet hit saucer!");

              let saucer = this.saucers[j];

              bulletsToRemove.add(i);
              saucersToRemove.add(j);

              let points = this.scoreManager.calculatePoints(saucer);
              this.scoreManager.addScore(points);
            }
          }
        }             
      }

      // Ship vs Saucer
      for (let j = 0; j < this.saucers.length; j++) {
        let saucer = this.saucers[j];

        if (!this.ship.isInvincible && this.collisionSystem.checkCollision(this.ship, saucer)) {
          console.log("Ship collided with saucer!");
          console.log(`Ship size: ${this.ship.size},  Saucer size: ${saucer.size}`);

          saucersToRemove.add(j);
          this.loseLife();
        }
      }
      
      // Saucer Bullet vs Ship
      for (let i = 0; i < this.bullets.length; i++) {
        if (this.bullets[i].owner === "saucer" && !this.ship.isInvincible 
          && this.collisionSystem.checkCollision(this.ship, this.bullets[i])) {
            console.log("Ship hit by saucer bullet!");
            bulletsToRemove.add(i);
            this.loseLife();
        }
      }
      
      // Saucer Bullet vs Asteroid
      for (let i = 0; i < this.bullets.length; i++) {
        if (this.bullets[i].owner === "saucer") {
          for (let j = 0; j < this.asteroids.length; j++) {
            if (this.collisionSystem.checkCollision(this.bullets[i], this.asteroids[j])) {
              console.log("Saucer bullet hit asteroid!");

              let asteroid = this.asteroids[j];

              if (asteroid.size === Asteroid.LARGE) {
                newAsteroids.push(new Asteroid(asteroid.x, asteroid.y, Asteroid.MEDIUM));
                newAsteroids.push(new Asteroid(asteroid.x, asteroid.y, Asteroid.MEDIUM));
              } else if (asteroid.size === Asteroid.MEDIUM) {
                newAsteroids.push(new Asteroid(asteroid.x, asteroid.y, Asteroid.SMALL));
                newAsteroids.push(new Asteroid(asteroid.x, asteroid.y, Asteroid.SMALL));
              }
                  
              bulletsToRemove.add(i);
              asteroidsToRemove.add(j);
            }
          }
        }
      }

      // Saucer vs Asteroid
      for (let i = 0; i < this.saucers.length; i++) {
        for (let j = 0; j < this.asteroids.length; j++) {
          if (this.collisionSystem.checkCollision(this.saucers[i], this.asteroids[j])) {
            console.log("Saucer collided with asteroid!");
            saucersToRemove.add(i);
          }
        }
      }

      this.bullets = this.bullets.filter((_, i) => !bulletsToRemove.has(i));
      this.asteroids = this.asteroids.filter((_, j) => !asteroidsToRemove.has(j));
      this.saucers = this.saucers.filter((_, j) => !saucersToRemove.has(j));
      this.asteroids.push(...newAsteroids);
    }
  
    displayGameOver() {
      push();
      fill(255, 0, 0);
      textSize(50);
      textAlign(CENTER, CENTER);
      text("GAME OVER", width / 2, height / 2);
      pop();
    }

    //  Display score and remaining lives on the screen
    displayHUD() {
      push();
      fill(255);
      textSize(20);
      textAlign(LEFT, TOP);
      //  Score displayed in the top-left corner
      text(`Score: ${this.scoreManager.score}`, 10, 10);

      textAlign(RIGHT, TOP);
      //  Lives displayed in the top-right corner
      text(`Lives: ${this.lives}`, width - 10, 10);
      pop();
    }
}
