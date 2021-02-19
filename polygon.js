// Create Polygon
let btnPolygon = document.getElementById('btn-polygon');
let btnPolygonCnt = 0;

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
        }
        polygon.color = "black";
        globalData.push(polygon);
        showGlobalData(globalData);
        // TODO: Make sure renderObject is right
        renderObjects(globalData);
        return;
    }
}

btnPolygon.onclick = function() {
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