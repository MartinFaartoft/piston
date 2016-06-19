/// <reference path="jasmine.d.ts" />

/// <reference path="../main/engine.ts" />
/// <reference path="../main/animationframeprovider.ts" />
/// <reference path="../main/entity.ts" />
/// <reference path="../main/point.ts" />
/// <reference path="../main/vector.ts" />


namespace EngineTest {
    class InMemoryAnimator implements ps.AnimationFrameProvider {
        initialFrameToAnimate: number;

        constructor(public framesToAnimate: number) {
            this.initialFrameToAnimate = framesToAnimate;
        }

        animate(runnable: ps.Runnable) {
            if (this.framesToAnimate-- > 0) {
                runnable.run();
            }
        }

        reset() {
            this.framesToAnimate = this.initialFrameToAnimate;
        }
    }

    describe("An engine running a single main loop", () => {
        let mockCtx = jasmine.createSpyObj("CanvasRenderingContext2D", ["fillRect"]);
        let mockEntity = jasmine.createSpyObj("Entity", ["render", "update"]);
        let animator = new InMemoryAnimator(1);
        let engine = new ps.HeadlessEngine(new ps.Vector(100, 100), mockCtx, animator);
        engine.registerEntity(mockEntity);
        
        afterEach( () => {
            animator.reset();
            mockCtx.fillRect.calls.reset();
            mockEntity.update.calls.reset();
            mockEntity.render.calls.reset();
            mockEntity.destroyed = false;
        })
        
        it("should call update on a registered Entity", () => {
            //when
            engine.start();

            //then
            expect(mockEntity.update).toHaveBeenCalledTimes(1);
        });

        it("should call render on a registered Entity", () => {
            //when
            engine.start();

            //then
            expect(mockEntity.render).toHaveBeenCalledTimes(1);
        });

        it("shold clear the frame on each render", () => {
            //when
            engine.start();

            //then
            expect(mockCtx.fillRect).toHaveBeenCalledTimes(1);
        });

        it("should not call update on a destroyed entity", () => {
            //given
            mockEntity.destroyed = true;

            //when
            engine.start();

            //then
            expect(mockEntity.update).not.toHaveBeenCalled();
        })
    });
}