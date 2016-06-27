/// <reference path="../../dist/piston-0.4.0.d.ts" />
/// <reference path="ball.ts" />
/// <reference path="box.ts" />
/// <reference path="spriteball.ts" />


namespace SampleGame {
    let canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 768;
    document.body.appendChild(canvas);

    let mouseBall = new Ball(new ps.Point(0, 0), new ps.Vector(0, 0));
    mouseBall.radius = 20;
    mouseBall.vel = new ps.Vector(0, 0);
    mouseBall.isCollisionDetectionEnabled = true;
    mouseBall.update = function(dt: number, dims: ps.Vector) {
        this.pos = engine.mouse.pos;
        if (engine.mouse.isLeftButtonDown) {
            this.color = "green";
        } else if (engine.mouse.isRightButtonDown) {
            this.color = "red";
        } else if (engine.mouse.isMiddleButtonDown) {
            this.color = "blue";
        } else {
            this.color = "orange";
        }

        this.rotation += 1 * dt;
    }

    let b1 = new Ball(new ps.Point(200, 500), new ps.Vector(50, 0));
    let b3 = new Ball(new ps.Point(500, 500), new ps.Vector(-50, 0));
    
    let dimensions = new ps.Vector(canvas.width, canvas.height);
    let engine = new ps.Engine(dimensions, canvas);
    let resourceManager = new ps.ResourceManager();

    (<any>window).engine = engine;
    
    engine.preloadResources("assets/ball.png");
    engine.mouse.setCustomCursor("assets/crosshairs.png", new ps.Point(10, 10));
    engine.registerEntity(new Box(), new SpriteBall(), mouseBall, b1, b3);
    
    engine.start();    
}
