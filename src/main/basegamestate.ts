/// <reference path="resourcemanager.ts" />
/// <reference path="vector.ts" />


namespace ps {
    export abstract class BaseGameState {
        
        constructor(public dimensions: Vector) {}
        
        abstract update(dt: number);
        abstract render(ctx: CanvasRenderingContext2D);
    }
}