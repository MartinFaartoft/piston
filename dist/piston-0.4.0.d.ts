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
        rotation: number;
        rotationSpeed: number;
        isCollisionDetectionEnabled: boolean;
        isAccelerationEnabled: boolean;
        mass: number;
        destroyed: boolean;
        isWrapping: boolean;
        engine: Engine;
        radius: number;
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
        vectorTo(p: Point): Vector;
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
        coordConverter: CoordConverter;
        pos: Point;
        isLeftButtonDown: boolean;
        isRightButtonDown: boolean;
        isMiddleButtonDown: boolean;
        private mouseMoveDelegate;
        private mouseDownDelegate;
        private mouseUpDelegate;
        constructor(canvas: HTMLCanvasElement, coordConverter: CoordConverter);
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
    interface CoordConverter {
        toCameraCoords(p: Point): Point;
        toGameCoords(p: Point): Point;
    }
    class DefaultCoordConverter implements CoordConverter {
        dims: Vector;
        constructor(dims: Vector);
        toCameraCoords(p: Point): Point;
        toGameCoords(p: Point): Point;
    }
}
declare namespace ps {
    class Camera {
        dims: Vector;
        ctx: CanvasRenderingContext2D;
        coordConverter: CoordConverter;
        backgroundColor: string;
        resourceManager: ResourceManager;
        constructor(dims: Vector, ctx: CanvasRenderingContext2D, coordConverter: CoordConverter);
        fillCircle(entity: Entity, radius: number, color: string): void;
        fillArc(entity: Entity, radius: number, startAngle: number, endAngle: number, counterClockWise: boolean, color: string): void;
        fillRect(entity: Entity, width: number, height: number, color: string): void;
        drawLine(start: Point, end: Point, lineWidth: number, color: string): void;
        paintSprites(entity: Entity, sprites: Sprite[]): void;
        paintSprite(sprite: Sprite, pos: Point, size: number[], rotation: number): void;
        scale(n: number): number;
        render(entities: Entity[]): void;
        private clear();
        private paintWhileRotated(center, rotation, paintDelegate);
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
        isReady(): boolean;
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
        private resourceManager;
        private resources;
        constructor(dims: Vector, canvas: HTMLCanvasElement, mouse: input.Mouse, keyboard: input.Keyboard, animator: AnimationFrameProvider, camera: Camera);
        registerEntity(...entities: Entity[]): void;
        run(): void;
        preloadResources(...resources: string[]): void;
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
