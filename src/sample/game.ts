/// <reference path="../../dist/piston-0.3.0.d.ts" />
/// <reference path="ball.ts" />


namespace SampleGame {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 768;
    document.body.appendChild(canvas);

    let debug = false;

    let dimensions = new ps.Vector(canvas.width, canvas.height);
    let engine = new ps.Engine(dimensions, ctx);
    engine.registerEntity(new Ball());

    engine.run();
}