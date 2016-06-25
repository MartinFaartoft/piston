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
    abstract class Entity {
        pos: Point;
        vel: Vector;
        acc: Vector;
        isCollisionDetectionEnabled: boolean;
        isAccelerationEnabled: boolean;
        mass: number;
        destroyed: boolean;
        isWrapping: boolean;
        radius: number;
        private engine;
        constructor(pos: Point);
        update(dt: number, dims: Vector): void;
        private wrap(dimensions);
        collideWith(other: Entity): void;
        abstract render(camera: Camera): void;
    }
}
declare namespace ps.collision {
    class Collision {
        entities: Entity[];
        constructor(...entities: Entity[]);
    }
}
declare namespace ps.collision {
    interface CollisionDetector {
        findCollisions(entities: Entity[]): Collision[];
        collides(a: Entity, b: Entity): any;
    }
}
declare namespace ps.collision {
    class CircularCollisionDetector implements CollisionDetector {
        findCollisions(entities: Entity[]): Collision[];
        collides(a: Entity, b: Entity): boolean;
        private getCollisionEnabledEntities(entities);
    }
}
declare namespace ps.collision {
    interface CollisionResolver {
        resolve(collisions: Collision[]): void;
    }
}
declare namespace ps.collision {
    class DeferToEntityCollisionResolver implements CollisionResolver {
        resolve(collisions: Collision[]): void;
        private resolveSingleCollision(collision);
    }
}
declare namespace ps {
    class Point {
        x: number;
        y: number;
        constructor(x: number, y: number);
        add(v: Vector | Point): Point;
        subtract(p: Vector | Point): Point;
        distanceTo(p: Point): number;
        toVector(): Vector;
    }
}
declare namespace ps.input {
    class Keyboard {
        private pressedKeys;
        private document;
        private keyDownDelegate;
        private keyUpDelegate;
        private blurDelegate;
        constructor(document: Document, window: Window);
        enable(): void;
        disable(): void;
        isKeyDown(key: string): boolean;
        private setKey(event, status);
    }
}
declare namespace ps.input {
    class Mouse {
        canvas: HTMLCanvasElement;
        coordinateConverter: CoordinateConverter;
        pos: Point;
        isLeftButtonDown: boolean;
        isRightButtonDown: boolean;
        isMiddleButtonDown: boolean;
        private mouseMoveDelegate;
        private mouseDownDelegate;
        private mouseUpDelegate;
        constructor(canvas: HTMLCanvasElement, coordinateConverter: CoordinateConverter);
        enable(): void;
        disable(): void;
        setCustomCursor(url: string, hotspot: Point): void;
        private onMouseMove(e);
        private onMouseDown(e);
        private onMouseUp(e);
        private findPos(obj);
    }
}
declare namespace ps {
    interface Stopwatch {
        start(): void;
        stop(): number;
    }
    class DateNowStopwatch implements Stopwatch {
        private startTime;
        constructor();
        start(): void;
        stop(): number;
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
    interface CoordinateConverter {
        convertGameCoordsToCameraCoords(p: Point): Point;
        convertCameraCoordsToGameCoords(p: Point): Point;
    }
    class DefaultCoordinateConverter implements CoordinateConverter {
        dims: Vector;
        constructor(dims: Vector);
        convertGameCoordsToCameraCoords(p: Point): Point;
        convertCameraCoordsToGameCoords(p: Point): Point;
    }
}
declare namespace ps {
    class Camera {
        dims: Vector;
        ctx: CanvasRenderingContext2D;
        coordinateConverter: CoordinateConverter;
        backgroundColor: string;
        constructor(dims: Vector, ctx: CanvasRenderingContext2D, coordinateConverter: CoordinateConverter);
        fillCircle(center: Point, radius: number, color: string): void;
        fillRect(bottomLeft: Point, width: number, height: number, color: string): void;
        scale(n: number): number;
        render(entities: Entity[]): void;
        private clear();
    }
}
declare namespace ps {
    class HeadlessEngine implements Runnable {
        dims: Vector;
        canvas: HTMLCanvasElement;
        mouse: input.Mouse;
        keyboard: input.Keyboard;
        animator: AnimationFrameProvider;
        camera: Camera;
        ctx: CanvasRenderingContext2D;
        debug: boolean;
        backgroundFillStyle: string;
        collisionDetector: collision.CollisionDetector;
        collisionResolver: collision.CollisionResolver;
        stopwatch: Stopwatch;
        entities: Entity[];
        constructor(dims: Vector, canvas: HTMLCanvasElement, mouse: input.Mouse, keyboard: input.Keyboard, animator: AnimationFrameProvider, camera: Camera);
        registerEntity(...entities: Entity[]): void;
        run(): void;
        start(): void;
        private checkCollisions(entities);
        private update(dt, entities);
        private garbageCollect();
    }
    /**
     * Default engine for running in-browser
     */
    class Engine extends HeadlessEngine {
        constructor(dims: Vector, canvas: HTMLCanvasElement);
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
