/// <reference path="../../dist/piston-0.4.0.d.ts" />
/// <reference path="ball.ts" />
/// <reference path="box.ts" />



namespace SampleGame {
    let canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 768;
    document.body.appendChild(canvas);

    let ball = new Ball();
    ball.radius = 20;
    ball.vel = new ps.Vector(0, 0);
    ball.update = function(dt: number, dims: ps.Vector) {
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
    }

    let dimensions = new ps.Vector(canvas.width, canvas.height);
    let engine = new ps.Engine(dimensions, canvas);
    engine.mouse.setCustomCursor("assets/crosshairs.png", new ps.Point(10, 10));
    engine.registerEntity(new Ball(), new Box(), ball);

    engine.run();
}
