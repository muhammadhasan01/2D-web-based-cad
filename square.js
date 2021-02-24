// Create Square
let btnSquare = document.getElementById('btn-square');
let btnSquareCnt = 0;

this.isMoving = false;
var isDown = null;
var squareIndex = -1;
var SquarePointIndex = -1; 

function dist(x1, y1, x2, y2) {
    let dx = x1 - x2;
    let dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}

let squarePoints = [];

var idx = -1;
var created = false;

function handleClickCreateSquare(e) {
    let cRect = canvas.getBoundingClientRect();              
    let canvasX = Math.round(e.clientX - cRect.left);        
    let canvasY = Math.round(e.clientY - cRect.top);
    console.log("We got", canvasX, canvasY);
    let curPoint = new Object;
    curPoint.x = canvasX, curPoint.y = canvasX;
    squarePoints.push(curPoint);
    squarePoints.push(curPoint);
    if (squarePoints.length == 2) {
        // alert("Succesfully created square");
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
        square.points.sort((a, b) => {
            if (a.x === b.x)
                return a.y - b.y;
            return a.x - b.x;
        });
        idx = globalData.length;
        globalData.push(square);
        showGlobalData(globalData);
        renderObjects(globalData);
        created = true;
        return;
    }
}

function handleMoveCreateSquare(e) {
    if(created) {
        let cRect = canvas.getBoundingClientRect();              
        let canvasX = Math.round(e.clientX - cRect.left);        
        console.log("idx " + idx);
        globalData[idx]["points"][3]["x"] = canvasX;
        globalData[idx]["points"][3]["y"] = canvasX;
        globalData[idx]["points"][1]["x"] = canvasX;
        globalData[idx]["points"][2]["y"] = canvasX;
        renderObjects(globalData);
    }

}

function handleEndCreateSquare(e) {
    idx = -1;
    created = false;
    btnSquare.onclick();
}




btnSquare.onclick = function() {
    btnSquareCnt++;
    if (btnSquareCnt % 2 == 1) {
        btnSquare.innerHTML = "Stop creating Square";
        // alert("You can start creating Square");
        let canvas = document.getElementById("canvas");
        squarePoints = [];
        canvas.addEventListener("mousedown", handleClickCreateSquare);
        canvas.addEventListener("mousemove", handleMoveCreateSquare);
        canvas.addEventListener("mouseup", handleEndCreateSquare);
    } else {
        btnSquare.innerHTML = "Start creating Square";
        let canvas = document.getElementById("canvas");
        canvas.removeEventListener("mousedown", handleClickCreateSquare);
        canvas.removeEventListener("mousemove", handleMoveCreateSquare);
        canvas.removeEventListener("mouseup", handleEndCreateSquare);
    }
}


this.canvas.addEventListener("mousedown", (e) => {
    if(t.isMoving) {
        isDown = true;
        var getpoint = [e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop, 0];
        if(squareIndex == -1 && SquarePointIndex == -1) {
            for(var j=0; j<globalData.length; j++){      
                if(globalData[j]["type"] == "square"){
                    for(var i=0; i<globalData[j]["points"].length; i++){ 
                      if(globalData[j]["points"][i]["x"]-5 <= getpoint[0] && globalData[j]["points"][i]["x"]+5 >= getpoint[0]) {
                        if(globalData[j]["points"][i]["y"]-5 <= getpoint[1] && globalData[j]["points"][i]["y"]+5 >= getpoint[1]) {
                          
                          squareIndex = j;
                          SquarePointIndex = i;
                        //   alert("Medee");
                        //   alert(SquarePointIndex)
                          break;
                        }
                      }
                    }
                }      
            }
        }
    }

});

this.canvas.addEventListener("mouseup", (e) => {
    if(t.isMoving) {
        isDown = false;
        squareIndex = -1;
        SquarePointIndex = -1;
    }
});

this.canvas.addEventListener("mousemove", (e) => {
    if(t.isMoving && SquarePointIndex == 3) {
        if(isDown && squareIndex != -1 && SquarePointIndex != -1) {
            let cRect = canvas.getBoundingClientRect();              
            let canvasX = Math.round(e.clientX - cRect.left);        
            console.log("idx " + idx);
            globalData[squareIndex]["points"][3]["x"] = canvasX;
            globalData[squareIndex]["points"][3]["y"] = canvasX;
            globalData[squareIndex]["points"][1]["x"] = canvasX;
            globalData[squareIndex]["points"][2]["y"] = canvasX;
            renderObjects(globalData);
        }

      }
});