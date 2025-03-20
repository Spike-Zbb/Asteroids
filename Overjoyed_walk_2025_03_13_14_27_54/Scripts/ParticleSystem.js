class ParticleSystem {
    constructor(x, y) {
        this.particles = [];
        for (let i = 0; i < 3; i++) {
            let angle = random(TWO_PI);
            let speed = random(1, 3);
            let velocity = createVector(cos(angle) * speed, sin(angle) * speed);
            this.particles.push(new Particle(x, y, velocity));
        }
    }

    update() {
        for (let particle of this.particles) {
            particle.update();
            particle.draw();
        }
        this.particles = this.particles.filter(p => !p.isDead());
    }

    isEmpty() {
        return this.particles.length === 0;
    }
}