const TimerState = {
    Default: 'Default',
    InspectionStarted: 'InspectionStarted',
    Inspecting: 'Inspecting',
    WaitingForGo: 'WaitingForGo',
    Solving: 'Solving',
    SolveEnd: 'SolveEnd'
}

class Timer {
    constructor() {
        this.UI = new TimerUI();
        this.clock = new Clock();
        this.greenLightClock = new Clock();

        this.State = TimerState.Default;

        this.leftButton = {
            pushed: false
        };
        this.rightButton = {
            pushed: false
        };
    }



    pushLeft() {
        // Update UI        
        this.UI.leftButtonPressed();

        this.leftButton.pushed = true;
        this.checkProceed();
    }

    pushRight() {
        this.UI.rightButtonPressed();

        this.rightButton.pushed = true;
        this.checkProceed();
    }

    releaseLeft() {
        this.UI.leftButtonRelease();
        this.leftButton.pushed = false;
        this.checkProceed();
        // if(this.State === TimerState.InspectionStarted){
        //     this.changeState(TimerState.Inspecting);
        // } else if (this.State === TimerState.Inspecting) {

        // }
    }

    releaseRight() {
        this.UI.rightButtonRelease();
        this.rightButton.pushed = false;
        this.checkProceed();
        // if(this.State === TimerState.InspectionStarted){
        //     this.changeState(TimerState.Inspecting);
        // } else if (this.State === TimerState.Inspecting) {

        // }
    }

    checkProceed() {
            //console.log(this.State);
            switch (this.State) {
                case TimerState.Default:
                    if (this.leftButton.pushed && this.rightButton.pushed) {
                        this.UI.redLightOn();
                        this.greenLightClock.start();
                        this.State = TimerState.WaitingForGo;
                        console.log("Trying to change state to Waiting for solve");
                    }
                    break;
                case TimerState.WaitingForGo:
                    if (!this.leftButton.pushed || !this.rightButton.pushed) {
                        this.greenLightClock.stop();
                        if (this.greenLightClock.getElapsedTime() > 1.000) {
                            this.UI.redLightOff();
                            this.UI.greenLightOff();
                            this.State = TimerState.Solving;
                            this.startSolve();
                            console.log("Going to Solving");
                        } else {
                            this.UI.redLightOff();
                            this.UI.greenLightOff();
                            this.State = TimerState.Default;
                            console.log("Default");
                        }
                        this.greenLightClock.reset();
                    }
                    break;
                case TimerState.Solving:
                    if (this.leftButton.pushed && this.rightButton.pushed) {
                        this.UI.redLightOn();
                        this.State = TimerState.SolveEnd;
                        this.stopSolve();
                        this.UI.addTime(this.UI.clock.innerText)
                    }
                    break;
                case TimerState.SolveEnd:
                    if (!this.leftButton.pushed || !this.rightButton.pushed) {
                        this.UI.redLightOff();
                        this.State = TimerState.Default;
                        console.log('Default');
                    }
                    break;
            }
        }
        // switch (this.State) {
        //     case TimerState.Default:
        //         if (this.leftButton.pushed && this.rightButton.pushed) {
        //             this.changeState(TimerState.WaitingForGo);
        //             console.log('Timer Waiting');
        //         }
        //     case TimerState.WaitingForGo:
        //         if (!this.leftButton.pushed || !this.rightButton.pushed) {
        //             this.changeState(TimerState.Solving);
        //             //this.startSolve();
        //             console.log(this.State);

    //         }
    // }



    startSolve() {
        this.clock.start();
    }

    stopSolve() {
        this.clock.stop();
    }

    updateTime() {
        if (this.State === TimerState.Solving) {
            let t = this.clock.getElapsedTime();
            this.UI.setTime(t);
        }
    }


    changeState(s) {
        switch (s) {
            case TimerState.Default:
                this.State = TimerState.Default;
                break;
            case TimerState.WaitingForGo:
                this.State = TimerState.WaitingForGo;
                break;
            case TimerState.Solving:
                this.State = TimerState.Solving;
                break;
            case TimerState.SolveEnd:
                this.State = TimerState.SolveEnd;


        }
    }
};





const keyDown = ((e) => {
    const keyName = e.key;
    switch (keyName) {
        case "ArrowDown":
            timer.pushRight();
            break;
        case "z":
        case "Z":
            timer.pushLeft();
            break;
        case " ":
            timer.pushLeft();
            timer.pushRight();
            break;
    }
});

const keyUp = ((e) => {
    const keyName = e.key;
    switch (keyName) {
        case "ArrowDown":
            timer.releaseRight();
            break;
        case "z":
        case "Z":
            timer.releaseLeft();
            break;
        case " ":
            timer.releaseLeft();
            timer.releaseRight();
    }

});


document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

var timer = new Timer();
interval = setInterval(() => {
    timer.updateTime();
    if (timer.greenLightClock.getElapsedTime() > 1.000) {
        timer.UI.greenLightOn();
    }
}, 26);