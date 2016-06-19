/// <reference path="../../dist/piston-0.2.0.d.ts" />

/// <reference path="ball.ts" />


namespace SampleGame {
    export class GameState extends ps.BaseGameState {
        ball: Ball = new Ball();

        constructor(dim: ps.Vector) {
            super(dim);
        }

        update(dt: number) {
            this.ball.update(dt, this);
        }
        
        render(ctx: CanvasRenderingContext2D) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, this.dimensions.x, this.dimensions.y);

            this.ball.render(ctx, this);
        }
    }
}