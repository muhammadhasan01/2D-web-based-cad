// Create Line
let btnLine = document.getElementById('btn-line');
let btnLineCnt = 0;

function dist(x1, y1, x2, y2) {
    let dx = x1 - x2;
    let dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}

let linePoints = [];

function handleClickCreateLine(e) {
    if (linePoints.length == 2) {
        alert("You cannot create any more line, please click the stop creating line button");
        return;
    }
    let cRect = canvas.getBoundingClientRect();              
    let canvasX = Math.round(e.clientX - cRect.left);        
    let canvasY = Math.round(e.clientY - cRect.top);
    console.log("We got", canvasX, canvasY);
    let curPoint = new Object;
    curPoint.x = canvasX, curPoint.y = canvasY;
    linePoints.push(curPoint);
    if (linePoints.length == 2) {
        alert("Succesfully created line");
        alert("vfdggbf");
        let line = new Object;
        line.type = "line";
        line.points = [];
        for (let i = 0; i < 2; i++) {
            line.points.push(linePoints[i]);
        }
        console.log("Tesss");
        console.log(line.points);
        line.length = dist(line.x1, line.y1, line.x2, line.y2);
        line.color = "black";
        globalData.push(line);
        showGlobalData(globalData);
        renderObjects(globalData);
        return;
    }
}

btnLine.onclick = function() {
    btnLineCnt++;
    if (btnLineCnt % 2 == 1) {
        btnLine.innerHTML = "Stop creating line";
        alert("You can start creating line");
        let canvas = document.getElementById("canvas");
        linePoints = [];
        canvas.addEventListener("click", handleClickCreateLine);
    } else {
        btnLine.innerHTML = "Start creating line";
        alert("Stopped creating line");
        let canvas = document.getElementById("canvas");
        canvas.removeEventListener("click", handleClickCreateLine);
    }
}