
//globals
const words1 = ["Acute", "Aft", "Anti-matter", "Bipolar", "Cargo", "Command", "Communication", "Computer", "Deuterium", "Dorsal", "Emergency", "Engineering", "Environmental", "Flight", "Fore", "Guidance", "Heat", "Impulse", "Increased", "Inertial", "Infinite", "Ionizing", "Isolinear", "Lateral", "Linear", "Matter", "Medical", "Navigational", "Optical", "Optimal", "Optional", "Personal", "Personnel", "Phased", "Reduced", "Science", "Ship's", "Shuttlecraft", "Structural", "Subspace", "Transporter", "Ventral"];
const words2 = ["Propulsion", "Dissipation", "Sensor", "Improbability", "Buffer", "Graviton", "Replicator", "Matter", "Anti-matter", "Organic", "Power", "Silicon", "Holographic", "Transient", "Integrity", "Plasma", "Fusion", "Control", "Access", "Auto", "Destruct", "Isolinear", "Transwarp", "Energy", "Medical", "Environmental", "Coil", "Impulse", "Warp", "Phaser", "Operating", "Photon", "Deflector", "Integrity", "Control", "Bridge", "Dampening", "Display", "Beam", "Quantum", "Baseline", "Input"];
const words3 = ["Chamber", "Interface", "Coil", "Polymer", "Biosphere", "Platform", "Thruster", "Deflector", "Replicator", "Tricorder", "Operation", "Array", "Matrix", "Grid", "Sensor", "Mode", "Panel", "Storage", "Conduit", "Pod", "Hatch", "Regulator", "Display", "Inverter", "Spectrum", "Generator", "Cloud", "Field", "Terminal", "Module", "Procedure", "System", "Diagnostic", "Device", "Beam", "Probe", "Bank", "Tie-In", "Facility", "Bay", "Indicator", "Cell"];
let button1,button2;

//initialize function
const init = () => {
     button1 = document.querySelector("#btn-gen-1")
     button2 = document.querySelector("#btn-gen-5")
}

init();

//get new technobabble when button clicked
//use event listeners
button1.addEventListener("click", click => generateTechno(1));
button2.addEventListener("click", click => generateTechno(2));

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

    console.log(babbleStr)


    //output technobabble in output paragraph
    document.querySelector("#output").innerHTML = babbleStr;

}

//import randomwords function
import { randomWord } from './utils.js';



//create first technobabble
generateTechno(1);
