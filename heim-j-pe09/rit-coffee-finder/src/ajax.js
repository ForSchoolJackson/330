function downloadFile(url, callbackRef){
    const xhr = new XMLHttpRequest();
    //set onerror handler
    xhr.onerror = (e) => console.log("error")

    //set onload handler
    xhr.onload = (e) => {
        const headers = e.target.getAllResponseHeaders();
        const jsonString = e.target.response;
        console.log(`headers = ${headers}`);
        console.log(`jsonString = ${jsonString}`);
        callbackRef(jsonString);
    } //end

    //open connecttion using http get
    xhr.open("GET", url);

    //we could send request headers

    //finally send request
    xhr.send();
}

export {downloadFile};