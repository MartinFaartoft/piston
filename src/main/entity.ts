namespace ps {
    export abstract class Entity {
        vel: Vector = new Vector(0, 0);
        acc: Vector = new Vector(0, 0);

        mass: number = 100;
        
        destroyed: boolean = false;
        isWrapping: boolean = false;
        
        private engine: Engine;
        
        constructor(public pos: Point) {}

        update(dt: number, dims: Vector): void {
            this.pos = this.pos.add(this.vel.multiply(dt));
            
            if (this.isWrapping) {
                this.wrap(dims);
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

        abstract render(ctx: CanvasRenderingContext2D);
    }
}