// Create Polygon
let btnPolygon = document.getElementById('btn-polygon');
let btnPolygonCnt = 0;

var moveButton = document.getElementById("move-button");

this.isMoving = false;
var isDown = null;
var dataIndex = -1;
var pointIndex = -1; 

let polygonPoints = [];
let numPoints = 0;

function handleClickCreatePolygon(e) {
    if (polygonPoints.length == numPoints) {
        alert("You cannot create any more polygon, please click the stop creating polygon button");
        return;
    }
    let cRect = canvas.getBoundingClientRect();        
    let ctx = canvas.getContext("webgl");
    let canvasX = Math.round(e.clientX - cRect.left);        
    let canvasY = Math.round(e.clientY - cRect.top);
    // ctx.fillRect(canvasX, canvasY, 10, 10);
    console.log("We got", canvasX, canvasY);
    let curPoint = new Object;
    curPoint.x = canvasX, curPoint.y = canvasY;
    polygonPoints.push(curPoint);
    if (polygonPoints.length == numPoints) {
        alert("Succesfully created polygon");
        let polygon = new Object;
        polygon.type = "polygon";
        polygon.points = [];
        for (let i = 0; i < numPoints; i++) {
            polygon.points.push(polygonPoints[i]);
            console.log("=======> " + this.mantap);
            console.log(polygonPoints[i]);
        }
        polygon.color = "black";
        globalData.push(polygon);
        showGlobalData(globalData);
        // TODO: Make sure renderObject is right
        renderObjects(globalData);
        return;
    }
}
 
var t = this;

btnPolygon.onclick = function() {
    if(t.isMoving == false) {
        btnPolygonCnt++;
        if (btnPolygonCnt % 2 == 1) {
            btnPolygon.innerHTML = "Stop creating polygon";
            // TODO: Handle invalid numPoints
            numPoints = prompt("Plase input the number of point you want");
            let canvas = document.getElementById("canvas");
            polygonPoints = [];
            canvas.addEventListener("click", handleClickCreatePolygon);
        } else {
            btnPolygon.innerHTML = "Start creating polygon";
            alert("Stopped creating polygon");
            numPoints = 0;
            let canvas = document.getElementById("canvas");
            canvas.removeEventListener("click", handleClickCreatePolygon);
        }

    }
}

moveButton.addEventListener("click", () => {
    t.isMoving = !t.isMoving;
    alert("isMoving = " + t.isMoving);
});

this.canvas.addEventListener("mousedown", (e) => {
    isDown = true;
    var getpoint = [e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop, 0];
    if(dataIndex == -1 && pointIndex == -1) {
        for(var j=0; j<globalData.length; j++){            
            for(var i=0; i<globalData[j]["points"].length; i++){
              
              if(globalData[j]["points"][i]["x"]-5 <= getpoint[0] && globalData[j]["points"][i]["x"]+5 >= getpoint[0]) {
                if(globalData[j]["points"][i]["y"]-5 <= getpoint[1] && globalData[j]["points"][i]["y"]+5 >= getpoint[1]) {
                  dataIndex = j;
                  pointIndex = i;
                //   alert("DDDDDDDDDDDDDDDDDDDDD");
                  break;
                }
              }
            }
        }
    }
});

this.canvas.addEventListener("mouseup", (e) => {
    if(t.isMoving) {
        isDown = false;
        dataIndex = -1;
        pointIndex = -1;
    }
});

this.canvas.addEventListener("mousemove", (e) => {
    if(t.isMoving) {
        if(isDown && dataIndex != -1 && pointIndex != -1) {
          console.log(e.pageX - e.target.offsetLeft);
          globalData[dataIndex]["points"][pointIndex]["x"] = e.pageX - e.target.offsetLeft;
          globalData[dataIndex]["points"][pointIndex]["y"] = e.pageY - e.target.offsetTop;
          renderObjects(globalData);
        }

      }
});