/// <reference path="../../dist/piston-0.4.0.d.ts" />

namespace SampleGame {
    export class SpriteBall extends ps.EntityWithSprites {
        constructor() {
            super(new ps.Point(100, 100));
            this.vel = new ps.Vector(10, 0);
            this.radius = 10;
            
            let ballSprite = new ps.Sprite(new ps.Point(0, 0), [10, 10], [0, 1, 2,], 0.9, "assets/ball.png");
            this.sprites.push(ballSprite);
        }

        render(camera: ps.Camera) {
            camera.paintSprites(this, this.sprites);
        }
    }
}
