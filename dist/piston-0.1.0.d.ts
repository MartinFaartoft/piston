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
    abstract class BaseGameState {
        dimensions: number[];
        constructor(dimensions: number[]);
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
        pos: number[];
        speed: number[];
        radius: number;
        destroyed: boolean;
        constructor(pos: number[], speed: number[], radius: number);
        update(dt: number, state: BaseGameState): void;
        private wrap(dimensions);
        getWrappedBoundingCircles(dimensions: number[]): any[];
        abstract render(ctx: CanvasRenderingContext2D, state: BaseGameState): any;
    }
}
declare namespace ps {
    class Sprite {
        spriteSheetCoordinates: number[];
        spriteSize: number[];
        frames: number[];
        speed: number;
        url: string;
        index: number;
        constructor(spriteSheetCoordinates: number[], spriteSize: number[], frames: number[], speed: number, url: string);
        update(dt: number): void;
        render(ctx: CanvasRenderingContext2D, resourceManager: ResourceManager, pos: number[], size: number[], rotation: number): void;
    }
}
declare namespace ps {
    abstract class EntityWithSprites extends Entity {
        sprites: Sprite[];
        constructor(pos: number[], speed: number[], radius: number);
        update(dt: any, state: any): void;
    }
}
declare namespace ps {
    function isKeyDown(key: string): any;
}
declare namespace ps {
    interface Collidable {
        collideWith(other: Entity, state: BaseGameState): any;
    }
}
