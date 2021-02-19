function convertPoint(point) {
    let retPoint = new Object;
    retPoint.x = (point.x - 300) / 300;
    retPoint.y = (point.y - 300) / 300;
    return retPoint;
}