// globalData is an array of geometry objects
let globalData = []
let globalColor = "black";

function showGlobalData() {
    console.log("GLOBAL : ");
    console.log(globalData);
}

function saveGlobalData() {
    let file = new Blob([JSON.stringify(globalData)], { type: "text/plain;charset-utf-8" });
    let currentdate = new Date(); 
    let filename = "data_" + currentdate.getDate() + "/"
                + (currentdate.getMonth() + 1)  + "/" 
                + currentdate.getFullYear() + "-"  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + ".txt";
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        let a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function changeToLoadFile(file) {
    globalData = JSON.parse(file);
    console.log(JSON.parse(file));
    renderObjects(globalData);
}

function loadGlobalData() {
    let input = document.getElementById("load");
    let files = input.files; 
  
    if (files.length == 0) return;

    const file = files[0]; 
  
    let reader = new FileReader();

    reader.onload = (e) => changeToLoadFile(e.target.result);
    reader.onerror = (e) => alert(e.target.error.name); 
  
    reader.readAsText(file);
}

function changeColor() {
    let x = document.getElementById("colors").selectedIndex;
    globalColor = document.getElementsByTagName("option")[x].value;
    console.log("The color is now", globalColor);
    renderObjects(globalData);
    for (let i = 0; i < globalData.length; i++) {
        if (!globalData[i].color) continue;
        globalData[i].color = globalColor;
    }
}