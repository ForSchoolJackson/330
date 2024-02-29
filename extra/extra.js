const obj = {
    number: 2,
    name: "john",
    doubleNum(num){
    return  num*2
    }

}

console.log(obj.doubleNum(2))
console.log(obj.name)


const b = ["cyan","magenta","yellow"];
Object.freeze(b);
b[0] = "red";
console.log(b);