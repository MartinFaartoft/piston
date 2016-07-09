/// <reference path="../../dist/piston-0.4.0.d.ts" />

namespace SampleGame {
    export class MouseBall extends ps.Actor {
        color: string = "yellow";
        constructor() {
            super(new ps.Point(0, 0));
            this.radius = 5;
            this.rotationSpeed = -1;
            this.isCollisionDetectionEnabled = true;
        }

        update(dt: number, scene: ps.Scene) {
        this.pos = this.game.mouse.pos;
        if (this.game.mouse.isLeftButtonDown) {
            this.color = "green";
        } else if (this.game.mouse.isRightButtonDown) {
            this.color = "red";
        } else if (this.game.mouse.isMiddleButtonDown) {
            this.color = "blue";
        } else {
            this.color = "yellow";
        }

        this.rotation += 1 * dt;
    }

        render(camera: ps.Camera) {
            camera.fillArc(this.pos, this.rotation, this.radius, 0, Math.PI * 1.2, false, this.color);
        }

        collideWith(other: ps.Actor) {
            this.destroyed = true;
        }
    }
}