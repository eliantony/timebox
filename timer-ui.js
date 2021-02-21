class TimerUI {
    constructor() {
        this.leftButton = document.querySelector('#left-button');
        this.rightButton = document.querySelector('#right-button');
        this.redLight = document.querySelector('#red-light');
        this.greenLight = document.querySelector('#green-light');
        this.clock = document.querySelector("#clock");
        this.times = document.querySelector("#timelist");

    }

    leftButtonPressed() {
        this.leftButton.classList.add('light-up');
    }

    rightButtonPressed() {
        this.rightButton.classList.add('light-up');
    }

    leftButtonRelease() {
        this.leftButton.classList.remove('light-up');
    }

    rightButtonRelease() {
        this.rightButton.classList.remove('light-up');
    }

    redLightOn() {
        this.redLight.classList.add('red');
    }

    redLightOff() {
        this.redLight.classList.remove('red');
    }

    greenLightOn() {
        this.greenLight.classList.add('green');
    }

    greenLightOff() {
        this.greenLight.classList.remove('green');
    }
    setTime(time) {
        this.clock.textContent = time;
    }

    addTime(time) {
        let li = document.createElement("li");
        li.innerText = time;
        this.times.appendChild(li);

    }

}

let ui = new TimerUI();