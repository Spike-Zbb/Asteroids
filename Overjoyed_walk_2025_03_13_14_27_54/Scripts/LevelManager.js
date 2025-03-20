class LevelManager {
    constructor(gameManager) {
        this.gameManager = gameManager; 
        this.currentLevel = 1;
    }

    loadLevel() {
        console.log(`🚀 Loading Level ${this.currentLevel}`);
        let asteroidCount = 3 + this.currentLevel * 2; 
        this.gameManager.spawnAsteroids(asteroidCount);
    }

    nextLevel() {
        this.currentLevel++;
        this.loadLevel();
    }
}