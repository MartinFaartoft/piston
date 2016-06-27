namespace ps {
    export abstract class Entity {
        vel: Vector = new Vector(0, 0);
        acc: Vector = new Vector(0, 0);
        rotation: number = 0;
        rotationSpeed: number = 0;
        isCollisionDetectionEnabled: boolean = false;
        isAccelerationEnabled: boolean = false;
        mass: number = 100;
        destroyed: boolean = false;
        isWrapping: boolean = false;

        engine: Engine;

        //for now, all entities are round
        radius: number;
        
        
        
        constructor(public pos: Point) {}

        update(dt: number, dims: Vector): void {
            if (this.isAccelerationEnabled) {
                this.vel = this.vel.add(this.acc.multiply(dt));
            }
            
            if (this.rotationSpeed !== 0) {
                this.rotation = (this.rotation + this.rotationSpeed * dt) % (Math.PI * 2);
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

        collideWith(other: Entity): void { }

        abstract render(camera: Camera): void;
    }
}