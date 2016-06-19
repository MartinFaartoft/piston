/// <reference path="jasmine.d.ts" />
/// <reference path="../main/testexport.ts" />

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

    class Ball extends ps.Entity {
        constructor(pos: ps.Point) {
            super(pos);
            this.isCollisionDetectionEnabled = true;
            this.radius = 10;
        }
        collideWith() {}
        render() {}
    }

    class TestEntity extends ps.Entity {
        render() {}
    }

    describe("An engine running a single main loop", () => {
        let mockCtx = jasmine.createSpyObj("CanvasRenderingContext2D", ["fillRect"]);
        let mockEntity = jasmine.createSpyObj("Entity", ["render", "update", "remove"]);
        let animator = new InMemoryAnimator(1);
        let engine: ps.HeadlessEngine;
        
        
        beforeEach( () => {
            engine = new ps.HeadlessEngine(new ps.Vector(100, 100), mockCtx, animator); 
            engine.registerEntity(mockEntity);
        });

        afterEach( () => {
            animator.reset();
            mockCtx.fillRect.calls.reset();
            mockEntity.update.calls.reset();
            mockEntity.render.calls.reset();
            mockEntity.remove.calls.reset();
            mockEntity.destroyed = false;

            engine.entities = [];
        });
        
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

        it("should set engine on a registered Entity", () => {
            //when
            engine.start();

            //then
            expect(mockEntity.engine).not.toBeNull();
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
        });

        it("should check for collisions between all Collidable entities with collision detection enabled", () => {
            //given
            let engine = new ps.HeadlessEngine(new ps.Vector(100, 100), mockCtx, animator);
            spyOn(engine.collisionDetector, "collides");
            let b1 = new Ball(new ps.Point(0, 0));
            let b2 = new Ball(new ps.Point(20, 20));
            let b3 = new Ball(new ps.Point(40, 40));
            engine.registerEntity(b1, b2, b3);

            //when
            engine.start();

            //then
            expect(engine.collisionDetector.collides).toHaveBeenCalledTimes(3);
            expect(engine.collisionDetector.collides).toHaveBeenCalledWith(b1, b2);
            expect(engine.collisionDetector.collides).toHaveBeenCalledWith(b1, b3);
            expect(engine.collisionDetector.collides).toHaveBeenCalledWith(b2, b3);
        });


        //TODO REFACTOR TO USE NESTED DESCRIBES
        it("should not check collisions with entities with collision detection disabled", () => {
            
        });
        
        it("should call collideWith on colliding entities", () => {
            
        });

        
    });
}