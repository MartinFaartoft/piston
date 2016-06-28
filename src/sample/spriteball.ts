/// <reference path="../../dist/piston-0.4.0.d.ts" />

namespace SampleGame {
    export class SpriteBall extends ps.EntityWithSprites {
        initialPos: ps.Point;
        constructor() {
            super(new ps.Point(100, 100));
            this.vel = new ps.Vector(10, 0);
            this.radius = 10;
            this.rotationSpeed = -1;
            this.initialPos = this.pos;
            
            let ballSprite = new ps.Sprite(new ps.Point(0, 0), [10, 10], [0, 1, 2,], 0.9, "assets/ball.png");
            this.sprites.push(ballSprite);
        }

        render(camera: ps.Camera) {
            camera.drawLine(this.initialPos, this.pos, 3, "green");
            camera.paintSprites(this.pos, this.rotation, [30, 80], this.sprites);
        }
    }
}
