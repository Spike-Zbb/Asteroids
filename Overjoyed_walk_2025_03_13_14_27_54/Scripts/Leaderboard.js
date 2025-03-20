class Leaderboard {
    constructor() {
        this.scores = this.loadScores();
        this.maxEntries = 5; 
    }

    loadScores() {
        let storedScores = localStorage.getItem("leaderboard");
        return storedScores ? JSON.parse(storedScores) : [];
    }

    saveScores() {
        localStorage.setItem("leaderboard", JSON.stringify(this.scores));
    }

    addScore(name, score) {
        this.scores.push({ name, score });
        this.scores.sort((a, b) => b.score - a.score);
        if (this.scores.length > this.maxEntries) {
            this.scores.pop(); 
        }
        this.saveScores();
    }

    getScores() {
        return this.scores;
    }
}