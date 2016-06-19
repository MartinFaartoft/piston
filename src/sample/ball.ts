/// <reference path="../../dist/piston-0.3.0.d.ts" />

namespace SampleGame {
    export class Ball extends ps.RoundEntity {
        constructor() {
            super(new ps.Point(100, 100), 100);
            this.vel = new ps.Vector(500, 500);
        }

        render(ctx: CanvasRenderingContext2D) {
            ctx.fillStyle = "orange";
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}