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

    class FakeStopwatch implements ps.Stopwatch {
        constructor(public timeElapsed: number = 0) {}

        start() {}
        stop() { return this.timeElapsed; }
    }

    class Ball extends ps.Actor {
        constructor(pos: ps.Point) {
            super(pos);
            this.isCollisionDetectionEnabled = true;
            this.radius = 20;
        }

        render() { }
    }

    class TestActor extends ps.Actor {
        render() { }
    }

    describe("An engine running a single main loop", () => {
        let gameMock: any;
        let animator: InMemoryAnimator;
        let engine: ps.Engine;
        let cameraMock: ps.Camera;
        let scene: ps.DefaultScene;
        let timeElapsed = 123;
        let stopWatch = new FakeStopwatch(timeElapsed);

        beforeEach(() => {
            gameMock = null;
            cameraMock = jasmine.createSpyObj("Camera", ["render"]);
            animator = new InMemoryAnimator(1);
            scene = new ps.DefaultScene(new ps.Vector(100, 100));
            scene.setGame(gameMock);
            engine = new ps.Engine(animator, cameraMock, scene);
            engine.stopwatch = stopWatch;
        });

        describe("with a registered actor", () => {
            let mockActor: any;

            beforeEach(() => {
                mockActor = jasmine.createSpyObj("Actor", ["render", "update", "remove"]);
                scene.addActors(mockActor);
            });

            it("should call update on a registered actor with correct parameters", () => {
                //when
                engine.start();

                //then
                expect(mockActor.update).toHaveBeenCalledWith(timeElapsed, scene);
            });

            it("should call render on camera", () => {
                //when
                engine.start();

                //then
                expect(cameraMock.render).toHaveBeenCalledTimes(1);
            });

            it("should not call update on a destroyed actor", () => {
                //given
                mockActor.destroyed = true;

                //when
                engine.start();

                //then
                expect(mockActor.update).not.toHaveBeenCalled();
            });
        });

        describe("with multiple registered actors", () => {
            let b1: Ball, b2: Ball, b3: Ball;
            
            beforeEach(() => {
                b1 = new Ball(new ps.Point(0, 0));
                b2 = new Ball(new ps.Point(10, 10));
                b3 = new Ball(new ps.Point(40, 40));
                scene.addActors(b1, b2, b3);
            });
            
            it("should check for collisions between all Collidable actors with collision detection enabled", () => {
                //given
                spyOn(engine.collisionDetector, "collides");
                
                //when
                engine.start();

                //then
                expect(engine.collisionDetector.collides).toHaveBeenCalledTimes(3);
                expect(engine.collisionDetector.collides).toHaveBeenCalledWith(b1, b2);
                expect(engine.collisionDetector.collides).toHaveBeenCalledWith(b1, b3);
                expect(engine.collisionDetector.collides).toHaveBeenCalledWith(b2, b3);
            });

            it("should not check collisions with actors with collision detection disabled", () => {
                //given
                spyOn(engine.collisionDetector, "collides");
                b3.isCollisionDetectionEnabled = false;
                
                //when
                engine.start();

                //then
                expect(engine.collisionDetector.collides).not.toHaveBeenCalledWith(b1, b3);
            });

            it("should call collideWith on colliding actors", () => {
                //given
                spyOn(b1, "collideWith");
                spyOn(b2, "collideWith");
                
                //when
                engine.start();

                //then
                expect(b1.collideWith).toHaveBeenCalledWith(b2);
                expect(b2.collideWith).toHaveBeenCalledWith(b1);
            });

            it("should destroy colliding actors if destroyOnCollision is true", () => {
                //given
                b1.destroyOnCollision = true;
                
                //when
                engine.start();

                //then
                expect(b1.destroyed).toBe(true);
                expect(b2.destroyed).toBe(false);
            });
        });
    });
}