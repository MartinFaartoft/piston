/// <reference path="animationframeprovider.ts" />
/// <reference path="browseranimationframeprovider.ts" />

namespace ps {
    export class HeadlessEngine implements Runnable {
        debug: boolean = false;
        backgroundFillStyle: string = "black";
        collisionDetector: CollisionDetector = new CircularCollisionDetector();

        lastTime: number = Date.now();
        entities: Entity[] = [];
        
        constructor(public dims: Vector, public ctx: CanvasRenderingContext2D, public animator: AnimationFrameProvider) { }

        registerEntity(...entities: Entity[]): void {
            for (let entity of entities) {
                this.entities.push(entity);
            }
        }

        run() {
            let now = Date.now();
            let dt = (now - this.lastTime) / 1000.0;

            this.garbageCollect();
            this.update(dt, this.entities);
            this.checkCollisions(this.getCollidables(this.entities));
            this.render(this.entities);

            this.lastTime = now;

            this.animator.animate(this);
        }

        start() {
            this.animator.animate(this);
        }

        private getCollidables(entities: Entity[]): Collidable[] {
            //nasty reference to "radius" and cast to "any" because TypeScript does not support interface casting
            return entities.filter(e => "radius" in e).map( (e: any) => e as Collidable);
        } 

        private checkCollisions(collidables: Collidable[]): Collision[] {
            let collisions: Collision[] = [];
            for (let i = 0; i < collidables.length - 1; i++) {
                for (let j = i; j < collidables.length; j++) {
                    if (this.collisionDetector.collides(collidables[i], collidables[j])) {
                        collisions.push(new Collision(collidables[i], collidables[j]));
                    }
                }
            }

            return collisions;
        }

        private update(dt: number, entities: Entity[]): void {
            for (let entity of entities) {
                entity.update(dt, this.dims);
            }
        }

        private render(entities: Entity[]): void {
            this.clearFrame(this.ctx);

            for (let entity of entities) {
                entity.render(this.ctx);
            }
        }

        private clearFrame(ctx: CanvasRenderingContext2D) {
            ctx.fillStyle = this.backgroundFillStyle;
            ctx.fillRect(0, 0, this.dims.x, this.dims.y);
        }

        private garbageCollect() {
            this.entities = this.entities.filter(e => !e.destroyed);
        }
    }

    /**
     * Default engine for running in-browser
     */
    export class Engine extends HeadlessEngine {
        constructor(dims: Vector, ctx: CanvasRenderingContext2D) {
            super(dims, ctx, new BrowserAnimationFrameProvider());
        }
    }
}