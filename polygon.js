var btn = document.getElementById('btn-polygon');

export function handleButtonPolygon() {
    let btn = document.getElementById('btn-polygon');
    if (btn.innerHTML === "Start Create Polygon") {
        btn.innerHTML = "Stop Create Polygon";
    } else {
        btn.innerHTML = "Start Create Polygon";
    }
}



export const addPolygon = (points) => {
    let geometryObject = new Object();
    geometryObject.type = "polygon";
    geometryObject.points = points;
    geometryObject.color = "black";
    return geometryObject;
}


// TODO: Implement update polygon
export const updatePolygon = (polygon) => {

}