/// <reference path="../../dist/piston-0.4.0.d.ts" />

namespace SampleGame {
    export class Ball extends ps.Entity {
        color: string = "orange";
        constructor() {
            super(new ps.Point(50, 50));
            this.vel = new ps.Vector(500, 500);
            this.radius = 50;
        }

        render(camera: ps.Camera) {
            camera.fillCircle(this.pos, this.radius, this.color);
        }
    }
}
