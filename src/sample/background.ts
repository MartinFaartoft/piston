/// <reference path="../../dist/piston-0.5.0.d.ts" />

namespace SampleGame {
    export class Background extends ps.Actor {
        color: string = "pink";
        speed = 200;
        constructor() {
            super(new ps.Point(0, 0));
        }

        render(camera: ps.Camera, scene: ps.Scene) {
            let divisions = 10.0;
            for (let i = 0; i <= divisions; i++) {
                let size = scene.getSize();
                let x = size.x / divisions * i;
                camera.drawLine(new ps.Point(x, 0), new ps.Point(x, size.y), 1, this.color);

                let y = size.y / divisions * i;

                camera.drawLine(new ps.Point(0, y), new ps.Point(size.x, y), 1, this.color);
            }
        }
    }
}
