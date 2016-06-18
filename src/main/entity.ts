/// <reference path="basegamestate.ts" />

namespace ps {
    export abstract class Entity {
        destroyed: boolean = false;
        isWrapping: boolean = false;
        constructor(public pos: Point, public speed: Vector, public radius: number) {

        }

        update(dt: number, state: BaseGameState): void {
            this.pos = this.pos.add(this.speed.multiply(dt));
            
            if (this.isWrapping) {
                this.wrap(state.dimensions);
            }
        }

        private wrap(dimensions: Vector): void {
            // exit right edge
            if (this.pos.x > dimensions.x) {
                this.pos.x -= dimensions.x;
            }

            // exit left edge
            if (this.pos.x < 0) {
                this.pos.x += dimensions.x;
            }

            // exit top
            if (this.pos.y < 0) {
                this.pos.y += dimensions.y;
            }

            // exit bottom
            if (this.pos.y > dimensions.y) {
                this.pos.y -= dimensions.y;
            }
        }

        getWrappedBoundingCircles(dimensions: Vector) {
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