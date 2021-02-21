class Clock {
    constructor() {
        this.startTime = 0;
        this.stopTime = 0;
        this.started = false;
    }

    isRunning() {
        return this.started;
    }

    start() {
        this.startTime = Date.now();
        this.started = true;
    };

    stop() {
        this.stopTime = Date.now();
        this.started = false;
    };

    reset() {
        this.startTime = Date.now();
        this.stopTime = Date.now();
    }

    getElapsedTime() {
        if (this.started) {
            return (Date.now() - this.startTime) / 1000;
        }
        return (this.stopTime - this.startTime) / 1000;
    };
}