/// <reference path="../point.ts" />

namespace ps.input {
    export class Mouse {
        pos: Point = new Point(0, 0);
        isLeftButtonDown: boolean = false;
        isRightButtonDown: boolean = false;
        isMiddleButtonDown: boolean = false;

        private mouseMoveDelegate: any;
        private mouseDownDelegate: any;
        private mouseUpDelegate: any;

        constructor(public canvas: HTMLCanvasElement, public coordinateConverter: CoordinateConverter) {
            this.mouseMoveDelegate = this.onMouseMove.bind(this);
            this.mouseDownDelegate = this.onMouseDown.bind(this);
            this.mouseUpDelegate = this.onMouseUp.bind(this);
        }

        enable() {
            //disable context menu on rightclick, to allow using mouse2
            document.body.oncontextmenu = (e) => { return false; };

            //hide system cursor when mouse is over canvas
            this.canvas.style.cursor = "none";

            this.canvas.addEventListener("mousemove", this.mouseMoveDelegate,  false);
            this.canvas.addEventListener("mousedown", this.mouseDownDelegate, false);
            this.canvas.addEventListener("mouseup", this.mouseUpDelegate, false);
        }

        disable() {
            document.body.oncontextmenu = (e) => { return true; };
            this.canvas.style.cursor = "default";

            this.canvas.removeEventListener("mousemove", this.mouseMoveDelegate,  false);
            this.canvas.removeEventListener("mousedown", this.mouseDownDelegate, false);
            this.canvas.removeEventListener("mouseup", this.mouseUpDelegate, false);
        }

        setCustomCursor(url: string, hotspot: Point) {
            this.canvas.style.cursor = "url(" + url + ") " + hotspot.x + " " + hotspot.y + ", auto";
        }

        private onMouseMove(e: MouseEvent) {
            let newPos = new Point(e.clientX, e.clientY);
            this.pos = this.coordinateConverter.convertCameraCoordsToGameCoords(newPos.subtract(this.findPos(this.canvas)));
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