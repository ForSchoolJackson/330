

//import js from other js files
import { doubleIt } from './utils.js';

const init = () => {
  // hook up UI
  const output = document.querySelector("#output");
  const numberField = document.querySelector("#number");
  const btnDouble = document.querySelector("#btn-double");

  btnDouble.onclick = () => {
    // the .value of an <input> element are always of type `String`
    // so we need to convert it to a `Number`
    const num = Number(numberField.value.trim()) || 0;
    const doubledNum = doubleIt(num);
    output.innerHTML = `${num} doubled is ${doubledNum}`;
  };
};

init();


/*

Instructions:
- Let's convert this over to ES6 module syntax
- Don't forget that modules need to run off of a web server

1) Add type="module" to the <script> tag
- Test it, the code in main.js should still work
- But now the doubleIt() and init() functions are in "module" scope, instead of "script" scope

2) Now move doubleIt() to a file named utils.js
- export doubleIt() from utils.js
- At the top of main.js, import doubleIt()
- Test it, everything should work as before

3) Get rid of unnecessary code
- "use strict"; is not necessary in ES6 modules
- Replace window.onload = init; with init() - because now that main.js is a module, it will `defer` by default

*/
