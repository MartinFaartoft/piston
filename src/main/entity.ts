/// <reference path="basegamestate.ts" />

namespace ps {
    export abstract class Entity {
        destroyed: boolean = false;

        constructor(public pos: number[], public speed: number[], public radius: number) {

        }

        update(dt: number, state: BaseGameState): void {
            this.pos[0] += this.speed[0] * dt;
            this.pos[1] += this.speed[1] * dt;

            this.wrap(state.dimensions);
        }

        private wrap(dimensions: number[]) {
            // exit right edge
            if (this.pos[0] > dimensions[0]) {
                this.pos[0] -= dimensions[0];
            }

            // exit left edge
            if (this.pos[0] < 0) {
                this.pos[0] += dimensions[0];
            }

            // exit top
            if (this.pos[1] < 0) {
                this.pos[1] += dimensions[1];
            }

            // exit bottom
            if (this.pos[1] > dimensions[1]) {
                this.pos[1] -= dimensions[1];
            }
        }

        getWrappedBoundingCircles(dimensions: number[]) {
            let boundingCircles: any[] = [this];
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    boundingCircles.push({
                        pos: [this.pos[0] + i * dimensions[0], this.pos[1] + j * dimensions[1]],
                        radius: this.radius,
                        entity: this
                    });
                }
            }
            return boundingCircles;
        }

        abstract render(ctx: CanvasRenderingContext2D, state: BaseGameState);
    }
}