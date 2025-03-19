class Asteroid extends GameObject {
    static LARGE = 80;
    static MEDIUM = 40;
    static SMALL = 20;

    constructor(x, y, size) {
        let validSizes = [Asteroid.LARGE, Asteroid.MEDIUM, Asteroid.SMALL];
        if (!validSizes.includes(size)) {
            console.warn(`Invalid asteroid size: ${size}. Defaulting to LARGE.`);
            size = Asteroid.LARGE;
        }
        super(x, y, p5.Vector.random2D().mult(map(size, Asteroid.SMALL, Asteroid.LARGE, 3, 1)), size);
    }

    update() {
        this.move();
        this.draw();
    }

    draw() {
        push();
        translate(this.x, this.y);
        imageMode(CENTER);
        image(Asteroid.image, 0, 0, this.size, this.size);
        pop();
    }
}