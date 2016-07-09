/// <reference path="scene.ts" />
/// <reference path="game.ts" />

namespace ps {
    export abstract class Actor {
        vel: Vector = new Vector(0, 0);
        acc: Vector = new Vector(0, 0);
        rotation: number = 0;
        rotationSpeed: number = 0;
        isCollisionDetectionEnabled: boolean = false;
        destroyOnCollision: boolean = false;
        isAccelerationEnabled: boolean = false;
        mass: number = 100;
        destroyed: boolean = false;
        isWrapping: boolean = false;

        game: Game;

        //for now, all entities are round
        radius: number;
        
        
        
        constructor(public pos: Point) {}

        update(dt: number, scene: Scene): void {
            if (this.isAccelerationEnabled) {
                this.vel = this.vel.add(this.acc.multiply(dt));
            }
            
            if (this.rotationSpeed !== 0) {
                this.rotation = (this.rotation + this.rotationSpeed * dt) % (Math.PI * 2);
            }

            this.pos = this.pos.add(this.vel.multiply(dt));
            
            if (this.isWrapping) {
                this.wrap(scene.getSize());
            }
        }

        private wrap(sceneSize: Vector): void {
            // exit right edge
            if (this.pos.x > sceneSize.x) {
                this.pos.x -= sceneSize.x;
            }

            // exit left edge
            if (this.pos.x < 0) {
                this.pos.x += sceneSize.x;
            }

            // exit top
            if (this.pos.y < 0) {
                this.pos.y += sceneSize.y;
            }

            // exit bottom
            if (this.pos.y > sceneSize.y) {
                this.pos.y -= sceneSize.y;
            }
        }

        collideWith(other: Actor): void {
            if (this.destroyOnCollision) {
                this.destroyed = true;
            }
         }

        abstract render(camera: Camera): void;
    }
}