//export random words function
export const randomWord =(array) =>{

    //get the random number from array
    let random = array[Math.floor(Math.random() * array.length)];

    //return the word
    return random;
}