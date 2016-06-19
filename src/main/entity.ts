namespace ps {
    export abstract class Entity {
        vel: Vector = new Vector(0, 0);
        acc: Vector = new Vector(0, 0);
        isCollisionDetectionEnabled: boolean = false;
        isAccelerationEnabled: boolean = false;
        mass: number = 100;
        destroyed: boolean = false;
        isWrapping: boolean = false;

        //for now, all entities are round
        radius: number;
        
        private engine: Engine;
        
        constructor(public pos: Point) {}

        update(dt: number, dims: Vector): void {
            if (this.isAccelerationEnabled) {
                this.vel = this.vel.add(this.acc.multiply(dt));
            }

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

        abstract render(ctx: CanvasRenderingContext2D): void;
    }
}