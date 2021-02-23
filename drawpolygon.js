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

    // Create an empty buffer object to store vertex buffer
    let vertex_buffer = this.gl.createBuffer();

    // Bind appropriate array buffer to it
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertex_buffer);

    // Pass the vertex data to the buffer
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

    // Unbind the buffer
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

    // Create an empty buffer object to store Index buffer
    let Index_Buffer = this.gl.createBuffer();

    // Bind appropriate array buffer to it
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);

    // Pass the vertex data to the buffer
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);

    // Unbind the buffer
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);

    /*====================== Shaders =======================*/

    // Vertex shader source code
    let vertCode =
        'attribute vec3 coordinates;' +
        'void main(void) {' +
        'gl_PointSize = 7.0;' +
        ' gl_Position = vec4(coordinates, 1.0);' +
        '}';

    // Create a vertex shader object
    let vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);

    // Attach vertex shader source code
    this.gl.shaderSource(vertShader, vertCode);

    // Compile the vertex shader
    this.gl.compileShader(vertShader);

    // Fragment shader source code
    let geoColor = getColor(globalColor);
    console.log("wow", geoColor);
    let fragCode =
        'void main(void) {' +
        ` gl_FragColor = vec4(${geoColor[0]}, ${geoColor[1]}, ${geoColor[2]}, 1.0);` +
        '}';

    // Create fragment shader object 
    let fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);

    // Attach fragment shader source code
    this.gl.shaderSource(fragShader, fragCode);

    // Compile the fragmentt shader
    this.gl.compileShader(fragShader);

    // Create a shader program object to
    // store the combined shader program
    let shaderProgram = this.gl.createProgram();

    // Attach a vertex shader
    this.gl.attachShader(shaderProgram, vertShader);

    // Attach a fragment shader
    this.gl.attachShader(shaderProgram, fragShader);

    // Link both the programs
    this.gl.linkProgram(shaderProgram);

    // Use the combined shader program object
    this.gl.useProgram(shaderProgram);

    /* ======= Associating shaders to buffer objects =======*/

    // Bind vertex buffer object
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertex_buffer);

    // Bind index buffer object
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);

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
