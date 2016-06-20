/// <reference path="../../dist/piston-0.3.0.d.ts" />
/// <reference path="ball.ts" />


namespace SampleGame {
    function mousePositionInsideElement(e: MouseEvent) {
        let pos = findPos(canvas);
        let mousePos = [e.clientX - pos.left, e.clientY - pos.top]; 
        console.log(mousePos);
        ball.pos.x = mousePos[0];
        ball.pos.y = mousePos[1];
        return mousePos;
    }

    function readMouseButton(e: MouseEvent) {
        e.stopImmediatePropagation();
        console.log(e.button);
        if (e.button === 1) {
            ball.color = "green";
        }
        else if (e.button === 2) {
            ball.color = "blue";
        }
        else {
            ball.color = "orange";
        }
         
        return false;
    }

    // Find out where an element is on the page
    // From http://www.quirksmode.org/js/findpos.html
    function findPos(obj) {
        let curleft = 0, curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }
        return {
            left : curleft,
            top : curtop
        };
    }
    document.body.oncontextmenu = (e) => { return false; };
    let canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 768;
    document.body.appendChild(canvas);
    canvas.style.cursor = "none";
    canvas.addEventListener("mousemove", mousePositionInsideElement,  false);
    canvas.addEventListener("mousedown", readMouseButton, false);
    
    let ball = new Ball();
    ball.radius = 20;
    ball.vel = new ps.Vector(0, 0);

    let dimensions = new ps.Vector(canvas.width, canvas.height);
    let engine = new ps.Engine(dimensions, canvas);
    engine.registerEntity(new Ball(), ball);

    engine.run();


}