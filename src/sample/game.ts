/// <reference path="../../dist/piston-0.4.0.d.ts" />
/// <reference path="ball.ts" />
/// <reference path="box.ts" />
/// <reference path="spriteball.ts" />
/// <reference path="mouseball.ts" />


namespace SampleGame {
    let canvas = document.createElement("canvas");
    let aspectRatio = 16 / 9.0;
    
    function resizeCanvas(e) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth / aspectRatio;
        engine.setDimensions(new ps.Vector(canvas.width, canvas.height));
    }
    
    window.onresize = resizeCanvas; 
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth / aspectRatio;
    document.body.appendChild(canvas);
    document.body.style.margin = "0";
    console.log(canvas.offsetWidth, canvas.offsetHeight);

    let b1 = new Ball(new ps.Point(200, 500), new ps.Vector(50, 0));
    let b2 = new Ball(new ps.Point(500, 500), new ps.Vector(-50, 0));
    let box = new Box();
    
    let dimensions = new ps.Vector(canvas.offsetWidth, canvas.offsetHeight);
    let engine = new ps.Engine(dimensions, new ps.Vector(1600, 900), canvas);
    let resourceManager = new ps.ResourceManager();

    (<any>window).engine = engine;
    
    engine.preloadResources("assets/ball.png");
    engine.mouse.setCustomCursor("assets/crosshairs.png", new ps.Point(10, 10));
    engine.registerEntity(box, new SpriteBall(), b1, b2, new MouseBall());

    engine.mouse.addMouseMoveEventListener((pos) =>  {
        box.pos = pos;
    });

    engine.mouse.addMouseDownEventListener((pos, button) =>  {
        if (button === 0) {
            box.color = "green";
        }
    });

    engine.mouse.addMouseUpEventListener((pos, button) =>  {
        if (button === 0) {
            box.color = "blue";
        }

        if (button === 2) {
            engine.camera.toggleFullScreen();
        }
    });
    
    engine.start();    
}
