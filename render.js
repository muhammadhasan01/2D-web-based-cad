function renderObjects(globalData) {
    let polygonPoints = [];
    for (let i = 0; i < globalData.length; i++) {
        let geo = globalData[i];
        console.log(geo);
        if (geo.type == "line") {
            polygonPoints.push(geo.points);
        } else if (geo.type == "polygon" || geo.type == "square") {
            polygonPoints.push(geo.points);
        }
    }
    drawPolygon(polygonPoints);
}