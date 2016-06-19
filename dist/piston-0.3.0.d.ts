declare namespace ps {
    interface Runnable {
        run(): any;
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
        lastTime: number;
        entities: Entity[];
        constructor(dims: Vector, ctx: CanvasRenderingContext2D, animator: AnimationFrameProvider);
        registerEntity(entity: Entity): void;
        run(): void;
        start(): void;
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
        abstract render(ctx: CanvasRenderingContext2D): any;
    }
}
declare namespace ps {
    class ResourceManager {
        cache: {};
        readyCallbacks: any[];
        preload(urls: string[]): void;
        get(url: string): any;
        onReady(callback: any): void;
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
        update(dt: any, state: any): void;
    }
}
declare namespace ps {
    function isKeyDown(key: string): any;
}
declare namespace ps {
    interface Collidable {
        pos: Point;
        radius: number;
        mass: number;
        collideWith(other: Collidable): any;
    }
}
declare namespace ps {
    function detectCircularCollision(a: Collidable, b: Collidable): boolean;
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