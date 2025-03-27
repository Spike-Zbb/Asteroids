class Ship extends GameObject {
    constructor(x, y) {
        super(x, y, createVector(0, 0), Ship.size);
        this.angle = 0;
        this.rotationSpeed = 3;
        this.acceleration = 0.2;
        this.friction = 0.98;
        this.thrusting = false;
        this.canTeleport = true;
        this.isInvincible = false;
        this.invincibilityTimer = 0;
    }

    update() {
        this.handleInput();
        if (!this.thrusting) {
            this.applyFriction();
        }
        this.move();
        this.updateInvincibility();
        this.draw();
    }

    updateInvincibility() {
        if (this.isInvincible) {
            this.invincibilityTimer--;
            if (this.invincibilityTimer <= 0) {
                this.isInvincible = false;
            }
        }
    }

    handleInput() {
        if (keyIsDown(LEFT_ARROW)) {
            this.angle -= this.rotationSpeed;
        } else if (keyIsDown(RIGHT_ARROW)) {
            this.angle += this.rotationSpeed;
        }
        if (keyIsDown(UP_ARROW)) {
            this.applyThrust();
            this.thrusting = true;
        } else {
            this.thrusting = false;
        }
        if (keyIsDown(DOWN_ARROW) && this.canTeleport) {
            this.teleport();
            this.canTeleport = false;
        }
    }

    applyThrust() {
        let force = p5.Vector.fromAngle(radians(this.angle - 90));
        force.mult(this.acceleration);
        this.velocity.add(force);
    }

    applyFriction() {
        this.velocity.mult(this.friction);
        if (this.velocity.mag() < 0.01) {
            this.velocity.set(0, 0);
        }
    }

    move() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.wrapAround();
    }

    teleport() {
        this.x = random(width);
        this.y = random(height);
    }

    shoot() {
        let bulletOffset = p5.Vector.fromAngle(radians(this.angle - 90)).mult(25);
        let bulletDirection = p5.Vector.fromAngle(radians(this.angle - 90)).mult(5);
    
        gameManager.bullets.push(new Bullet(this.x + bulletOffset.x, this.y + bulletOffset.y, this.angle, "player"));
    
        let knockbackForce = bulletDirection.mult(-0.05);
        this.velocity.add(knockbackForce);
        
        soundManager.playSound("hit", false, 0.5);
    }

    getVertices() {
        let vertices = [];
        let r = this.size / 2;
        let angleOffset = radians(this.angle - 90);
        for (let i = 0; i < 3; i++) {
            let angle = angleOffset + i * TWO_PI / 3;
            let vx = this.x + cos(angle) * r;
            let vy = this.y + sin(angle) * r;
            vertices.push(createVector(vx, vy));
        }
        return vertices;
    }

    draw() {
        push();
        translate(this.x, this.y);
        rotate(radians(this.angle));
        imageMode(CENTER);

        if(!this.isInvincible || frameCount % 10 < 5) {
                image(Ship.image, 0, 0, this.size, this.size);
        }
        pop();
    }
}
