/// <reference path="runnable.ts" />

namespace ps {
    export interface AnimationFrameProvider {
        animate(runnable: Runnable): void;
    }
}