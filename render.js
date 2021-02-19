function renderObjects() {
    for (geo in globalData) {
        if (geo.type == "line") {
            drawLine(geo.points);
        }
    }
}