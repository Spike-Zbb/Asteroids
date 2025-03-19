class ScoreManager {
    constructor() {
        this.score = 0;
        this.nextLifeThreshold = 10000;
    }

    addScore(points) {
        this.score += points;
        console.log(`Score +${points}, Total: ${this.score}`);
        this.checkExtraLife();
    }

    checkExtraLife() {
        if (this.score >= this.nextLifeThreshold) {
            gameManager.gainLife();
            this.nextLifeThreshold += 10000;
        }
    }

    calculatePoints(object) {
        if (object instanceof Asteroid) {
            if (object.size === Asteroid.LARGE) return 10000;  
            if (object.size === Asteroid.MEDIUM) return 50;  
            if (object.size === Asteroid.SMALL) return 100; 
        }
        if (object instanceof Saucer) {
            if (object.size === Saucer.LARGE) return 200;  
            if (object.size === Saucer.SMALL) return 1000;  
        }
        return 0;
    }
}