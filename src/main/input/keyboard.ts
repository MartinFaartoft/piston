/// <reference path="../point.ts" />

namespace ps.input {
    export class Keyboard {
        private pressedKeys: { [keys: string]: boolean} = {};
        private document: Document;
        private keyDownDelegate: any;
        private keyUpDelegate: any;
        private blurDelegate: any;

        constructor(document: Document, window: Window) {
            this.document = document;

            this.keyDownDelegate = ((e) => this.setKey(e, true)).bind(this);
            this.keyUpDelegate = ((e) => this.setKey(e, false)).bind(this);
            this.blurDelegate = ((e) => this.pressedKeys = {}).bind(this);
        }

        enable() {
            document.addEventListener("keydown", this.keyDownDelegate);
            document.addEventListener("keyup", this.keyUpDelegate);
            window.addEventListener("blur", this.keyUpDelegate);
        }

        disable() {
            document.removeEventListener("keydown", this.keyDownDelegate);
            document.removeEventListener("keyup", this.keyUpDelegate);
            window.removeEventListener("blur", this.keyUpDelegate);
        }
        
        isKeyDown(key: string): boolean {
            return this.pressedKeys[key.toUpperCase()];
        }

        private setKey(event, status) {
            let code = event.keyCode;
            let key;

            switch (code) {
            case 32:
                key = "SPACE"; break;
            case 37:
                key = "LEFT"; break;
            case 38:
                key = "UP"; break;
            case 39:
                key = "RIGHT"; break;
            case 40:
                key = "DOWN"; break;
            default:
                // Convert ASCII codes to letters
                key = String.fromCharCode(code);
            }

            this.pressedKeys[key] = status;
        }
    }
}