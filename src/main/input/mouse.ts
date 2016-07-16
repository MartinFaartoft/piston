/// <reference path="../point.ts" />

namespace ps.input {
    export class Mouse {
        private positionOnCanvas: Point = new Point(0, 0);
        isLeftButtonDown: boolean = false;
        isRightButtonDown: boolean = false;
        isMiddleButtonDown: boolean = false;

        private camera: Camera;
        private canvas: HTMLCanvasElement;

        private mouseMoveDelegate: any;
        private mouseMoveListeners: ((Point) => void)[] = [];

        private mouseDownDelegate: any;
        private mouseDownListeners: ((p: Point, button: number) => void)[] = [];
        
        private mouseUpDelegate: any;
        private mouseUpListeners: ((p: Point, button: number) => void)[] = [];

        private mouseWheelDelegate: any;
        private mouseWheelListeners: ((deltaX: number, deltaY: number) => void)[] = [];

        constructor(camera: Camera) {
            this.camera = camera;
            this.canvas = camera.canvas;
            
            this.mouseMoveDelegate = this.onMouseMove.bind(this);
            this.mouseDownDelegate = this.onMouseDown.bind(this);
            this.mouseUpDelegate = this.onMouseUp.bind(this);
            this.mouseWheelDelegate = this.onMouseWheel.bind(this);
        }

        enable() {
            //disable context menu on rightclick, to allow using mouse2
            document.body.oncontextmenu = (e) => { return false; };

            //hide system cursor when mouse is over canvas
            this.canvas.style.cursor = "none";

            this.canvas.addEventListener("mousemove", this.mouseMoveDelegate,  false);
            this.canvas.addEventListener("mousedown", this.mouseDownDelegate, false);
            this.canvas.addEventListener("mouseup", this.mouseUpDelegate, false);
            this.canvas.addEventListener("wheel", this.mouseWheelDelegate, false);
        }

        disable() {
            document.body.oncontextmenu = (e) => { return true; };
            this.canvas.style.cursor = "default";

            this.canvas.removeEventListener("mousemove", this.mouseMoveDelegate,  false);
            this.canvas.removeEventListener("mousedown", this.mouseDownDelegate, false);
            this.canvas.removeEventListener("mouseup", this.mouseUpDelegate, false);
            this.canvas.removeEventListener("wheel", this.mouseWheelDelegate, false);
        }

        setCustomCursor(url: string, hotspot: Point) {
            this.canvas.style.cursor = "url(" + url + ") " + hotspot.x + " " + hotspot.y + ", auto";
        }

        addMouseMoveEventListener(action: (p: Point) => void): void {
            this.mouseMoveListeners.push(action);
        }

        getPosition(): Point {
            return this.camera.toGameCoords(this.positionOnCanvas);
        }

        private onMouseMove(e: MouseEvent) {
            let newPos = new Point(e.clientX, e.clientY);
            this.positionOnCanvas = newPos.subtract(this.findPos(this.canvas));

            for (let listener of this.mouseMoveListeners) {
                listener(this.getPosition());
            }
        }

        public addMouseDownEventListener(action: (p: Point, button: number) => void): void {
            this.mouseDownListeners.push(action);
        }

        private onMouseDown(e: MouseEvent) {
            e.stopImmediatePropagation();
            if (e.button === 0) {
                this.isLeftButtonDown = true;
            } else if (e.button === 1) {
                this.isRightButtonDown = true;
            } else if (e.button === 2) {
                this.isMiddleButtonDown = true;
            }

            for (let listener of this.mouseDownListeners) {
                listener(this.positionOnCanvas, e.button);
            }
        }

        public addMouseUpEventListener(action: (Point, MouseEvent) => void): void {
            this.mouseUpListeners.push(action);
        }
        
        private onMouseUp(e: MouseEvent) {
            e.stopImmediatePropagation();
            if (e.button === 0) {
                this.isLeftButtonDown = false;
            } else if (e.button === 1) {
                this.isRightButtonDown = false;
            } else if (e.button === 2) {
                this.isMiddleButtonDown = false;
            }

            for (let listener of this.mouseUpListeners) {
                listener(this.positionOnCanvas, e.button);
            }
        }

        public addMouseWheelEventListener(action: (deltaX: number, deltaY: number) => void): void {
            this.mouseWheelListeners.push(action);
        }

        private onMouseWheel(e: WheelEvent): void {
            e.stopImmediatePropagation();
            e.preventDefault();

            for (let listener of this.mouseWheelListeners) {
                listener(e.deltaX, e.deltaY);
            }
        }

        // Find out where an element is on the page
        // From http://www.quirksmode.org/js/findpos.html
        private findPos(obj) {
            let curleft = 0, curtop = 0;
            if (obj.offsetParent) {
                do {
                    curleft += obj.offsetLeft;
                    curtop += obj.offsetTop;
                } while (obj = obj.offsetParent);
            }
            return new Point(curleft, curtop);
        }
    }
}