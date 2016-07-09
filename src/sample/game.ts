/// <reference path="../../dist/piston-0.4.0.d.ts" />
/// <reference path="ball.ts" />
/// <reference path="box.ts" />
/// <reference path="spriteball.ts" />
/// <reference path="mouseball.ts" />

namespace SampleGame {
    let game = new ps.Game();

    let b1 = new Ball(new ps.Point(200, 500), new ps.Vector(50, 0));
    let b2 = new Ball(new ps.Point(500, 500), new ps.Vector(-50, 0));
    let box = new Box();
    
    game.loadResources("assets/ball.png");
    game.engine.mouse.setCustomCursor("assets/crosshairs.png", new ps.Point(10, 10));
    game.engine.registerEntity(box, new SpriteBall(), b1, b2, new MouseBall());

    game.engine.mouse.addMouseMoveEventListener((pos) =>  {
        box.pos = pos;
    });

    game.engine.mouse.addMouseDownEventListener((pos, button) =>  {
        if (button === 0) {
            box.color = "green";
        }
    });

    game.engine.mouse.addMouseUpEventListener((pos, button) =>  {
        if (button === 0) {
            box.color = "blue";
        }

        if (button === 2) {
            game.engine.camera.toggleFullScreen();
        }
    });
    
    game.start();    
}
