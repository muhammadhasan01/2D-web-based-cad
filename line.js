// Create Line
let btnLine = document.getElementById('btn-line');
let btnLineCnt = 0;

var lineDataIndex = [];
var linePointIndex = []; 

function dist(x1, y1, x2, y2) {
    let dx = x1 - x2;
    let dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}

let linePoints = [];

function handleClickCreateLine(e) {
    let cRect = canvas.getBoundingClientRect();              
    let canvasX = Math.round(e.clientX - cRect.left);        
    let canvasY = Math.round(e.clientY - cRect.top);
    console.log("We got", canvasX, canvasY);
    let curPoint = new Object;
    curPoint.x = canvasX, curPoint.y = canvasY;
    linePoints.push(curPoint);
    if (linePoints.length == 2) {
        // alert("Succesfully created line");
        let line = new Object;
        line.type = "line";
        line.points = [];
        var dx = (linePoints[1].y < linePoints[0].y) ? 1 : -1;
        var dy = (linePoints[1].x < linePoints[0].x) ? 1 : -1;
        for (let i = 0; i < 2; i++) {
            let createPoint = new Object;
            createPoint.x = linePoints[i].x + dx, createPoint.y = linePoints[i].y;
            line.points.push(createPoint);

            createPoint = new Object;
            createPoint.x = linePoints[i].x, createPoint.y = linePoints[i].y + dy;
            line.points.push(createPoint);
        }
        globalData.push(line);
        showGlobalData(globalData);
        renderObjects(globalData);
        btnLine.onclick();
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
        canvas.addEventListener("mousedown", handleClickCreateLine);
    } else {
        btnLine.innerHTML = "Start creating line";
        let canvas = document.getElementById("canvas");
        canvas.removeEventListener("click", handleClickCreateLine);
    }
}

var t = this;

this.canvas.addEventListener("mousedown", (e) => {
    isDown = true;
    var getpoint = [e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop, 0];
    if(lineDataIndex.length < 2 && linePointIndex.length < 2) {
        for(var j=0; j<globalData.length; j++){      
            if(globalData[j]["type"] == "line"){
                for(var i=0; i<globalData[j]["points"].length; i++){ 
                  if(globalData[j]["points"][i]["x"]-5 <= getpoint[0] && globalData[j]["points"][i]["x"]+5 >= getpoint[0]) {
                    if(globalData[j]["points"][i]["y"]-5 <= getpoint[1] && globalData[j]["points"][i]["y"]+5 >= getpoint[1]) {
                      lineDataIndex.push(j);
                      linePointIndex.push(i);
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
        lineDataIndex = [];
        linePointIndex = [];
    }
});

this.canvas.addEventListener("mousemove", (e) => {
    if(t.isMoving) {
        if(isDown && lineDataIndex.length == 2 && linePointIndex.length ==2) {

          var linePointPartner = Math.floor(((0+1+2+3) - linePointIndex[0] - linePointIndex[1]) / 2);

        //   var mulFactorX = globalData[lineDataIndex[0]]["points"][linePointPartner]["y"] > e.pageY - e.target.offsetTop ? 1 : -1;
        //   var mulFactorY = globalData[lineDataIndex[0]]["points"][linePointPartner]["x"] > e.pageX - e.target.offsetLeft ? 1 : -1;

          var deltaX = globalData[lineDataIndex[0]]["points"][linePointPartner]["y"] > e.pageY - e.target.offsetTop ? 1 : -1;
          var deltaY = globalData[lineDataIndex[0]]["points"][linePointPartner]["x"] > e.pageX - e.target.offsetLeft ? 1 : -1;

          globalData[lineDataIndex[0]]["points"][linePointIndex[0]]["x"] = e.pageX - e.target.offsetLeft + deltaX;
          globalData[lineDataIndex[0]]["points"][linePointIndex[0]]["y"] = e.pageY - e.target.offsetTop;
          globalData[lineDataIndex[1]]["points"][linePointIndex[1]]["x"] = e.pageX - e.target.offsetLeft;
          globalData[lineDataIndex[1]]["points"][linePointIndex[1]]["y"] = e.pageY - e.target.offsetTop + deltaY;
          globalData[lineDataIndex[0]]["points"][linePointPartner]["x"] = globalData[lineDataIndex[0]]["points"][linePointPartner]["x"];
          globalData[lineDataIndex[0]]["points"][linePointPartner]["y"] = globalData[lineDataIndex[0]]["points"][linePointPartner]["y"];
          globalData[lineDataIndex[1]]["points"][linePointPartner+1]["x"] = globalData[lineDataIndex[0]]["points"][linePointPartner+1]["x"];
          globalData[lineDataIndex[1]]["points"][linePointPartner+1]["y"] = globalData[lineDataIndex[0]]["points"][linePointPartner+1]["y"];
          renderObjects(globalData);
        }

      }
});