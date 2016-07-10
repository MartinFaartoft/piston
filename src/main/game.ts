/// <reference path="browseranimationframeprovider.ts" />
/// <reference path="defaultscene.ts" />
/// <reference path="input/mouse.ts" />
/// <reference path="input/keyboard.ts" />

namespace ps {
    export class Game {
        engine: Engine;
        mouse: input.Mouse;
        keyboard: input.Keyboard;
        camera: Camera;

        private canvas: HTMLCanvasElement;
        private resourceManager: ResourceManager = new ResourceManager();
        private resources: string[] = [];

        constructor(canvas: HTMLCanvasElement = null, public scene: Scene = null) {
            this.canvas = canvas || this.createCanvas();
            
            let resolution = new Vector(this.canvas.width, this.canvas.height);

            this.scene = scene || new DefaultScene(resolution.clone());
            this.scene.setGame(this);

            this.camera = new Camera(this.canvas, 
                                    this.resourceManager, 
                                    new DefaultCoordConverter(resolution.clone()), 
                                    this.scene.getSize(),
                                    resolution.clone(),
                                    new Point(0, 0));

            this.mouse = new input.Mouse(this.camera);
            this.mouse.enable();
            
            this.keyboard = new input.Keyboard(document, window);
            this.keyboard.enable();

            this.engine = new Engine(new BrowserAnimationFrameProvider(), this.camera, this.scene);
        }

        start(): void {
            if (this.resources.length > 0) {
                this.resourceManager.onReady(() => { this.engine.start() });
                this.resourceManager.preload(this.resources);
            }
            else {
                this.engine.start();
            }
        }

        loadResources(...resources: string[]): void {
            this.resources = this.resources.concat(resources);
        }

        setResolution(resolution: Vector): void { //todo make internal to camera within resize logic
            this.camera.coordConverter.setResolution(resolution);
        }

        private createCanvas(): HTMLCanvasElement {
            let canvas = document.createElement("canvas");
            let resolution = this.getMaxCanvasSize(window.innerWidth, window.innerHeight, this.getAspectRatio());
            canvas.width = resolution.x;
            canvas.height = resolution.y;

            document.body.appendChild(canvas);
            document.body.style.margin = "0";
            
            return canvas;
        }

        private getAspectRatio(): number {
            return screen.width / screen.height;
        }

        private getMaxCanvasSize(windowWidth: number, windowHeight: number, aspectRatio: number): Vector {
            let desiredHeight = windowWidth / aspectRatio;
            let canvasHeight = Math.min(desiredHeight, windowHeight);
            let canvasWidth = canvasHeight * aspectRatio;

            return new Vector(canvasWidth, canvasHeight);
        }
    }
}