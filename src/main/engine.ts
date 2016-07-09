/// <reference path="animationframeprovider.ts" />
/// <reference path="browseranimationframeprovider.ts" />
/// <reference path="collision/collisiondetector.ts" />
/// <reference path="collision/circularcollisiondetector.ts" />
/// <reference path="collision/defertoentitycollisionresolver.ts" />
/// <reference path="input/keyboard.ts" />
/// <reference path="input/mouse.ts" />
/// <reference path="stopwatch.ts" />
/// <reference path="camera.ts" />
/// <reference path="coordconverter.ts" />
/// <reference path="resourcemanager.ts" />



namespace ps {
    let c = collision;

    export interface EngineExtension {
        setEngine(engine: Engine): void;
    }

    export class HeadlessEngine implements Runnable {
        debug: boolean = false;
        backgroundFillStyle: string = "black";
        collisionDetector: collision.CollisionDetector = new collision.CircularCollisionDetector();
        collisionResolver: collision.CollisionResolver = new collision.DeferToEntityCollisionResolver();
        stopwatch: Stopwatch = new DateNowStopwatch();
        entities: Entity[] = [];
        
        protected isFullScreen: boolean = false;
        
        private resourceManager: ResourceManager = new ResourceManager();
        private resources: string[] = [];

        constructor(public res: Vector,
                    public canvas: HTMLCanvasElement,
                    public mouse: input.Mouse,
                    public keyboard: input.Keyboard,
                    public animator: AnimationFrameProvider,
                    public camera: Camera) {

            this.camera.resourceManager = this.resourceManager;

            if (this.mouse) {
                this.mouse.enable();
            }

            if (this.keyboard) {
                this.keyboard.enable();
            }
        }

        setResolution(res: Vector): void { //todo make internal to camera within resize logic
            this.res = res;
            this.mouse.coordConverter.setResolution(res);
            this.camera.coordConverter.setResolution(res);
        }

        registerEntity(...entities: Entity[]): void {
            for (let entity of entities) {
                entity.engine = this;
                this.entities.push(entity);
            }
        }

        //the main loop of the piston engine
        run() {
            //measure time taken since last frame was processed
            let dt = this.stopwatch.stop();

            //remove all destroyed entities
            this.garbageCollect();

            //update entities
            this.update(dt, this.entities);

            //detect and resolve any collisions between entities
            this.checkCollisions(this.entities);

            //render the frame
            this.camera.render(this.entities);

            //start measuring time since this frame finished
            this.stopwatch.start();

            //request next animation frame
            this.animator.animate(this);
        }

        preloadResources(...resources: string[]): void {
            this.resources = resources;
        }

        start(): void {
            if (this.resources.length > 0) {
                this.resourceManager.onReady(() => { this.animator.animate(this)});
                this.resourceManager.preload(this.resources);
            }
            else {
                this.animator.animate(this);
            }
        }

        private checkCollisions(entities: Entity[]): void {
            let collisions: collision.Collision[] = this.collisionDetector.findCollisions(entities);
            this.collisionResolver.resolve(collisions);
        }

        private update(dt: number, entities: Entity[]): void {
            for (let entity of entities) {
                entity.update(dt, this.res);
            }
        }

        private garbageCollect() {
            this.entities = this.entities.filter(e => !e.destroyed);
        }
    }

    /**
     * Default engine for running in-browser
     */
    export class Engine extends HeadlessEngine {
        constructor(resolution: Vector, 
                    sceneSize: Vector,  
                    canvas: HTMLCanvasElement) {
            super(resolution, 
                  canvas, 
                  new input.Mouse(canvas, new DefaultCoordConverter(resolution)), 
                  new input.Keyboard(document, window), 
                  new BrowserAnimationFrameProvider(),
                  new Camera(canvas, new DefaultCoordConverter(resolution), sceneSize));
        }
    }
}
