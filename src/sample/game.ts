/// <reference path="../../dist/piston-0.4.0.d.ts" />
/// <reference path="ball.ts" />
/// <reference path="box.ts" />
/// <reference path="spriteball.ts" />

namespace SampleGame {
    let canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 768;
    document.body.appendChild(canvas);

    let b1 = new Ball(new ps.Point(200, 500), new ps.Vector(50, 0));
    let b2 = new Ball(new ps.Point(500, 500), new ps.Vector(-50, 0));
    
    let dimensions = new ps.Vector(canvas.width, canvas.height);
    let engine = new ps.Engine(dimensions, canvas);
    let resourceManager = new ps.ResourceManager();

    (<any>window).engine = engine;
    
    engine.preloadResources("assets/ball.png");
    engine.mouse.setCustomCursor("assets/crosshairs.png", new ps.Point(10, 10));
    engine.registerEntity(new Box(), new SpriteBall(), b1, b2);
    
    engine.start();    
}
