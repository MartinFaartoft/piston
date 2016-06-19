/// <reference path="runnable.ts" />

namespace ps {
    export class BrowserAnimationFrameProvider {   
        animate(runnable: Runnable) {
            let f = requestAnimationFrame.call(window, runnable.run.bind(runnable));
        }
    
        // A cross-browser requestAnimationFrame
        // See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
        private requestAnimationFrame = (function(){
                return window.requestAnimationFrame       ||
                    (<any>window).webkitRequestAnimationFrame ||
                    (<any>window).mozRequestAnimationFrame    ||
                    (<any>window).oRequestAnimationFrame      ||
                    (<any>window).msRequestAnimationFrame     ||
                    function(callback){
                        window.setTimeout(callback, 1000 / 60);
                    };
            })();
        }
}