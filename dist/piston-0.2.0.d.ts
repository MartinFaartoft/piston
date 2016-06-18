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
    }
}
declare namespace ps {
    abstract class BaseGameState {
        dimensions: Vector;
        constructor(dimensions: Vector);
        abstract update(dt: number): any;
        abstract render(ctx: CanvasRenderingContext2D): any;
    }
}
declare namespace ps {
    class Engine {
        state: BaseGameState;
        ctx: CanvasRenderingContext2D;
        debug: boolean;
        lastTime: number;
        constructor(state: BaseGameState, ctx: CanvasRenderingContext2D, debug: boolean);
        run(): void;
        private requestAnimationFrame;
    }
}
declare namespace ps {
    abstract class Entity {
        pos: Point;
        speed: Vector;
        radius: number;
        destroyed: boolean;
        isWrapping: boolean;
        constructor(pos: Point, speed: Vector, radius: number);
        update(dt: number, state: BaseGameState): void;
        private wrap(dimensions);
        getWrappedBoundingCircles(dimensions: Vector): any[];
        abstract render(ctx: CanvasRenderingContext2D, state: BaseGameState): any;
    }
}
declare namespace ps {
    class Point {
        x: number;
        y: number;
        constructor(x: number, y: number);
        add(v: Vector): Point;
        distanceTo(p: Point): number;
    }
}
declare namespace ps {
    class Sprite {
        spriteSheetCoordinates: Point;
        spriteSize: number[];
        frames: number[];
        speed: number;
        url: string;
        index: number;
        constructor(spriteSheetCoordinates: Point, spriteSize: number[], frames: number[], speed: number, url: string);
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
        speed: Vector;
        radius: number;
        mass: number;
        collideWith(other: Collidable, state: BaseGameState): any;
    }
}
declare namespace ps {
    function detectCircularCollision(a: Collidable, b: Collidable, state: BaseGameState): boolean;
}
