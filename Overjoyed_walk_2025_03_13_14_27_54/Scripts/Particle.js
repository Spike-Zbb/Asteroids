class Particle {
    constructor(x, y, velocity) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.lifetime = 30;
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.lifetime--;
    }

    draw() {
        push();
        noStroke();
        fill(255, 200);
        ellipse(this.x, this.y, 10, 10);
        pop();
    }

    isDead() {
        return this.lifetime <= 0;
    }
}