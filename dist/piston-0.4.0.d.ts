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
        destroyOnCollision: boolean;
        isAccelerationEnabled: boolean;
        mass: number;
        destroyed: boolean;
        isWrapping: boolean;
        engine: Engine;
        radius: number;
        constructor(pos: Point);
        update(dt: number, resolution: Vector): void;
        private wrap(resolution);
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
        private mouseMoveListeners;
        private mouseDownDelegate;
        private mouseDownListeners;
        private mouseUpDelegate;
        private mouseUpListeners;
        constructor(canvas: HTMLCanvasElement, coordConverter: CoordConverter);
        enable(): void;
        disable(): void;
        setCustomCursor(url: string, hotspot: Point): void;
        addMouseMoveEventListener(action: (p: Point) => void): void;
        private onMouseMove(e);
        addMouseDownEventListener(action: (p: Point, button: number) => void): void;
        private onMouseDown(e);
        addMouseUpEventListener(action: (Point, MouseEvent) => void): void;
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
        setResolution(res: Vector): void;
    }
    class DefaultCoordConverter implements CoordConverter {
        resolution: Vector;
        constructor(resolution: Vector);
        toCameraCoords(p: Point): Point;
        toGameCoords(p: Point): Point;
        setResolution(resolution: Vector): void;
    }
}
declare namespace ps {
    class Camera {
        coordConverter: CoordConverter;
        sceneSize: Vector;
        backgroundColor: string;
        resourceManager: ResourceManager;
        private canvas;
        private ctx;
        constructor(canvas: HTMLCanvasElement, coordConverter: CoordConverter, sceneSize: Vector);
        fillCircle(pos: Point, radius: number, color: string): void;
        fillArc(pos: Point, rotation: number, radius: number, startAngle: number, endAngle: number, counterClockWise: boolean, color: string): void;
        fillRect(pos: Point, rotation: number, width: number, height: number, color: string): void;
        drawLine(start: Point, end: Point, lineWidth: number, color: string): void;
        paintSprite(pos: Point, rotation: number, size: number[], sprite: Sprite): void;
        paintSprites(pos: Point, rotation: number, size: number[], sprites: Sprite[]): void;
        private paintSpriteInternal(sprite, pos, size, rotation);
        scale(n: number): number;
        render(entities: Entity[]): void;
        toggleFullScreen(): void;
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
    interface EngineExtension {
        setEngine(engine: Engine): void;
    }
    class HeadlessEngine implements Runnable {
        res: Vector;
        canvas: HTMLCanvasElement;
        mouse: input.Mouse;
        keyboard: input.Keyboard;
        animator: AnimationFrameProvider;
        camera: Camera;
        debug: boolean;
        backgroundFillStyle: string;
        collisionDetector: collision.CollisionDetector;
        collisionResolver: collision.CollisionResolver;
        stopwatch: Stopwatch;
        entities: Entity[];
        protected isFullScreen: boolean;
        private resourceManager;
        private resources;
        constructor(res: Vector, canvas: HTMLCanvasElement, mouse: input.Mouse, keyboard: input.Keyboard, animator: AnimationFrameProvider, camera: Camera);
        setResolution(res: Vector): void;
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
        constructor(resolution: Vector, sceneSize: Vector, canvas: HTMLCanvasElement);
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
        update(dt: number, resolution: Vector): void;
    }
}
