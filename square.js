// TODO: Implement create square (copas line + modif aja)

// Create Square
let btnSquare = document.getElementById('btn-square');
let btnSquareCnt = 0;

function dist(x1, y1, x2, y2) {
    let dx = x1 - x2;
    let dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}

let squarePoints = [];

function handleClickCreateSquare(e) {
    if (squarePoints.length == 2) {
        alert("You cannot create any more point, please click the stop creating square button");
        return;
    }
    let cRect = canvas.getBoundingClientRect();              
    let canvasX = Math.round(e.clientX - cRect.left);        
    let canvasY = Math.round(e.clientY - cRect.top);
    console.log("We got", canvasX, canvasY);
    let curPoint = new Object;
    curPoint.x = canvasX, curPoint.y = canvasY;
    squarePoints.push(curPoint);
    if (squarePoints.length == 2) {
        alert("Succesfully created line");
        let square = new Object;
        square.type = "square";
        square.points = [];
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                let createPoint = new Object;
                createPoint.x = squarePoints[i].x, createPoint.y = squarePoints[j].y;
                square.points.push(createPoint);
            }
        }
        square.length = dist(square.x1, square.y1, square.x2, square.y2);
        square.color = "black";
        globalData.push(square);
        showGlobalData(globalData);
        // TODO: Make sure renderObject is right
        renderObjects(globalData);
        return;
    }
}

btnSquare.onclick = function() {
    btnSquareCnt++;
    if (btnSquareCnt % 2 == 1) {
        btnSquare.innerHTML = "Stop creating Square";
        alert("You can start creating Square");
        let canvas = document.getElementById("canvas");
        squarePoints = [];
        canvas.addEventListener("click", handleClickCreateSquare);
    } else {
        btnSquare.innerHTML = "Start creating Square";
        alert("Stopped creating Square");
        let canvas = document.getElementById("canvas");
        canvas.removeEventListener("click", handleClickCreateSquare);
    }
}