/// <reference path="../../dist/piston-0.4.0.d.ts" />

namespace SampleGame {
    export class AnimatedSpriteBall extends ps.ActorWithSprites {
        initialPos: ps.Point;
        constructor() {
            super(new ps.Point(100, 100));
            this.vel = new ps.Vector(10, 0);
            this.radius = 10;
            this.rotationSpeed = -1;
            this.initialPos = this.pos;
            
            let ballSprite = new ps.AnimatedSprite(new ps.Point(0, 0), [10, 10], "assets/ball.png", [0, 1, 2], 0.9);
            this.sprites.push(ballSprite);
        }

        update(dt: number, scene: ps.Scene) {
            super.update(dt, scene);
            if (this.game.keyboard.isKeyDown("space")) {
                this.pos.x += 20;
            }
        }

        render(camera: ps.Camera, scene: ps.Scene) {
            camera.drawLine(this.initialPos, this.pos, 3, "green");
            camera.paintSprites(this.pos, this.rotation, [30, 80], this.sprites);
        }
    }
}
