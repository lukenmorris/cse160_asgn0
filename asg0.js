// Retrieve WebGL canvas element and get drawing context
let canvas;
let ctx;

// Initialize the environment
function main() {
    // Retrieve <canvas> element
    canvas = document.getElementById('canvas');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // Get the rendering context for 2D graphics
    ctx = canvas.getContext('2d');

    // Draw initial vectors
    handleDrawEvent();
}

// Draw a vector from origin with given color
function drawVector(v, color) {
    const origin = { x: canvas.width/2, y: canvas.height/2 };
    const scale = 20; // Scale factor to make vectors visible
    
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(origin.x + v.elements[0] * scale, origin.y - v.elements[1] * scale); // Subtract y because canvas y-axis is inverted
    ctx.strokeStyle = color;
    ctx.stroke();
}

// Handle the draw button event
function handleDrawEvent() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Get input values
    const v1 = new Vector3([
        parseFloat(document.getElementById('v1x').value),
        parseFloat(document.getElementById('v1y').value),
        0
    ]);
    const v2 = new Vector3([
        parseFloat(document.getElementById('v2x').value),
        parseFloat(document.getElementById('v2y').value),
        0
    ]);
    
    // Draw vectors
    drawVector(v1, "red");
    drawVector(v2, "blue");
}

// Calculate angle between vectors
function angleBetween(v1, v2) {
    const dotProduct = Vector3.dot(v1, v2);
    const magProduct = v1.magnitude() * v2.magnitude();
    return Math.acos(dotProduct / magProduct) * (180 / Math.PI);
}

// Calculate area of triangle formed by vectors
function areaTriangle(v1, v2) {
    const cross = Vector3.cross(v1, v2);
    return cross.magnitude() / 2;
}

// Handle the operation button event
function handleDrawOperationEvent() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Get input values
    let v1 = new Vector3([
        parseFloat(document.getElementById('v1x').value),
        parseFloat(document.getElementById('v1y').value),
        0
    ]);
    let v2 = new Vector3([
        parseFloat(document.getElementById('v2x').value),
        parseFloat(document.getElementById('v2y').value),
        0
    ]);

    // Draw original vectors
    drawVector(v1, "red");
    drawVector(v2, "blue");

    // Get operation and perform calculation
    const operation = document.getElementById('operation').value;
    const scalar = parseFloat(document.getElementById('scalar').value);
    let resultVector;

    switch(operation) {
        case 'add': {
            resultVector = new Vector3([
                v1.elements[0] + v2.elements[0],
                v1.elements[1] + v2.elements[1],
                0
            ]);
            drawVector(resultVector, "green");
            break;
        }
        case 'sub': {
            resultVector = new Vector3([
                v1.elements[0] - v2.elements[0],
                v1.elements[1] - v2.elements[1],
                0
            ]);
            drawVector(resultVector, "green");
            break;
        }
        case 'mul': {
            let scaledV1 = new Vector3([
                v1.elements[0] * scalar,
                v1.elements[1] * scalar,
                0
            ]);
            let scaledV2 = new Vector3([
                v2.elements[0] * scalar,
                v2.elements[1] * scalar,
                0
            ]);
            drawVector(scaledV1, "green");
            drawVector(scaledV2, "green");
            break;
        }
        case 'div': {
            if (scalar !== 0) {
                let scaledV1 = new Vector3([
                    v1.elements[0] / scalar,
                    v1.elements[1] / scalar,
                    0
                ]);
                let scaledV2 = new Vector3([
                    v2.elements[0] / scalar,
                    v2.elements[1] / scalar,
                    0
                ]);
                drawVector(scaledV1, "green");
                drawVector(scaledV2, "green");
            } else {
                console.log("Error: Division by zero.");
            }
            break;
        }
        case 'normalize': {
            let normV1 = new Vector3(v1.elements);
            let normV2 = new Vector3(v2.elements);
            normV1.normalize();
            normV2.normalize();
            drawVector(normV1, "green");
            drawVector(normV2, "green");
            console.log('Magnitudes after normalization:', 
                        'v1:', normV1.magnitude(), 
                        'v2:', normV2.magnitude());
            break;
        }
        case 'angle': {
            const angle = angleBetween(v1, v2);
            console.log('Angle between vectors:', angle, 'degrees');
            break;
        }
        case 'area': {
            const area = areaTriangle(v1, v2);
            console.log('Area of triangle:', area, 'square units');
            break;
        }
    }
}


// Call main when the page loads
window.onload = main;