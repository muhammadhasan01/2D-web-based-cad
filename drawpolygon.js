function drawPolygon(list_of_points) {
    if (list_of_points.length === 0) return;
    
    /*========== Defining and storing the geometry =========*/
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


    // Use the combined shader program object
    this.gl.useProgram(shaderProgram);

    /* ======= Associating shaders to buffer objects =======*/

    // Bind vertex buffer object
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertex_buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

    // Bind index buffer object
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);

    // Get the attribute location
    let coord = this.gl.getAttribLocation(shaderProgram, "coordinates");

    // Point an attribute to the currently bound VBO
    this.gl.vertexAttribPointer(coord, 3, this.gl.FLOAT, false, 0, 0);

    // Enable the attribute
    this.gl.enableVertexAttribArray(coord);

    /*============= Drawing the Quad ================*/

    // Clear the canvas
    // this.gl.clearColor(1.0, 1.0, 1.0, 1.0);

    // Enable the depth test
    this.gl.enable(this.gl.DEPTH_TEST);

    // Clear the color buffer bit
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    //
    this.gl.drawArrays(this.gl.POINTS, 0, vertices.length / 3);

    // Draw the triangle
    this.gl.drawElements(this.gl.TRIANGLES, indices.length, this.gl.UNSIGNED_SHORT, 0);
}
