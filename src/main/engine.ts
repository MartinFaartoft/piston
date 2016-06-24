/// <reference path="animationframeprovider.ts" />
/// <reference path="browseranimationframeprovider.ts" />
/// <reference path="collision/collisiondetector.ts" />
/// <reference path="collision/circularcollisiondetector.ts" />
/// <reference path="collision/defertoentitycollisionresolver.ts" />
/// <reference path="input/keyboard.ts" />
/// <reference path="input/mouse.ts" />
/// <reference path="stopwatch.ts" />


namespace ps {
    let c = collision;

    export class HeadlessEngine implements Runnable {
        ctx: CanvasRenderingContext2D;
        debug: boolean = false;
        backgroundFillStyle: string = "black";
        collisionDetector: collision.CollisionDetector = new collision.CircularCollisionDetector();
        collisionResolver: collision.CollisionResolver = new collision.DeferToEntityCollisionResolver();
        stopwatch: Stopwatch = new DateNowStopwatch();
        entities: Entity[] = [];
        
        constructor(public dims: Vector, 
                    public canvas: HTMLCanvasElement, 
                    public mouse: input.Mouse,
                    public keyboard: input.Keyboard,
                    public animator: AnimationFrameProvider) {
            
            this.ctx = canvas.getContext("2d");

            if (this.mouse) {
                this.mouse.enable();
            }

            if (this.keyboard) {
                this.keyboard.enable();
            }
        }

        registerEntity(...entities: Entity[]): void {
            for (let entity of entities) {
                this.entities.push(entity);
            }
        }

        run() {
            let now = Date.now();
            let dt = this.stopwatch.stop();

            this.garbageCollect();
            this.update(dt, this.entities);
            this.checkCollisions(this.entities);
            this.render(this.entities);

            this.stopwatch.start();

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
        constructor(dims: Vector, canvas: HTMLCanvasElement) {
            super(dims, canvas, new input.Mouse(canvas), new input.Keyboard(document, window), new BrowserAnimationFrameProvider());
        }
    }
}