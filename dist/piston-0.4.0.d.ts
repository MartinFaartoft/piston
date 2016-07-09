declare namespace ps {
    interface Runnable {
        run(): void;
    }
}
declare namespace ps {
    class BrowserAnimationFrameProvider {
        animate(runnable: Runnable): void;
        private requestAnimationFrame;
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
    interface Scene {
        update(dt: number): void;
        getActors(): Actor[];
        garbageCollect(): void;
        getSize(): Vector;
        addActors(...actors: Actor[]): void;
    }
}
declare namespace ps {
    abstract class Actor {
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
        game: Game;
        radius: number;
        constructor(pos: Point);
        update(dt: number, scene: Scene): void;
        private wrap(sceneSize);
        collideWith(other: Actor): void;
        abstract render(camera: Camera): void;
    }
}
declare namespace ps {
    class DefaultScene implements Scene {
        game: Game;
        size: Vector;
        private actors;
        constructor(game: Game, size: Vector);
        update(dt: number): void;
        addActors(...actors: Actor[]): void;
        getActors(): Actor[];
        garbageCollect(): void;
        getSize(): Vector;
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
declare namespace ps {
    class Game {
        scene: Scene;
        engine: Engine;
        mouse: input.Mouse;
        keyboard: input.Keyboard;
        private canvas;
        private resolution;
        private resourceManager;
        private resources;
        constructor(canvas?: HTMLCanvasElement, scene?: Scene);
        start(): void;
        loadResources(...resources: string[]): void;
        setResolution(resolution: Vector): void;
        private createEngine();
        private createCanvas();
        private getAspectRatio();
        private getMaxCanvasSize(windowWidth, windowHeight, aspectRatio);
    }
}
declare namespace ps {
    interface AnimationFrameProvider {
        animate(runnable: Runnable): void;
    }
}
declare namespace ps.collision {
    class Collision {
        entities: Actor[];
        constructor(...entities: Actor[]);
    }
}
declare namespace ps.collision {
    interface CollisionDetector {
        findCollisions(entities: Actor[]): Collision[];
        collides(a: Actor, b: Actor): any;
    }
}
declare namespace ps.collision {
    class CircularCollisionDetector implements CollisionDetector {
        findCollisions(entities: Actor[]): Collision[];
        collides(a: Actor, b: Actor): boolean;
        private getCollisionEnabledEntities(entities);
    }
}
declare namespace ps.collision {
    interface CollisionResolver {
        resolve(collisions: Collision[]): void;
    }
}
declare namespace ps.collision {
    class DeferToActorCollisionResolver implements CollisionResolver {
        resolve(collisions: Collision[]): void;
        private resolveSingleCollision(collision);
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
        resourceManager: ResourceManager;
        coordConverter: CoordConverter;
        sceneSize: Vector;
        backgroundColor: string;
        private canvas;
        private ctx;
        constructor(canvas: HTMLCanvasElement, resourceManager: ResourceManager, coordConverter: CoordConverter, sceneSize: Vector);
        fillCircle(pos: Point, radius: number, color: string): void;
        fillArc(pos: Point, rotation: number, radius: number, startAngle: number, endAngle: number, counterClockWise: boolean, color: string): void;
        fillRect(pos: Point, rotation: number, width: number, height: number, color: string): void;
        drawLine(start: Point, end: Point, lineWidth: number, color: string): void;
        paintSprite(pos: Point, rotation: number, size: number[], sprite: Sprite): void;
        paintSprites(pos: Point, rotation: number, size: number[], sprites: Sprite[]): void;
        private paintSpriteInternal(sprite, pos, size, rotation);
        scale(n: number): number;
        render(scene: Scene): void;
        toggleFullScreen(): void;
        private clear();
        private paintWhileRotated(center, rotation, paintDelegate);
    }
}
declare namespace ps {
    class Engine implements Runnable {
        animator: AnimationFrameProvider;
        camera: Camera;
        scene: Scene;
        collisionDetector: collision.CollisionDetector;
        collisionResolver: collision.CollisionResolver;
        stopwatch: Stopwatch;
        constructor(animator: AnimationFrameProvider, camera: Camera, scene: Scene);
        run(): void;
        start(): void;
        private checkCollisions(entities);
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
    abstract class ActorWithSprites extends Actor {
        sprites: Sprite[];
        update(dt: number, scene: Scene): void;
    }
}
