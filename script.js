this.canvas = document.getElementById('canvas');
this.gl = this.canvas.getContext('webgl');

let vertices = [];
let indices = [];

// Set the view port
this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);


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

