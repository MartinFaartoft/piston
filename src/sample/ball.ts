/// <reference path="../../dist/piston-0.4.0.d.ts" />

namespace SampleGame {
    export class Ball extends ps.Entity {
        color: string = "orange";
        constructor(pos: ps.Point, vel: ps.Vector) {
            super(pos);
            this.vel = vel;
            this.radius = 50;
            this.rotationSpeed = -.2;
            this.isCollisionDetectionEnabled = true;
        }

        render(camera: ps.Camera) {
            camera.fillArc(this.pos, this.rotation, this.radius, 0, Math.PI * 1.2, false, this.color);
        }

        collideWith(other: ps.Entity) {
            this.destroyed = true;
        }
    }
}