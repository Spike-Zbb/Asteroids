class GameObject {
    constructor(x, y, velocity, size) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.size = size || 10;
    }

    move() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.wrapAround(); 
    }

    wrapAround() {
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
    }

    draw() {}
}
