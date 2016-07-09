/// <reference path="animationframeprovider.ts" />
/// <reference path="collision/collisiondetector.ts" />
/// <reference path="collision/circularcollisiondetector.ts" />
/// <reference path="collision/defertoactorcollisionresolver.ts" />
/// <reference path="stopwatch.ts" />
/// <reference path="camera.ts" />

namespace ps {
    let c = collision;

    export class Engine implements Runnable {
        collisionDetector: collision.CollisionDetector = new c.CircularCollisionDetector();
        collisionResolver: collision.CollisionResolver = new c.DeferToActorCollisionResolver();
        stopwatch: Stopwatch = new DateNowStopwatch();
        
        constructor(public animator: AnimationFrameProvider, public camera: Camera, public scene: Scene) {}

        //the main loop of the piston engine
        run() {
            //measure time taken since last frame was processed
            let dt = this.stopwatch.stop();

            //remove all destroyed entities
            this.scene.garbageCollect();

            //update entities
            this.scene.update(dt);

            //detect and resolve any collisions between entities
            this.checkCollisions(this.scene.getActors());

            //render the frame
            this.camera.render(this.scene);

            //start measuring time since this frame finished
            this.stopwatch.start();

            //request next animation frame
            this.animator.animate(this);
        }

        start() {
            this.animator.animate(this);
        }
        
        private checkCollisions(entities: Actor[]): void {
            let collisions: collision.Collision[] = this.collisionDetector.findCollisions(entities);
            this.collisionResolver.resolve(collisions);
        }
    }
}
