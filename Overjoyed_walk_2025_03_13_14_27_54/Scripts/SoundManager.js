class SoundManager {
    constructor() {
        this.sounds = {};
    }

    loadSounds() {
        this.sounds["bgMusic"] = loadSound("Music/bgMusic.mp3", () => {
            console.log("Background music loaded!");
            this.playSound("bgMusic", true, 0.5);
        });
        this.sounds["explore"] = loadSound("Music/explore.mp3", () => {
            this.playSound("explore", false, 0.5);
        });
        this.sounds["hit"] = loadSound("Music/hit.mp3", () => {
            this.playSound("hit", false, 0.5);
        });
    }

    playSound(soundName, loop = false, volume = 1.0) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].setVolume(volume);
            if (!this.sounds[soundName].isPlaying()) {
                if (loop) {
                    this.sounds[soundName].loop();
                } else {
                    this.sounds[soundName].play();
                }
            }
        } else {
            console.warn(`Sound ${soundName} not found!`);
        }
    }

    stopSound(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].stop();
        }
    }
}
