"use strict";

const body = document.querySelector("body");
const indicatorParent = document.querySelector(".indicator_parent");
const indicatorSpans = indicatorParent.querySelectorAll("#counter");
const startButton = document.querySelector(".start");
const inputTimecode = document.querySelector(".timecode_input");
const addButton = document.querySelector(".add");
const timecodesList = document.querySelector(".list");
const logButton = document.querySelector(".download");

const voiceOn = document.querySelector(".voice_button_on");
const voiceOff = document.querySelector('.voice_button_off');
const gachi = document.querySelectorAll(".gachi");

let timer = undefined;
let timecodeCounter = 0;
let audio = new Audio();
let audioFlag = false;


// кнопка зупуску таймера
startButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (audioFlag === true) {
        audio.pause();
        const randomizer = Math.random();
        console.log(randomizer);
        if (randomizer >= 0.8) {
            audio = new Audio("audio/start/attention.wav");
        } else if (randomizer >= 0.6) {
            audio = new Audio("audio/start/move.mp3");
        } else if (randomizer >= 0.4) {
            audio = new Audio("audio/start/NOW, BOY.wav");
        } else if (randomizer >= 0.2) {
            audio = new Audio("audio/start/turn me on.mp3");
        } else {
            audio = new Audio("audio/start/bondage gay website.wav");
        }
        audio.play();
    }
    timerStart();
});

// вимкнення звуку
voiceOn.addEventListener("click", (event) => {
    event.preventDefault();
    voiceOn.classList.add("hide");
    gachi.forEach(item => {
        item.style.opacity = "0";
    });
    audio.pause();
    audioFlag = false;

    voiceOff.classList.remove("hide");
    renamer();
});

// вмикання звуку
voiceOff.addEventListener("click", (event) => {
    event.preventDefault();
    voiceOff.classList.add("hide");
    gachi.forEach(item => {
        item.style.opacity = "1";
    });
    audio.pause();
    audioFlag = true;
    const randomizer = Math.random();
    if (randomizer >= 0.8) {
        audio = new Audio("audio/mute off/mmh-mhhm-mhhhhh.mp3");
    } else if (randomizer >= 0.6) {
        audio = new Audio("audio/mute off/watch and enjoy.wav");
    } else if (randomizer >= 0.4) {
        audio = new Audio("audio/mute off/welcome to the club buddy.wav");
    } else if (randomizer >= 0.2) {
        audio = new Audio("audio/mute off/will you show me.wav");
    } else {
        audio = new Audio("audio/mute off/bondage gay website.m4a");
    }
    audio.play();
    voiceOn.classList.remove("hide");
    renamer();
});

// кнопка додавання таймкоду
addButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (audioFlag === true) {
        audio.pause();
        const randomizer = Math.random();
        if (randomizer >= 0.84) {
            audio = new Audio("audio/add/a1.mp3");
        } else if (randomizer >= 0.68) {
            audio = new Audio("audio/add/a2.mp3");
        } else if (randomizer >= 0.52) {
            audio = new Audio("audio/add/a3.mp3");
        } else if (randomizer >= 0.36) {
            audio = new Audio("audio/add/a4.mp3");
        } else if (randomizer >= 0.18) {
            audio = new Audio("audio/add/a5.mp3");
        } else {
            audio = new Audio("audio/add/a6.mp3");
        }
        audio.play();
    }
    addTimecode();
});

// кнопка завантаження файлу
logButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (audioFlag === true) {
        audio.pause();
        const randomizer = Math.random();
        if (randomizer >= 0.66) {
            audio = new Audio("audio/download/!.mp3");
        } else if (randomizer >= 0.33) {
            audio = new Audio("audio/download/cummin.mp3");
        } else {
            audio = new Audio("audio/download/that's good.wav");
        }
        audio.play();
    }
    createLogFile();
});

// "Enter" - викликає додавання таймкоду, "Tab" - фокусує input
document.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') {
        event.preventDefault();
        addButton.click();
    }
    if (event.code === 'Tab') {
        event.preventDefault();
        inputTimecode.focus();
    }

});

// видалення даних з форм та інпутів
function dataClr() {
    indicatorSpans.forEach((item) => {
        item.innerHTML = "00";
    });
    timecodesList.innerHTML = "";
    if (timer != undefined) {
        clearInterval(timer);
        timer = undefined;
    }
    inputTimecode.value = "";
    timecodeCounter = 0;
}

// виклик таймера
function timerStart() {
    dataClr();
    const startDateValue = new Date();
    timer = setInterval(calculateIndicatorValues, 1000, startDateValue);
}

//таймер
function calculateIndicatorValues(startDateValue) {
    const timeDifference = new Date(new Date() - startDateValue).getTime() + 300;
    const hours = String(Math.floor(timeDifference / (1000 * 60 * 60))),
        minutes = String(Math.floor((timeDifference / 1000 / 60) % 60)),
        seconds = String(Math.floor((timeDifference / 1000) % 60));

    const arr = [hours, minutes, seconds];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length === 1) {
            arr[i] = "0" + arr[i];
        }
    };

    indicatorSpans.forEach((item, i) => {
        item.innerHTML = arr[i];
    })
}

// додавання таймкоду до списку
function addTimecode() {
    const i = ++timecodeCounter + ".";
    const time = indicatorSpans[0].innerHTML + ":" + indicatorSpans[1].innerHTML + ":" + indicatorSpans[2].innerHTML;
    const text = inputTimecode.value;
    timecodesList.innerHTML +=
        `<div class ="list_row_container">
            <div class="list_row_id">${i}</div>
            <div class="list_row_time">${time}</div>
            <div class="list_row_text">${text}</div>
        </div>`;
    inputTimecode.value = "";
    timecodesList.scrollTop = timecodesList.scrollHeight;
}

// завантаження даних зі списку до txt файла та його завантаження
function createLogFile() {
    if (timecodesList.innerHTML !== "") {
        let content = "";
        const timecodeRows = timecodesList.querySelectorAll(".list_row_container");
        timecodeRows.forEach((item) => {
            const id = item.querySelector(".list_row_id").innerHTML;
            const time = item.querySelector(".list_row_time").innerHTML;
            const text = item.querySelector(".list_row_text").innerHTML;
            content += `${id}   ${time}   ${text}\n`;
        });

        const blob = new Blob([content], { type: "type/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.classList.add("link-hidden");
        link.href = url;
        link.download = "timecodes.txt";
        document.body.appendChild(link);
        link.click();
    }
};

const sec3Text = document.querySelector(".sec3 p");
const hoursName = document.querySelector(".hours_name");
const minutesName = document.querySelector(".minutes_name");
const secondsName = document.querySelector(".seconds_name");

function renamer() {

    if (audioFlag === true) {
        startButton.innerHTML = "Common let`s go!";
        inputTimecode.placeholder = 'Mmmm ("Tab")';
        addButton.innerHTML = 'Aaaa ("Enter")';
        sec3Text.innerHTML = "Do you like what you see?";
        logButton.innerHTML = "Make me cum!";
        hoursName.innerHTML = "cocks";
        minutesName.innerHTML = "slaves";
        secondsName.innerHTML = "fingers";
    } else {
        startButton.innerHTML = "Запустити/Перезапустити таймер";
        inputTimecode.placeholder = 'Коментар до таймкоду ("Tab")';
        addButton.innerHTML = 'Записати таймкод ("Enter")';
        sec3Text.innerHTML = "Встати в чергу на платне завантаження вірусів <span>без txt-файла логування таймкодів</span>, <br> з смс та реєстрацією, з перевіркою на бота через відбиток пальця,<br>  розпізнавання голосу та обличчя:";
        logButton.innerHTML = "Встати";
        hoursName.innerHTML = "годин";
        minutesName.innerHTML = "хвилин";
        secondsName.innerHTML = "секунд";
    }
}

// const pseudorandomizer = function(arr){
//     let counter = arr.length;

//     return function(){

//     }

// }
