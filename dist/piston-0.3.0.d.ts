declare namespace ps {
    interface Runnable {
        run(): void;
    }
}
declare namespace ps {
    interface AnimationFrameProvider {
        animate(runnable: Runnable): void;
    }
}
declare namespace ps {
    class BrowserAnimationFrameProvider {
        animate(runnable: Runnable): void;
        private requestAnimationFrame;
    }
}
declare namespace ps {
    class HeadlessEngine implements Runnable {
        dims: Vector;
        ctx: CanvasRenderingContext2D;
        animator: AnimationFrameProvider;
        debug: boolean;
        backgroundFillStyle: string;
        collisionDetector: CollisionDetector;
        lastTime: number;
        entities: Entity[];
        constructor(dims: Vector, ctx: CanvasRenderingContext2D, animator: AnimationFrameProvider);
        registerEntity(...entities: Entity[]): void;
        run(): void;
        start(): void;
        private getCollidables(entities);
        private checkCollisions(collidables);
        private update(dt, entities);
        private render(entities);
        private clearFrame(ctx);
        private garbageCollect();
    }
    /**
     * Default engine for running in-browser
     */
    class Engine extends HeadlessEngine {
        constructor(dims: Vector, ctx: CanvasRenderingContext2D);
    }
}
declare namespace ps {
    abstract class Entity {
        pos: Point;
        vel: Vector;
        acc: Vector;
        mass: number;
        destroyed: boolean;
        isWrapping: boolean;
        private engine;
        constructor(pos: Point);
        update(dt: number, dims: Vector): void;
        private wrap(dimensions);
        abstract render(ctx: CanvasRenderingContext2D): void;
    }
}
declare namespace ps {
    class ResourceManager {
        private cache;
        private readyCallbacks;
        preload(urls: string[]): void;
        get(url: string): HTMLImageElement;
        onReady(callback: {
            (): void;
        }): void;
        private isReady();
    }
}
declare namespace ps {
    class Point {
        x: number;
        y: number;
        constructor(x: number, y: number);
        add(v: Vector): Point;
        distanceTo(p: Point): number;
        toVector(): Vector;
    }
}
declare namespace ps {
    class Sprite {
        spriteSheetCoordinates: Point;
        spriteSize: number[];
        frames: number[];
        animationSpeed: number;
        url: string;
        index: number;
        constructor(spriteSheetCoordinates: Point, spriteSize: number[], frames: number[], animationSpeed: number, url: string);
        update(dt: number): void;
        render(ctx: CanvasRenderingContext2D, resourceManager: ResourceManager, pos: Point, size: number[], rotation: number): void;
    }
}
declare namespace ps {
    abstract class EntityWithSprites extends Entity {
        sprites: Sprite[];
        update(dt: number, dims: Vector): void;
    }
}
declare namespace ps {
    function isKeyDown(key: string): boolean;
}
declare namespace ps {
    interface Collidable {
        pos: Point;
        radius: number;
        collideWith(other: Collidable): void;
    }
    class Collision {
        a: Collidable;
        b: Collidable;
        constructor(a: Collidable, b: Collidable);
    }
}
declare namespace ps {
    interface CollisionDetector {
        collides(a: Collidable, b: Collidable): any;
    }
    class CircularCollisionDetector implements CollisionDetector {
        collides(a: Collidable, b: Collidable): boolean;
    }
}
declare namespace ps {
    class Vector {
        x: number;
        y: number;
        constructor(x: number, y: number);
        add(v: Vector): Vector;
        subtract(v: Vector): Vector;
        multiply(scalar: number): Vector;
        magnitude(): number;
        unit(): Vector;
        tangent(): Vector;
        dot(v: Vector): number;
        toPoint(): Point;
    }
}
declare namespace ps {
    abstract class RoundEntity extends Entity {
        radius: number;
        constructor(pos: Point, radius: number);
    }
}
