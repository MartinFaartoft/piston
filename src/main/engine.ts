/// <reference path="animationframeprovider.ts" />
/// <reference path="browseranimationframeprovider.ts" />
/// <reference path="collision/collisiondetector.ts" />
/// <reference path="collision/circularcollisiondetector.ts" />
/// <reference path="collision/defertoentitycollisionresolver.ts" />

namespace ps {
    let c = collision;

    export class HeadlessEngine implements Runnable {
        debug: boolean = false;
        backgroundFillStyle: string = "black";
        collisionDetector: collision.CollisionDetector = new collision.CircularCollisionDetector();
        collisionResolver: collision.CollisionResolver = new collision.DeferToEntityCollisionResolver();

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
            this.checkCollisions(this.entities);
            this.render(this.entities);

            this.lastTime = now;

            this.animator.animate(this);
        }

        start() {
            this.animator.animate(this);
        }

        private checkCollisions(entities: Entity[]): void {
            let collisions: collision.Collision[] = this.collisionDetector.findCollisions(entities);
            this.collisionResolver.resolve(collisions);
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