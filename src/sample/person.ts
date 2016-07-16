/// <reference path="../../dist/piston-0.5.0.d.ts" />

namespace SampleGame {
    export class Person extends ps.Actor {
        color: string = "purple";
        speed = 200;
        constructor() {
            super(new ps.Point(500, 500));
            this.vel = new ps.Vector(0, 0)
        }

        update(dt: number, scene: ps.Scene) {
            this.vel.x = 0;
            this.vel.y = 0;

            if (this.game.keyboard.isKeyDown("RIGHT")) {
                this.vel.x = this.speed;
            } else if (this.game.keyboard.isKeyDown("LEFT")) {
                this.vel.x = -this.speed;
            } 
            
            if (this.game.keyboard.isKeyDown("UP")) {
                this.vel.y = this.speed;
            } else if (this.game.keyboard.isKeyDown("DOWN")) {
                this.vel.y = -this.speed;
            }

            super.update(dt, scene);

            this.game.camera.centerOn(this.pos);
        }

        render(camera: ps.Camera) {
            camera.fillRect(this.pos, this.rotation, 50, 50, this.color);
        }
    }
}

        