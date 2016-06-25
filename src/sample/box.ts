/// <reference path="../../dist/piston-0.4.0.d.ts" />

namespace SampleGame {
    export class Box extends ps.Entity {
        color: string = "blue";
        constructor() {
            super(new ps.Point(200, 200));
            this.vel = new ps.Vector(0, 50);
        }

        render(camera: ps.Camera) {
            camera.fillRect(this.pos, 50, 50, this.color);
        }
    }
}
