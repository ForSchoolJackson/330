"use strict";

const words1 = ["Acute", "Aft", "Anti-matter", "Bipolar", "Cargo", "Command", "Communication", "Computer", "Deuterium", "Dorsal", "Emergency", "Engineering", "Environmental", "Flight", "Fore", "Guidance", "Heat", "Impulse", "Increased", "Inertial", "Infinite", "Ionizing", "Isolinear", "Lateral", "Linear", "Matter", "Medical", "Navigational", "Optical", "Optimal", "Optional", "Personal", "Personnel", "Phased", "Reduced", "Science", "Ship's", "Shuttlecraft", "Structural", "Subspace", "Transporter", "Ventral"];

const words2 = ["Propulsion", "Dissipation", "Sensor", "Improbability", "Buffer", "Graviton", "Replicator", "Matter", "Anti-matter", "Organic", "Power", "Silicon", "Holographic", "Transient", "Integrity", "Plasma", "Fusion", "Control", "Access", "Auto", "Destruct", "Isolinear", "Transwarp", "Energy", "Medical", "Environmental", "Coil", "Impulse", "Warp", "Phaser", "Operating", "Photon", "Deflector", "Integrity", "Control", "Bridge", "Dampening", "Display", "Beam", "Quantum", "Baseline", "Input"];

const words3 = ["Chamber", "Interface", "Coil", "Polymer", "Biosphere", "Platform", "Thruster", "Deflector", "Replicator", "Tricorder", "Operation", "Array", "Matrix", "Grid", "Sensor", "Mode", "Panel", "Storage", "Conduit", "Pod", "Hatch", "Regulator", "Display", "Inverter", "Spectrum", "Generator", "Cloud", "Field", "Terminal", "Module", "Procedure", "System", "Diagnostic", "Device", "Beam", "Probe", "Bank", "Tie-In", "Facility", "Bay", "Indicator", "Cell"];

//create first technobabble
generateTechno(1);

//get new technobabble when button clicked
//use event listeners
document.querySelector("#myButton").addEventListener("click", click => generateTechno(1));
document.querySelector("#fiveButton").addEventListener("click", click => generateTechno(2));

//generate technobabble for both buttons
function generateTechno(num) {
    //empty string
    let babbleStr = ""

    //decide how many times to loop
    let loop
    if (num == 1) {
        loop = 2
    } else if (num == 2) {
        loop = 6
    }

    //make line(s) of babble
    for (let i = 1; i < loop; i++) {
        babbleStr += `${randomWord(words1)} ${randomWord(words2)} ${randomWord(words3)} \n`
    }

    console.log(babbleStr)


    //output technobabble in output paragraph
    document.querySelector("#output").innerHTML = babbleStr;

}

//random words function
function randomWord(array) {

    //get the random number from array
    let random = array[Math.floor(Math.random() * array.length)];

    //return the word
    return random;
}
