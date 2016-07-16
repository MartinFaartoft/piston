/// <reference path="../../dist/piston-0.5.0.d.ts" />
/// <reference path="ball.ts" />
/// <reference path="box.ts" />
/// <reference path="animatedspriteball.ts" />
/// <reference path="spriteball.ts" />
/// <reference path="mouseball.ts" />
/// <reference path="background.ts" />
/// <reference path="person.ts" />

namespace SampleGame {
    //prepare canvas
    // let canvas = document.createElement("canvas");
    // canvas.width = 1000;
    // canvas.height = 1000;
    // document.body.appendChild(canvas);

    //prepare scene and actors
    let box = new Box();
    
    let scene = new ps.DefaultScene(new ps.Vector(1000, 1000));
    scene.addActors(
        new Background(), 
        box, 
        new SpriteBall(),
        new AnimatedSpriteBall(), 
        new Ball(new ps.Point(200, 500), new ps.Vector(50, 0)), 
        new Ball(new ps.Point(500, 500), new ps.Vector(-50, 0)), 
        new MouseBall(), 
        new Person()
    );
    
    //prepare game and resources
    let game = new ps.Game(null, scene);
    game.loadResources("assets/ball.png");
    game.mouse.setCustomCursor("assets/crosshairs.png", new ps.Point(10, 10));
    //game.camera.viewPort = new ps.Vector(450, 450);

    //attach mouse listeners
    game.mouse.addMouseMoveEventListener((pos) =>  {
        box.pos = pos;
    });

    game.mouse.addMouseDownEventListener((pos, button) =>  {
        if (button === 0) {
            box.color = "green";
        }
    });

    game.mouse.addMouseWheelEventListener((deltaX, deltaY) => {
        game.camera.zoom(deltaY * .3);
    });

    game.mouse.addMouseUpEventListener((pos, button) =>  {
        if (button === 0) {
            box.color = "blue";
        }

        if (button === 2) {
            game.engine.camera.toggleFullScreen();
        }
    });
    
    //start game
    game.start();    
}
