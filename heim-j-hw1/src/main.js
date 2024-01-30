
//globals
let button1, button2;
let words1 = [];
let words2 = [];
let words3 = [];

//initialize function
const init = () => {
    button1 = document.querySelector("#btn-gen-1")
    button2 = document.querySelector("#btn-gen-5")
}

init();

//generate technobabble for both buttons
const generateTechno = (num) => {
    //empty string
    let babbleStr = ""

    //decide how many times to loop
    let loopNum
    if (num == 1) {
        loopNum = 2
    } else if (num == 2) {
        loopNum = 6
    }

    //make line(s) of babble
    for (let i = 1; i < loopNum; i++) {
        babbleStr += `<ol>${randomWord(words1)} ${randomWord(words2)} ${randomWord(words3)}</ol> \n`
    }

    //output technobabble in output paragraph
    document.querySelector("#output").innerHTML = babbleStr;

}

//import randomwords function
import { randomWord } from './utils.js';

//use xhr to load data
const loadBabble = () => {
    const url = "../data/babble-data.json";
    const xhr = new XMLHttpRequest();

    xhr.onload = (e) => {
        console.log(`In onload - HTTP Status Code = ${e.target.status}`);

        babbleLoaded(e);
    }

    xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`)
    xhr.open("GET", url)
    xhr.send();

}

//callback function 
const babbleLoaded = (e) => {
    //parse json
    let json = JSON.parse(e.target.responseText)

    //initialize values of arrays
    words1 = json["words1"];
    words2 = json["words2"];
    words3 = json["words3"];

    //initialize button click event
    button1.addEventListener("click", click => generateTechno(1));
    button2.addEventListener("click", click => generateTechno(2));

    //call start up babble
    generateTechno(1);

}


//call loadBabble when page load
loadBabble();
