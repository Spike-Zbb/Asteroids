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

    getVertices() {
        let vertices = [];
        let r = this.size / 2;
        for (let i = 0; i < 6; i++) {
            let angle = i * TWO_PI / 6;
            let vx = this.x + cos(angle) * r;
            let vy = this.y + sin(angle) * r;
            vertices.push(createVector(vx, vy));
        }
        return vertices;
    }
    
    draw() {
        push();
        translate(this.x, this.y);
        imageMode(CENTER);
        image(Asteroid.image, 0, 0, this.size, this.size);
        pop();
    }
}