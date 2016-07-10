/// <reference path="../../dist/piston-0.4.0.d.ts" />

namespace SampleGame {
    export class Box extends ps.Actor {
        color: string = "blue";
        constructor() {
            super(new ps.Point(0, 0));
            this.vel = new ps.Vector(0, 0);
            this.rotationSpeed = 1;
        }

        render(camera: ps.Camera) {
            camera.fillRect(this.pos, this.rotation, 50, 50, this.color);
        }
    }
}
