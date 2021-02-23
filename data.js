// globalData is an array of geometry objects
let globalData = []

function showGlobalData() {
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
  
    /* If any further modifications have to be made on the 
       Extracted text. The text can be accessed using the  
       file variable. But since this is const, it is a read  
       only variable, hence immutable. To make any changes,  
       changing const to var, here and In the reader.onload  
       function would be advisible */
    const file = files[0]; 
  
    let reader = new FileReader();

    reader.onload = (e) => changeToLoadFile(e.target.result);
    reader.onerror = (e) => alert(e.target.error.name); 
  
    reader.readAsText(file);
}