class Bullet extends GameObject {
    constructor(x, y, angle, owner) {
        super(x, y, p5.Vector.fromAngle(radians(angle - 90)).mult(5));
        this.lifetime = 100;
        this.owner = owner;
    }

    update() {
        this.move();
        this.draw();
        this.lifetime--;
    }

    isDead() {
        return this.lifetime <= 0;
    }

    draw() {
        push();
        translate(this.x, this.y);
        fill(this.owner === "player" ? "white" : "red");
        noStroke();
        ellipse(0, 0, 5, 5);
        pop();
    }
}