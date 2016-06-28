var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="runnable.ts" />
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
    var Entity = (function () {
        function Entity(pos) {
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
        Entity.prototype.update = function (dt, dims) {
            if (this.isAccelerationEnabled) {
                this.vel = this.vel.add(this.acc.multiply(dt));
            }
            if (this.rotationSpeed !== 0) {
                this.rotation = (this.rotation + this.rotationSpeed * dt) % (Math.PI * 2);
            }
            this.pos = this.pos.add(this.vel.multiply(dt));
            if (this.isWrapping) {
                this.wrap(dims);
            }
        };
        Entity.prototype.wrap = function (dimensions) {
            // exit right edge
            if (this.pos.x > dimensions.x) {
                this.pos.x -= dimensions.x;
            }
            // exit left edge
            if (this.pos.x < 0) {
                this.pos.x += dimensions.x;
            }
            // exit top
            if (this.pos.y < 0) {
                this.pos.y += dimensions.y;
            }
            // exit bottom
            if (this.pos.y > dimensions.y) {
                this.pos.y -= dimensions.y;
            }
        };
        Entity.prototype.collideWith = function (other) {
            if (this.destroyOnCollision) {
                this.destroyed = true;
            }
        };
        return Entity;
    }());
    ps.Entity = Entity;
})(ps || (ps = {}));
/// <reference path="../entity.ts" />
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
/// <reference path="../entity.ts" />
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
        var DeferToEntityCollisionResolver = (function () {
            function DeferToEntityCollisionResolver() {
            }
            DeferToEntityCollisionResolver.prototype.resolve = function (collisions) {
                for (var _i = 0, collisions_1 = collisions; _i < collisions_1.length; _i++) {
                    var collision_2 = collisions_1[_i];
                    this.resolveSingleCollision(collision_2);
                }
            };
            DeferToEntityCollisionResolver.prototype.resolveSingleCollision = function (collision) {
                var entities = collision.entities;
                for (var i = 0; i < entities.length - 1; i++) {
                    for (var j = i + 1; j < entities.length; j++) {
                        entities[i].collideWith(entities[j]);
                        entities[j].collideWith(entities[i]);
                    }
                }
            };
            return DeferToEntityCollisionResolver;
        }());
        collision_1.DeferToEntityCollisionResolver = DeferToEntityCollisionResolver;
    })(collision = ps.collision || (ps.collision = {}));
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
        Point.prototype.distanceTo = function (p) {
            return Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2));
        };
        Point.prototype.vectorTo = function (p) {
            return p.subtract(this).toVector();
        };
        Point.prototype.toVector = function () {
            return new ps.Vector(this.x, this.y);
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
/// <reference path="../point.ts" />
var ps;
(function (ps) {
    var input;
    (function (input) {
        var Mouse = (function () {
            function Mouse(canvas, coordConverter) {
                this.canvas = canvas;
                this.coordConverter = coordConverter;
                this.pos = new ps.Point(0, 0);
                this.isLeftButtonDown = false;
                this.isRightButtonDown = false;
                this.isMiddleButtonDown = false;
                this.mouseMoveListeners = [];
                this.mouseDownListeners = [];
                this.mouseUpListeners = [];
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
            Mouse.prototype.onMouseMove = function (e) {
                var newPos = new ps.Point(e.clientX, e.clientY);
                this.pos = this.coordConverter.toGameCoords(newPos.subtract(this.findPos(this.canvas)));
                for (var _i = 0, _a = this.mouseMoveListeners; _i < _a.length; _i++) {
                    var listener = _a[_i];
                    listener(this.pos);
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
                    listener(this.pos, e.button);
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
                    listener(this.pos, e.button);
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
        return Vector;
    }());
    ps.Vector = Vector;
})(ps || (ps = {}));
/// <reference path="vector.ts" />
/// <reference path="point.ts" />
var ps;
(function (ps) {
    //assume game coords lie in the first quadrant, with (0, 0) being the lower left corner
    var DefaultCoordConverter = (function () {
        function DefaultCoordConverter(dims) {
            this.dims = dims;
        }
        DefaultCoordConverter.prototype.toCameraCoords = function (p) {
            return new ps.Point(p.x, this.dims.y - p.y);
        };
        DefaultCoordConverter.prototype.toGameCoords = function (p) {
            return new ps.Point(p.x, this.dims.y - p.y);
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
        function Camera(dims, ctx, coordConverter) {
            this.dims = dims;
            this.ctx = ctx;
            this.coordConverter = coordConverter;
            this.backgroundColor = "black";
        }
        Camera.prototype.fillCircle = function (pos, radius, color) {
            this.fillArc(pos, 0, radius, 0, Math.PI * 2, false, color);
        };
        Camera.prototype.fillArc = function (pos, rotation, radius, startAngle, endAngle, counterClockWise, color) {
            var _this = this;
            var centerCC = this.coordConverter.toCameraCoords(pos);
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
            var centerCC = this.coordConverter.toCameraCoords(pos);
            var scaledHeight = this.scale(height);
            var scaledWidth = this.scale(width);
            this.paintWhileRotated(centerCC, rotation, function () {
                _this.ctx.fillStyle = color;
                _this.ctx.fillRect(-scaledWidth / 2.0, -scaledHeight / 2.0, scaledWidth, scaledHeight);
            });
        };
        Camera.prototype.drawLine = function (start, end, lineWidth, color) {
            var startCC = this.coordConverter.toCameraCoords(start);
            var endCC = this.coordConverter.toCameraCoords(end);
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
        Camera.prototype.paintSprites = function (pos, rotation, size, sprites) {
            var centerCC = this.coordConverter.toCameraCoords(pos);
            var scaledSize = [this.scale(size[0]), this.scale(size[1])];
            for (var _i = 0, sprites_1 = sprites; _i < sprites_1.length; _i++) {
                var sprite = sprites_1[_i];
                this.paintSprite(sprite, centerCC, scaledSize, rotation);
            }
        };
        Camera.prototype.paintSprite = function (sprite, pos, size, rotation) {
            sprite.render(this.ctx, this.resourceManager, pos, size, rotation);
        };
        Camera.prototype.scale = function (n) {
            return n; //assume 1:1 scale for now
        };
        Camera.prototype.render = function (entities) {
            this.clear();
            for (var _i = 0, entities_1 = entities; _i < entities_1.length; _i++) {
                var entity = entities_1[_i];
                entity.render(this);
            }
        };
        Camera.prototype.clear = function () {
            this.ctx.fillStyle = this.backgroundColor;
            this.ctx.fillRect(0, 0, this.dims.x, this.dims.y);
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
/// <reference path="animationframeprovider.ts" />
/// <reference path="browseranimationframeprovider.ts" />
/// <reference path="collision/collisiondetector.ts" />
/// <reference path="collision/circularcollisiondetector.ts" />
/// <reference path="collision/defertoentitycollisionresolver.ts" />
/// <reference path="input/keyboard.ts" />
/// <reference path="input/mouse.ts" />
/// <reference path="stopwatch.ts" />
/// <reference path="camera.ts" />
/// <reference path="coordconverter.ts" />
/// <reference path="resourcemanager.ts" />
var ps;
(function (ps) {
    var c = ps.collision;
    var HeadlessEngine = (function () {
        function HeadlessEngine(dims, canvas, mouse, keyboard, animator, camera) {
            this.dims = dims;
            this.canvas = canvas;
            this.mouse = mouse;
            this.keyboard = keyboard;
            this.animator = animator;
            this.camera = camera;
            this.debug = false;
            this.backgroundFillStyle = "black";
            this.collisionDetector = new ps.collision.CircularCollisionDetector();
            this.collisionResolver = new ps.collision.DeferToEntityCollisionResolver();
            this.stopwatch = new ps.DateNowStopwatch();
            this.entities = [];
            this.resourceManager = new ps.ResourceManager();
            this.resources = [];
            this.ctx = canvas.getContext("2d");
            this.camera.resourceManager = this.resourceManager;
            if (this.mouse) {
                this.mouse.enable();
            }
            if (this.keyboard) {
                this.keyboard.enable();
            }
        }
        HeadlessEngine.prototype.registerEntity = function () {
            var entities = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                entities[_i - 0] = arguments[_i];
            }
            for (var _a = 0, entities_2 = entities; _a < entities_2.length; _a++) {
                var entity = entities_2[_a];
                entity.engine = this;
                this.entities.push(entity);
            }
        };
        //the main loop of the piston engine
        HeadlessEngine.prototype.run = function () {
            //measure time taken since last frame was processed
            var dt = this.stopwatch.stop();
            //remove all destroyed entities
            this.garbageCollect();
            //update entities
            this.update(dt, this.entities);
            //detect and resolve any collisions between entities
            this.checkCollisions(this.entities);
            //render the frame
            this.camera.render(this.entities);
            //start measuring time since this frame finished
            this.stopwatch.start();
            //request next animation frame
            this.animator.animate(this);
        };
        HeadlessEngine.prototype.preloadResources = function () {
            var resources = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                resources[_i - 0] = arguments[_i];
            }
            this.resources = resources;
        };
        HeadlessEngine.prototype.start = function () {
            var _this = this;
            if (this.resources.length > 0) {
                this.resourceManager.onReady(function () { _this.animator.animate(_this); });
                this.resourceManager.preload(this.resources);
            }
            else {
                this.animator.animate(this);
            }
        };
        HeadlessEngine.prototype.checkCollisions = function (entities) {
            var collisions = this.collisionDetector.findCollisions(entities);
            this.collisionResolver.resolve(collisions);
        };
        HeadlessEngine.prototype.update = function (dt, entities) {
            for (var _i = 0, entities_3 = entities; _i < entities_3.length; _i++) {
                var entity = entities_3[_i];
                entity.update(dt, this.dims);
            }
        };
        HeadlessEngine.prototype.garbageCollect = function () {
            this.entities = this.entities.filter(function (e) { return !e.destroyed; });
        };
        return HeadlessEngine;
    }());
    ps.HeadlessEngine = HeadlessEngine;
    /**
     * Default engine for running in-browser
     */
    var Engine = (function (_super) {
        __extends(Engine, _super);
        function Engine(dims, canvas) {
            _super.call(this, dims, canvas, new ps.input.Mouse(canvas, new ps.DefaultCoordConverter(dims)), new ps.input.Keyboard(document, window), new ps.BrowserAnimationFrameProvider(), new ps.Camera(dims, canvas.getContext("2d"), new ps.DefaultCoordConverter(dims)));
        }
        return Engine;
    }(HeadlessEngine));
    ps.Engine = Engine;
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
/// <reference path="entity.ts" />
/// <reference path="sprite.ts" />
var ps;
(function (ps) {
    var EntityWithSprites = (function (_super) {
        __extends(EntityWithSprites, _super);
        function EntityWithSprites() {
            _super.apply(this, arguments);
            this.sprites = [];
        }
        EntityWithSprites.prototype.update = function (dt, dims) {
            _super.prototype.update.call(this, dt, dims);
            for (var _i = 0, _a = this.sprites; _i < _a.length; _i++) {
                var sprite = _a[_i];
                sprite.update(dt);
            }
        };
        return EntityWithSprites;
    }(ps.Entity));
    ps.EntityWithSprites = EntityWithSprites;
})(ps || (ps = {}));
/// <reference path="engine.ts" />
/// <reference path="entitywithsprites.ts" />
/// <reference path="sprite.ts" />
/// <reference path="collision/collisiondetector.ts" />
/// <reference path="collision/collisionresolver.ts" />
/// <reference path="collision/defertoentitycollisionresolver.ts" />
/// <reference path="vector.ts" />
/// <reference path="point.ts" /> 
//# sourceMappingURL=piston-0.4.0.js.map