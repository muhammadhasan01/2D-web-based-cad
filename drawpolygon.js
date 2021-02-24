function drawPolygon(list_of_points) {
    if (list_of_points.length === 0) return;
    
    console.log(list_of_points);
    let vertices = [];
    let indices = [];
    let curIdx = 0;
    for (let it = 0; it < list_of_points.length; it++) {
        let points = list_of_points[it];
        console.log(it, points);
        for (let i = 0; i < points.length; i++) {
            let p = points[i];
            vertices.push((p.x - 300) / 300, (300 - p.y) / 300, 0.0);
        }
        for (let i = 1; i < points.length - 1; i++) {
            for (let j = i + 1; j < points.length; j++) {
                indices.push(curIdx, curIdx + i, curIdx + j);
            }
        }
        curIdx += points.length;
    }
    
    console.log(vertices);
    console.log(indices);

    let geoColor = getColor(globalColor);
    console.log("wow", geoColor);
    let fragCode =
        'void main(void) {' +
        ` gl_FragColor = vec4(${geoColor[0]}, ${geoColor[1]}, ${geoColor[2]}, 1.0);` +
        '}';

    let fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);

    this.gl.shaderSource(fragShader, fragCode);

    this.gl.compileShader(fragShader);

    let shaderProgram = this.gl.createProgram();

    this.gl.attachShader(shaderProgram, vertShader);

    this.gl.attachShader(shaderProgram, fragShader);

    this.gl.linkProgram(shaderProgram);

    this.gl.useProgram(shaderProgram);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertex_buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);

    let coord = this.gl.getAttribLocation(shaderProgram, "coordinates");

    this.gl.vertexAttribPointer(coord, 3, this.gl.FLOAT, false, 0, 0);

    this.gl.enableVertexAttribArray(coord);


    this.gl.enable(this.gl.DEPTH_TEST);

    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.gl.drawArrays(this.gl.POINTS, 0, vertices.length / 3);

    // Draw the triangle
    this.gl.drawElements(this.gl.TRIANGLES, indices.length, this.gl.UNSIGNED_SHORT, 0);
}
