/// <reference path="basegamestate.ts" />
/// <reference path="animationframeprovider.ts" />
/// <reference path="browseranimationframeprovider.ts" />


namespace ps {
    export class Engine implements Runnable {
        lastTime: number = Date.now();

        constructor(public state: BaseGameState, public ctx: CanvasRenderingContext2D, public debug: boolean, public animator: AnimationFrameProvider) { }

        registerEntity(entity: Entity): void {

        }

        run() {
            let now = Date.now();
            let dt = (now - this.lastTime) / 1000.0;

            this.state.update(dt);
            this.state.render(this.ctx);
            this.lastTime = now;
            this.animator.animate(this);
        }
    }

    export class BrowserEngine extends Engine {

        constructor(state: BaseGameState, ctx: CanvasRenderingContext2D, debug: boolean) {
            super(state, ctx, debug, new BrowserAnimationFrameProvider());
        }
    }
}