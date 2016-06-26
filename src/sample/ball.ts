/// <reference path="../../dist/piston-0.4.0.d.ts" />

namespace SampleGame {
    export class Ball extends ps.Entity {
        color: string = "orange";
        constructor() {
            super(new ps.Point(50, 50));
            this.vel = new ps.Vector(5, 5);
            this.radius = 50;
            this.rotationSpeed = -0.2;
        }

        render(camera: ps.Camera) {
            camera.fillArc(this, this.radius, 0, Math.PI * 1.2, false, this.color);
        }
    }
}