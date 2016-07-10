/// <reference path="../../dist/piston-0.4.0.d.ts" />
/// <reference path="ball.ts" />
/// <reference path="box.ts" />
/// <reference path="spriteball.ts" />
/// <reference path="mouseball.ts" />
/// <reference path="background.ts" />
/// <reference path="person.ts" />

namespace SampleGame {
    let canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 1000;
    let scene = new ps.DefaultScene(new ps.Vector(1000, 1000));
    document.body.appendChild(canvas);
    
    let game = new ps.Game(canvas, scene);

    let b1 = new Ball(new ps.Point(200, 500), new ps.Vector(50, 0));
    let b2 = new Ball(new ps.Point(500, 500), new ps.Vector(-50, 0));
    let box = new Box();
    
    game.loadResources("assets/ball.png");
    game.mouse.setCustomCursor("assets/crosshairs.png", new ps.Point(10, 10));
    game.scene.addActors(new Background(), box, new SpriteBall(), b1, b2, new MouseBall(), new Person());
    game.camera.viewPort = new ps.Vector(450, 450);

    game.mouse.addMouseMoveEventListener((pos) =>  {
        box.pos = pos;
    });

    game.mouse.addMouseDownEventListener((pos, button) =>  {
        if (button === 0) {
            box.color = "green";
        }
    });

    game.mouse.addMouseUpEventListener((pos, button) =>  {
        if (button === 0) {
            box.color = "blue";
        }

        if (button === 2) {
            game.engine.camera.toggleFullScreen();
        }
    });
    
    game.start();    
}
