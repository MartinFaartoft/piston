var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="runnable.ts" />
var ps;
(function (ps) {
    var BrowserAnimationFrameProvider = (function () {
        function BrowserAnimationFrameProvider() {
            // A cross-browser requestAnimationFrame
            // See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
            this.requestAnimationFrame = (function () {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function (callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
            })();
        }
        BrowserAnimationFrameProvider.prototype.animate = function (runnable) {
            var f = requestAnimationFrame.call(window, runnable.run.bind(runnable));
        };
        return BrowserAnimationFrameProvider;
    }());
    ps.BrowserAnimationFrameProvider = BrowserAnimationFrameProvider;
})(ps || (ps = {}));
var ps;
(function (ps) {
    var Vector = (function () {
        function Vector(x, y) {
            this.x = x;
            this.y = y;
        }
        Vector.prototype.add = function (v) {
            return new Vector(this.x + v.x, this.y + v.y);
        };
        Vector.prototype.subtract = function (v) {
            return new Vector(this.x - v.x, this.y - v.y);
        };
        Vector.prototype.multiply = function (scalar) {
            return new Vector(this.x * scalar, this.y * scalar);
        };
        Vector.prototype.magnitude = function () {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        };
        Vector.prototype.unit = function () {
            return this.multiply(1 / this.magnitude());
        };
        Vector.prototype.tangent = function () {
            //avoid negative zero complications
            return new Vector(this.y === 0 ? 0 : this.y * -1, this.x);
        };
        Vector.prototype.dot = function (v) {
            return this.x * v.x + this.y * v.y;
        };
        Vector.prototype.toPoint = function () {
            return new ps.Point(this.x, this.y);
        };
        Vector.prototype.clone = function () {
            return new Vector(this.x, this.y);
        };
        return Vector;
    }());
    ps.Vector = Vector;
})(ps || (ps = {}));
/// <reference path="vector.ts" />
/// <reference path="scene.ts" />
/// <reference path="game.ts" />
var ps;
(function (ps) {
    var Actor = (function () {
        function Actor(pos) {
            this.pos = pos;
            this.vel = new ps.Vector(0, 0);
            this.acc = new ps.Vector(0, 0);
            this.rotation = 0;
            this.rotationSpeed = 0;
            this.isCollisionDetectionEnabled = false;
            this.destroyOnCollision = false;
            this.isAccelerationEnabled = false;
            this.mass = 100;
            this.destroyed = false;
            this.isWrapping = false;
        }
        Actor.prototype.update = function (dt, scene) {
            if (this.isAccelerationEnabled) {
                this.vel = this.vel.add(this.acc.multiply(dt));
            }
            if (this.rotationSpeed !== 0) {
                this.rotation = (this.rotation + this.rotationSpeed * dt) % (Math.PI * 2);
            }
            this.pos = this.pos.add(this.vel.multiply(dt));
            if (this.isWrapping) {
                this.wrap(scene.getSize());
            }
        };
        Actor.prototype.wrap = function (sceneSize) {
            // exit right edge
            if (this.pos.x > sceneSize.x) {
                this.pos.x -= sceneSize.x;
            }
            // exit left edge
            if (this.pos.x < 0) {
                this.pos.x += sceneSize.x;
            }
            // exit top
            if (this.pos.y < 0) {
                this.pos.y += sceneSize.y;
            }
            // exit bottom
            if (this.pos.y > sceneSize.y) {
                this.pos.y -= sceneSize.y;
            }
        };
        Actor.prototype.collideWith = function (other) {
            if (this.destroyOnCollision) {
                this.destroyed = true;
            }
        };
        return Actor;
    }());
    ps.Actor = Actor;
})(ps || (ps = {}));
/// <reference path="scene.ts" />
/// <reference path="actor.ts" />
/// <reference path="vector.ts" />
var ps;
(function (ps) {
    var DefaultScene = (function () {
        function DefaultScene(size) {
            this.size = size;
            this.actors = [];
        }
        DefaultScene.prototype.update = function (dt) {
            for (var _i = 0, _a = this.getActors(); _i < _a.length; _i++) {
                var actor = _a[_i];
                actor.update(dt, this);
            }
        };
        DefaultScene.prototype.addActors = function () {
            var actors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                actors[_i - 0] = arguments[_i];
            }
            for (var _a = 0, actors_1 = actors; _a < actors_1.length; _a++) {
                var actor = actors_1[_a];
                actor.game = this.game;
                this.actors.push(actor);
            }
        };
        DefaultScene.prototype.getActors = function () {
            return this.actors;
        };
        DefaultScene.prototype.garbageCollect = function () {
            this.actors = this.actors.filter(function (a) { return !a.destroyed; });
        };
        DefaultScene.prototype.getSize = function () {
            return this.size;
        };
        DefaultScene.prototype.setGame = function (game) {
            this.game = game;
        };
        return DefaultScene;
    }());
    ps.DefaultScene = DefaultScene;
})(ps || (ps = {}));
var ps;
(function (ps) {
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        Point.prototype.add = function (v) {
            return new Point(this.x + v.x, this.y + v.y);
        };
        Point.prototype.subtract = function (p) {
            return new Point(this.x - p.x, this.y - p.y);
        };
        Point.prototype.multiply = function (scalar) {
            return new Point(this.x * scalar, this.y * scalar);
        };
        Point.prototype.distanceTo = function (p) {
            return Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2));
        };
        Point.prototype.vectorTo = function (p) {
            return p.subtract(this).toVector();
        };
        Point.prototype.toVector = function () {
            return new ps.Vector(this.x, this.y);
        };
        Point.prototype.changeCoordinateSystem = function (coordinateChanger) {
            return coordinateChanger(this);
        };
        return Point;
    }());
    ps.Point = Point;
})(ps || (ps = {}));
/// <reference path="../point.ts" />
var ps;
(function (ps) {
    var input;
    (function (input) {
        var Mouse = (function () {
            function Mouse(camera) {
                this.positionOnCanvas = new ps.Point(0, 0);
                this.isLeftButtonDown = false;
                this.isRightButtonDown = false;
                this.isMiddleButtonDown = false;
                this.mouseMoveListeners = [];
                this.mouseDownListeners = [];
                this.mouseUpListeners = [];
                this.camera = camera;
                this.canvas = camera.canvas;
                this.mouseMoveDelegate = this.onMouseMove.bind(this);
                this.mouseDownDelegate = this.onMouseDown.bind(this);
                this.mouseUpDelegate = this.onMouseUp.bind(this);
            }
            Mouse.prototype.enable = function () {
                //disable context menu on rightclick, to allow using mouse2
                document.body.oncontextmenu = function (e) { return false; };
                //hide system cursor when mouse is over canvas
                this.canvas.style.cursor = "none";
                this.canvas.addEventListener("mousemove", this.mouseMoveDelegate, false);
                this.canvas.addEventListener("mousedown", this.mouseDownDelegate, false);
                this.canvas.addEventListener("mouseup", this.mouseUpDelegate, false);
            };
            Mouse.prototype.disable = function () {
                document.body.oncontextmenu = function (e) { return true; };
                this.canvas.style.cursor = "default";
                this.canvas.removeEventListener("mousemove", this.mouseMoveDelegate, false);
                this.canvas.removeEventListener("mousedown", this.mouseDownDelegate, false);
                this.canvas.removeEventListener("mouseup", this.mouseUpDelegate, false);
            };
            Mouse.prototype.setCustomCursor = function (url, hotspot) {
                this.canvas.style.cursor = "url(" + url + ") " + hotspot.x + " " + hotspot.y + ", auto";
            };
            Mouse.prototype.addMouseMoveEventListener = function (action) {
                this.mouseMoveListeners.push(action);
            };
            Mouse.prototype.getPosition = function () {
                return this.camera.toGameCoords(this.positionOnCanvas);
            };
            Mouse.prototype.onMouseMove = function (e) {
                var newPos = new ps.Point(e.clientX, e.clientY);
                this.positionOnCanvas = newPos.subtract(this.findPos(this.canvas));
                for (var _i = 0, _a = this.mouseMoveListeners; _i < _a.length; _i++) {
                    var listener = _a[_i];
                    listener(this.getPosition());
                }
            };
            Mouse.prototype.addMouseDownEventListener = function (action) {
                this.mouseDownListeners.push(action);
            };
            Mouse.prototype.onMouseDown = function (e) {
                e.stopImmediatePropagation();
                if (e.button === 0) {
                    this.isLeftButtonDown = true;
                }
                else if (e.button === 1) {
                    this.isRightButtonDown = true;
                }
                else if (e.button === 2) {
                    this.isMiddleButtonDown = true;
                }
                for (var _i = 0, _a = this.mouseDownListeners; _i < _a.length; _i++) {
                    var listener = _a[_i];
                    listener(this.positionOnCanvas, e.button);
                }
            };
            Mouse.prototype.addMouseUpEventListener = function (action) {
                this.mouseUpListeners.push(action);
            };
            Mouse.prototype.onMouseUp = function (e) {
                e.stopImmediatePropagation();
                if (e.button === 0) {
                    this.isLeftButtonDown = false;
                }
                else if (e.button === 1) {
                    this.isRightButtonDown = false;
                }
                else if (e.button === 2) {
                    this.isMiddleButtonDown = false;
                }
                for (var _i = 0, _a = this.mouseUpListeners; _i < _a.length; _i++) {
                    var listener = _a[_i];
                    listener(this.positionOnCanvas, e.button);
                }
            };
            // Find out where an element is on the page
            // From http://www.quirksmode.org/js/findpos.html
            Mouse.prototype.findPos = function (obj) {
                var curleft = 0, curtop = 0;
                if (obj.offsetParent) {
                    do {
                        curleft += obj.offsetLeft;
                        curtop += obj.offsetTop;
                    } while (obj = obj.offsetParent);
                }
                return new ps.Point(curleft, curtop);
            };
            return Mouse;
        }());
        input.Mouse = Mouse;
    })(input = ps.input || (ps.input = {}));
})(ps || (ps = {}));
/// <reference path="../point.ts" />
var ps;
(function (ps) {
    var input;
    (function (input) {
        var Keyboard = (function () {
            function Keyboard(document, window) {
                var _this = this;
                this.pressedKeys = {};
                this.document = document;
                this.keyDownDelegate = (function (e) { return _this.setKey(e, true); }).bind(this);
                this.keyUpDelegate = (function (e) { return _this.setKey(e, false); }).bind(this);
                this.blurDelegate = (function (e) { return _this.pressedKeys = {}; }).bind(this);
            }
            Keyboard.prototype.enable = function () {
                document.addEventListener("keydown", this.keyDownDelegate);
                document.addEventListener("keyup", this.keyUpDelegate);
                window.addEventListener("blur", this.keyUpDelegate);
            };
            Keyboard.prototype.disable = function () {
                document.removeEventListener("keydown", this.keyDownDelegate);
                document.removeEventListener("keyup", this.keyUpDelegate);
                window.removeEventListener("blur", this.keyUpDelegate);
            };
            Keyboard.prototype.isKeyDown = function (key) {
                return this.pressedKeys[key.toUpperCase()];
            };
            Keyboard.prototype.setKey = function (event, status) {
                var code = event.keyCode;
                var key;
                switch (code) {
                    case 32:
                        key = "SPACE";
                        break;
                    case 37:
                        key = "LEFT";
                        break;
                    case 38:
                        key = "UP";
                        break;
                    case 39:
                        key = "RIGHT";
                        break;
                    case 40:
                        key = "DOWN";
                        break;
                    default:
                        // Convert ASCII codes to letters
                        key = String.fromCharCode(code);
                }
                this.pressedKeys[key] = status;
            };
            return Keyboard;
        }());
        input.Keyboard = Keyboard;
    })(input = ps.input || (ps.input = {}));
})(ps || (ps = {}));
/// <reference path="browseranimationframeprovider.ts" />
/// <reference path="defaultscene.ts" />
/// <reference path="input/mouse.ts" />
/// <reference path="input/keyboard.ts" />
var ps;
(function (ps) {
    var Game = (function () {
        function Game(canvas, scene) {
            if (canvas === void 0) { canvas = null; }
            if (scene === void 0) { scene = null; }
            this.scene = scene;
            this.resourceManager = new ps.ResourceManager();
            this.resources = [];
            this.canvas = canvas || this.createCanvas();
            var resolution = new ps.Vector(this.canvas.width, this.canvas.height);
            this.scene = scene || new ps.DefaultScene(resolution.clone());
            this.scene.setGame(this);
            this.camera = new ps.Camera(this.canvas, this.resourceManager, new ps.DefaultCoordConverter(resolution.clone()), this.scene.getSize(), resolution.clone(), new ps.Point(0, 0));
            this.mouse = new ps.input.Mouse(this.camera);
            this.mouse.enable();
            this.keyboard = new ps.input.Keyboard(document, window);
            this.keyboard.enable();
            this.engine = new ps.Engine(new ps.BrowserAnimationFrameProvider(), this.camera, this.scene);
        }
        Game.prototype.start = function () {
            var _this = this;
            if (this.resources.length > 0) {
                this.resourceManager.onReady(function () { _this.engine.start(); });
                this.resourceManager.preload(this.resources);
            }
            else {
                this.engine.start();
            }
        };
        Game.prototype.loadResources = function () {
            var resources = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                resources[_i - 0] = arguments[_i];
            }
            this.resources = this.resources.concat(resources);
        };
        Game.prototype.setResolution = function (resolution) {
            this.camera.coordConverter.setResolution(resolution);
        };
        Game.prototype.createCanvas = function () {
            var canvas = document.createElement("canvas");
            var resolution = this.getMaxCanvasSize(window.innerWidth, window.innerHeight, this.getAspectRatio());
            canvas.width = resolution.x;
            canvas.height = resolution.y;
            document.body.appendChild(canvas);
            document.body.style.margin = "0";
            return canvas;
        };
        Game.prototype.getAspectRatio = function () {
            return screen.width / screen.height;
        };
        Game.prototype.getMaxCanvasSize = function (windowWidth, windowHeight, aspectRatio) {
            var desiredHeight = windowWidth / aspectRatio;
            var canvasHeight = Math.min(desiredHeight, windowHeight);
            var canvasWidth = canvasHeight * aspectRatio;
            return new ps.Vector(canvasWidth, canvasHeight);
        };
        return Game;
    }());
    ps.Game = Game;
})(ps || (ps = {}));
/// <reference path="runnable.ts" />
/// <reference path="../actor.ts" />
var ps;
(function (ps) {
    var collision;
    (function (collision) {
        var Collision = (function () {
            function Collision() {
                var entities = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    entities[_i - 0] = arguments[_i];
                }
                this.entities = entities;
            }
            return Collision;
        }());
        collision.Collision = Collision;
    })(collision = ps.collision || (ps.collision = {}));
})(ps || (ps = {}));
/// <reference path="../actor.ts" />
/// <reference path="collision.ts" />
/// <reference path="collisiondetector.ts" />
/// <reference path="collision.ts" />
var ps;
(function (ps) {
    var collision;
    (function (collision) {
        var CircularCollisionDetector = (function () {
            function CircularCollisionDetector() {
            }
            CircularCollisionDetector.prototype.findCollisions = function (entities) {
                var collidables = this.getCollisionEnabledEntities(entities);
                var collisions = [];
                for (var i = 0; i < collidables.length - 1; i++) {
                    for (var j = i + 1; j < collidables.length; j++) {
                        if (this.collides(collidables[i], collidables[j])) {
                            collisions.push(new collision.Collision(collidables[i], collidables[j]));
                        }
                    }
                }
                return collisions;
            };
            CircularCollisionDetector.prototype.collides = function (a, b) {
                return a.pos.distanceTo(b.pos) < a.radius + b.radius;
            };
            CircularCollisionDetector.prototype.getCollisionEnabledEntities = function (entities) {
                return entities.filter(function (e) { return e.isCollisionDetectionEnabled; });
            };
            return CircularCollisionDetector;
        }());
        collision.CircularCollisionDetector = CircularCollisionDetector;
    })(collision = ps.collision || (ps.collision = {}));
})(ps || (ps = {}));
/// <reference path="collision.ts" />
/// <reference path="collision.ts" />
/// <reference path="collisionresolver.ts" />
var ps;
(function (ps) {
    var collision;
    (function (collision_1) {
        var DeferToActorCollisionResolver = (function () {
            function DeferToActorCollisionResolver() {
            }
            DeferToActorCollisionResolver.prototype.resolve = function (collisions) {
                for (var _i = 0, collisions_1 = collisions; _i < collisions_1.length; _i++) {
                    var collision_2 = collisions_1[_i];
                    this.resolveSingleCollision(collision_2);
                }
            };
            DeferToActorCollisionResolver.prototype.resolveSingleCollision = function (collision) {
                var entities = collision.entities;
                for (var i = 0; i < entities.length - 1; i++) {
                    for (var j = i + 1; j < entities.length; j++) {
                        entities[i].collideWith(entities[j]);
                        entities[j].collideWith(entities[i]);
                    }
                }
            };
            return DeferToActorCollisionResolver;
        }());
        collision_1.DeferToActorCollisionResolver = DeferToActorCollisionResolver;
    })(collision = ps.collision || (ps.collision = {}));
})(ps || (ps = {}));
var ps;
(function (ps) {
    var DateNowStopwatch = (function () {
        function DateNowStopwatch() {
            this.start();
        }
        DateNowStopwatch.prototype.start = function () {
            this.startTime = Date.now();
        };
        DateNowStopwatch.prototype.stop = function () {
            return (Date.now() - this.startTime) / 1000.0;
        };
        return DateNowStopwatch;
    }());
    ps.DateNowStopwatch = DateNowStopwatch;
})(ps || (ps = {}));
/// <reference path="vector.ts" />
/// <reference path="point.ts" />
var ps;
(function (ps) {
    //assume game coords lie in the first quadrant, with (0, 0) being the lower left corner
    var DefaultCoordConverter = (function () {
        function DefaultCoordConverter(resolution) {
            this.resolution = resolution;
        }
        DefaultCoordConverter.prototype.toCameraCoords = function (p, cameraPosition, viewPort) {
            return p.subtract(cameraPosition)
                .multiply(this.getScale(viewPort))
                .changeCoordinateSystem(this.coordinateChanger.bind(this));
        };
        DefaultCoordConverter.prototype.toGameCoords = function (p, cameraPosition, viewPort) {
            return p.changeCoordinateSystem(this.coordinateChanger.bind(this))
                .multiply(1 / this.getScale(viewPort))
                .add(cameraPosition);
        };
        DefaultCoordConverter.prototype.setResolution = function (resolution) {
            this.resolution = resolution;
        };
        DefaultCoordConverter.prototype.coordinateChanger = function (p) {
            return new ps.Point(p.x, this.resolution.y - p.y);
        };
        DefaultCoordConverter.prototype.getScale = function (viewPort) {
            return this.resolution.x / viewPort.x;
        };
        return DefaultCoordConverter;
    }());
    ps.DefaultCoordConverter = DefaultCoordConverter;
})(ps || (ps = {}));
/// <reference path="point.ts" />
/// <reference path="coordconverter.ts" />
var ps;
(function (ps) {
    var Camera = (function () {
        function Camera(canvas, resourceManager, coordConverter, sceneSize, //size of scene / game world
            viewPort, //width and height of camera viewport 
            pos) {
            this.canvas = canvas;
            this.resourceManager = resourceManager;
            this.coordConverter = coordConverter;
            this.sceneSize = sceneSize;
            this.viewPort = viewPort;
            this.pos = pos;
            this.backgroundColor = "black";
            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
        }
        //TODO implement here 
        // function resizeCanvas(e) {
        //     canvas.width = window.innerWidth;
        //     canvas.height = window.innerWidth / aspectRatio;
        //     engine.setResolution(new ps.Vector(canvas.width, canvas.height));
        // }
        // window.onresize = resizeCanvas;
        Camera.prototype.centerOn = function (p) {
            this.pos = p.subtract(this.viewPort.multiply(.5));
        };
        Camera.prototype.fillCircle = function (pos, radius, color) {
            this.fillArc(pos, 0, radius, 0, Math.PI * 2, false, color);
        };
        Camera.prototype.fillArc = function (pos, rotation, radius, startAngle, endAngle, counterClockWise, color) {
            var _this = this;
            var centerCC = this.toCameraCoords(pos);
            var scaledRadius = this.scale(radius);
            this.paintWhileRotated(centerCC, rotation, function () {
                _this.ctx.fillStyle = color;
                _this.ctx.beginPath();
                _this.ctx.arc(0, 0, scaledRadius, startAngle, endAngle, counterClockWise);
                _this.ctx.fill();
                _this.ctx.closePath();
            });
        };
        Camera.prototype.fillRect = function (pos, rotation, width, height, color) {
            var _this = this;
            var centerCC = this.toCameraCoords(pos);
            var scaledHeight = this.scale(height);
            var scaledWidth = this.scale(width);
            this.paintWhileRotated(centerCC, rotation, function () {
                _this.ctx.fillStyle = color;
                _this.ctx.fillRect(-scaledWidth / 2.0, -scaledHeight / 2.0, scaledWidth, scaledHeight);
            });
        };
        Camera.prototype.drawLine = function (start, end, lineWidth, color) {
            var startCC = this.toCameraCoords(start);
            var endCC = this.toCameraCoords(end);
            var previousStroke = this.ctx.strokeStyle;
            var previousLineWidth = this.ctx.lineWidth;
            this.ctx.beginPath();
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = lineWidth;
            this.ctx.moveTo(startCC.x, startCC.y);
            this.ctx.lineTo(endCC.x, endCC.y);
            this.ctx.closePath();
            this.ctx.stroke();
            this.ctx.strokeStyle = previousStroke;
            this.ctx.lineWidth = previousLineWidth;
        };
        Camera.prototype.paintSprite = function (pos, rotation, size, sprite) {
            this.paintSprites(pos, rotation, size, [sprite]);
        };
        Camera.prototype.paintSprites = function (pos, rotation, size, sprites) {
            var centerCC = this.toCameraCoords(pos);
            var scaledSize = [this.scale(size[0]), this.scale(size[1])];
            for (var _i = 0, sprites_1 = sprites; _i < sprites_1.length; _i++) {
                var sprite = sprites_1[_i];
                this.paintSpriteInternal(sprite, centerCC, scaledSize, rotation);
            }
        };
        Camera.prototype.toGameCoords = function (p) {
            return this.coordConverter.toGameCoords(p, this.pos, this.viewPort);
        };
        Camera.prototype.toCameraCoords = function (p) {
            return this.coordConverter.toCameraCoords(p, this.pos, this.viewPort);
        };
        Camera.prototype.paintSpriteInternal = function (sprite, pos, size, rotation) {
            sprite.render(this.ctx, this.resourceManager, pos, size, rotation);
        };
        //assumes that viewPort has same aspect ratio as canvas
        Camera.prototype.scale = function (n) {
            return n * this.canvas.width / this.viewPort.x;
        };
        Camera.prototype.render = function (scene) {
            this.clear();
            for (var _i = 0, _a = scene.getActors(); _i < _a.length; _i++) {
                var actor = _a[_i];
                actor.render(this, scene);
            }
            console.log("camera position: ", this.pos);
        };
        Camera.prototype.toggleFullScreen = function () {
            if (!document.webkitFullscreenElement) {
                this.canvas.webkitRequestFullscreen();
            }
            else {
                document.webkitExitFullscreen();
            }
        };
        Camera.prototype.clear = function () {
            this.ctx.fillStyle = this.backgroundColor;
            this.ctx.fillRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
        };
        Camera.prototype.paintWhileRotated = function (center, rotation, paintDelegate) {
            this.ctx.translate(center.x, center.y);
            this.ctx.rotate(rotation);
            paintDelegate();
            this.ctx.rotate(-rotation);
            this.ctx.translate(-center.x, -center.y);
        };
        return Camera;
    }());
    ps.Camera = Camera;
})(ps || (ps = {}));
/// <reference path="animationframeprovider.ts" />
/// <reference path="collision/collisiondetector.ts" />
/// <reference path="collision/circularcollisiondetector.ts" />
/// <reference path="collision/defertoactorcollisionresolver.ts" />
/// <reference path="stopwatch.ts" />
/// <reference path="camera.ts" />
var ps;
(function (ps) {
    var c = ps.collision;
    var Engine = (function () {
        function Engine(animator, camera, scene) {
            this.animator = animator;
            this.camera = camera;
            this.scene = scene;
            this.collisionDetector = new c.CircularCollisionDetector();
            this.collisionResolver = new c.DeferToActorCollisionResolver();
            this.stopwatch = new ps.DateNowStopwatch();
        }
        //the main loop of the piston engine
        Engine.prototype.run = function () {
            //measure time taken since last frame was processed
            var dt = this.stopwatch.stop();
            //remove all destroyed entities
            this.scene.garbageCollect();
            //update entities
            this.scene.update(dt);
            //detect and resolve any collisions between entities
            this.checkCollisions(this.scene.getActors());
            //render the frame
            this.camera.render(this.scene);
            //start measuring time since this frame finished
            this.stopwatch.start();
            //request next animation frame
            this.animator.animate(this);
        };
        Engine.prototype.start = function () {
            this.animator.animate(this);
        };
        Engine.prototype.checkCollisions = function (entities) {
            var collisions = this.collisionDetector.findCollisions(entities);
            this.collisionResolver.resolve(collisions);
        };
        return Engine;
    }());
    ps.Engine = Engine;
})(ps || (ps = {}));
var ps;
(function (ps) {
    var ResourceManager = (function () {
        function ResourceManager() {
            this.cache = {};
            this.readyCallbacks = [];
        }
        ResourceManager.prototype.preload = function (urls) {
            var _this = this;
            var _loop_1 = function(url) {
                if (!this_1.cache[url]) {
                    var img_1 = new Image();
                    img_1.onload = function () {
                        _this.cache[url] = img_1;
                        if (_this.isReady()) {
                            for (var _i = 0, _a = _this.readyCallbacks; _i < _a.length; _i++) {
                                var cb = _a[_i];
                                cb();
                            }
                        }
                    };
                    this_1.cache[url] = false;
                    img_1.src = url;
                }
            };
            var this_1 = this;
            for (var _i = 0, urls_1 = urls; _i < urls_1.length; _i++) {
                var url = urls_1[_i];
                _loop_1(url);
            }
        };
        ResourceManager.prototype.get = function (url) {
            return this.cache[url];
        };
        ResourceManager.prototype.onReady = function (callback) {
            this.readyCallbacks.push(callback);
        };
        ResourceManager.prototype.isReady = function () {
            for (var k in this.cache) {
                if (this.cache.hasOwnProperty(k) && !this.cache[k]) {
                    return false;
                }
            }
            return true;
        };
        return ResourceManager;
    }());
    ps.ResourceManager = ResourceManager;
})(ps || (ps = {}));
/// <reference path="resourcemanager.ts" />
/// <reference path="point.ts" />
var ps;
(function (ps) {
    var Sprite = (function () {
        function Sprite(spriteSheetCoordinates, spriteSize, frames, animationSpeed, url) {
            this.spriteSheetCoordinates = spriteSheetCoordinates;
            this.spriteSize = spriteSize;
            this.frames = frames;
            this.animationSpeed = animationSpeed;
            this.url = url;
            this.index = 0;
            this.index = Math.random() * frames.length;
        }
        Sprite.prototype.update = function (dt) {
            this.index = this.index + this.animationSpeed * dt % this.frames.length;
        };
        Sprite.prototype.render = function (ctx, resourceManager, pos, size, rotation) {
            var frame = 0;
            if (this.animationSpeed > 0) {
                var idx = Math.floor(this.index);
                frame = this.frames[idx % this.frames.length];
            }
            var sprite_x = this.spriteSheetCoordinates.x + frame * this.spriteSize[0];
            var sprite_y = this.spriteSheetCoordinates.y;
            if (rotation === 0) {
                ctx.drawImage(resourceManager.get(this.url), sprite_x, sprite_y, this.spriteSize[0], this.spriteSize[1], pos.x - size[0] / 2.0, pos.y - size[1] / 2.0, size[0], size[1]);
            }
            else {
                ctx.translate(pos.x, pos.y);
                ctx.rotate(rotation);
                ctx.drawImage(resourceManager.get(this.url), sprite_x, sprite_y, this.spriteSize[0], this.spriteSize[1], -size[0] / 2, -size[1] / 2, size[0], size[1]);
                ctx.rotate(-rotation);
                ctx.translate(-pos.x, -pos.y);
            }
        };
        return Sprite;
    }());
    ps.Sprite = Sprite;
})(ps || (ps = {}));
/// <reference path="actor.ts" />
/// <reference path="sprite.ts" />
/// <reference path="scene.ts" />
var ps;
(function (ps) {
    var ActorWithSprites = (function (_super) {
        __extends(ActorWithSprites, _super);
        function ActorWithSprites() {
            _super.apply(this, arguments);
            this.sprites = [];
        }
        ActorWithSprites.prototype.update = function (dt, scene) {
            _super.prototype.update.call(this, dt, scene);
            for (var _i = 0, _a = this.sprites; _i < _a.length; _i++) {
                var sprite = _a[_i];
                sprite.update(dt);
            }
        };
        return ActorWithSprites;
    }(ps.Actor));
    ps.ActorWithSprites = ActorWithSprites;
})(ps || (ps = {}));
/// <reference path="game.ts" />
/// <reference path="engine.ts" />
/// <reference path="actorwithsprites.ts" />
/// <reference path="sprite.ts" />
/// <reference path="collision/collisiondetector.ts" />
/// <reference path="collision/collisionresolver.ts" />
/// <reference path="collision/defertoactorcollisionresolver.ts" />
/// <reference path="vector.ts" />
/// <reference path="point.ts" /> 
//# sourceMappingURL=piston-0.4.0.js.map