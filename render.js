function renderObjects(globalData) {
    alert("Saya kepanggil");
    console.log("NANI");
    console.log(globalData);
    for (let i = 0; i < globalData.length; i++) {
        let geo = globalData[i];
        console.log(geo);
        if (geo.type == "line") {
            drawLine(geo.points);
        } else if (geo.type == "polygon") {
            alert("saya poligon");
            drawPolygon(geo.points);
        } else if(geo.type == "square") {
            alert("saya kotak");
            drawPolygon(geo.points);
        }
    }
}