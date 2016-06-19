/// <reference path="../../dist/piston-0.2.0.d.ts" />

namespace SampleGame {
    export class Ball extends ps.Entity {
        constructor() {
            super(new ps.Point(100, 100), new ps.Vector(50, 50), 10);
        }

        update(dt: number, state: GameState) {
            super.update(dt, state);
        }

        render(ctx: CanvasRenderingContext2D, state: GameState) {
            ctx.fillStyle = "orange";
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}