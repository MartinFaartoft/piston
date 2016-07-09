/// <reference path="browseranimationframeprovider.ts" />


namespace ps {
    export class Game {
        engine: Engine;
        private canvas: HTMLCanvasElement;
        
        private resourceManager: ResourceManager = new ResourceManager();
        private resources: string[] = [];

        constructor(canvas: HTMLCanvasElement = null) {
            this.canvas = canvas || this.createCanvas();
            
            let resolution = new Vector(this.canvas.width, this.canvas.height);
            let sceneSize = new Vector(1600, 900);
            let mouse = new input.Mouse(this.canvas, new DefaultCoordConverter(resolution));
            let keyboard = new input.Keyboard(document, window);
            let animator = new BrowserAnimationFrameProvider();
            let camera = new Camera(this.canvas, this.resourceManager, new DefaultCoordConverter(resolution), sceneSize);

            this.engine = new Engine(resolution, this.canvas, mouse, keyboard, animator, camera);
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