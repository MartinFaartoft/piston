/// <reference path="resourcemanager.ts" />

namespace ps {
    export abstract class BaseGameState {
        
        constructor(public dimensions: number[]) {}
        
        abstract update(dt: number);
        abstract render(ctx: CanvasRenderingContext2D);
    }
}