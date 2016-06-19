/// <reference path="jasmine.d.ts" />

/// <reference path="../main/engine.ts" />
/// <reference path="../main/animationframeprovider.ts" />

/// <reference path="../main/entity.ts" />
/// <reference path="../main/point.ts" />



namespace EngineTest {
    class MockBaseGameState extends ps.BaseGameState {
        dimensions: ps.Vector;
        render() {}
        update() {}
    }

    class InMemoryAnimator implements ps.AnimationFrameProvider {

        constructor(public framesToAnimate: number) {}

        animate(runnable: ps.Runnable) {
            if (this.framesToAnimate-- > 0) {
                runnable.run();
            }
        }
    }

    class MockEntity extends ps.Entity {
        render() {}
    }
    
    let mockState = new MockBaseGameState(new ps.Vector(0, 0));

    describe("An engine", () => {
        it("should be possible to register an Entity", () => {
            let engine = new ps.Engine(mockState, null, false, new InMemoryAnimator(1));
            engine.registerEntity(new MockEntity(new ps.Point(0, 0), new ps.Vector(0, 0), 0));
        });
    });
}