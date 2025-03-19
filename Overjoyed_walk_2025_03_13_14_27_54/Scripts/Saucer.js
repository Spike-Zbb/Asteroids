class Saucer extends GameObject {
  static get LARGE() { return 50; }
  static get SMALL() { return 30; }
  static get SHOOT_INTERVAL() { return 100; } 

  constructor() {
    let fromLeft = random() > 0.5; 
    let x = fromLeft ? -50 : width + 50; 
    let y = random(height * 0.2, height * 0.8); 
    let speed = random(2, 4);
    let velocity = createVector(fromLeft ? speed : -speed, 0); 
    let size = Math.random() < 0.8 ? Saucer.LARGE : Saucer.SMALL;
    super(x, y, velocity, size);
      
    this.shootTimer = 0;
  }

  update() {
    this.move();
    this.shoot();
    this.draw();
  }

  shoot() {
    this.shootTimer++;
    if (this.shootTimer >= Saucer.SHOOT_INTERVAL) {
      let bullet = this.createBullet();
      gameManager.bullets.push(bullet);
      this.shootTimer = 0;
      console.log(`Saucer fired a bullet!`);
    }
  }

  createBullet() {
    let direction;
    if (this.size === Saucer.LARGE) {
      direction = p5.Vector.random2D().mult(3);
    } else {
      let aimRadius = this.calculateAimRadius();

      let target = createVector(
        gameManager.ship.x + random(-aimRadius, aimRadius),
        gameManager.ship.y + random(-aimRadius, aimRadius)
      );

      direction = createVector(target.x - this.x, target.y - this.y);
      direction.setMag(5);
    }
    return new Bullet(this.x, this.y, degrees(direction.heading()), "saucer");
  }
  
  calculateAimRadius() {
    let score = gameManager.scoreManager.score;
    if (score < 1000) return 2;
    if (score < 3000) return 1;
    if (score < 5000) return 0.5;  
    return 0.1;                    
  }

  draw() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    image(Saucer.image, 0, 0, this.size, this.size);
    pop();
  }
}