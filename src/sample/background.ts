/// <reference path="../../dist/piston-0.4.0.d.ts" />

namespace SampleGame {
    export class Background extends ps.Actor {
        color: string = "white";
        speed = 200;
        constructor() {
            super(new ps.Point(0, 0));
        }

        render(camera: ps.Camera, scene: ps.Scene) {
            let divisions = 10.0;
            for (let i = 0; i <= divisions; i++) {
                let size = scene.getSize();
                let x0 = scene.getSize().x / divisions * i;
                camera.drawLine(new ps.Point(x0, 0), new ps.Point(x0, size.y), 1, this.color);

                let y0 = scene.getSize().y / divisions * i;

                camera.drawLine(new ps.Point(0, y0), new ps.Point(size.x, y0), 1, this.color);
            }
        }
    }
}
