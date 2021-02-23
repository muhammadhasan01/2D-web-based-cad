this.canvas = document.getElementById('canvas');
this.gl = this.canvas.getContext('webgl');

// Set the view port
this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
