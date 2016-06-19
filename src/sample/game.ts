/// <reference path="../../dist/piston-0.2.0.d.ts" />

/// <reference path="gamestate.ts" />


namespace SampleGame {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 768;
    document.body.appendChild(canvas);

    let debug = false;

    let dimensions = new ps.Vector(canvas.width, canvas.height);
    let state = new GameState(dimensions);
    let engine = new ps.BrowserEngine(state, ctx, debug);

    engine.run();
}