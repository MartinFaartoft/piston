/*! piston - v0.2.0 - 2016-06-18
* https://github.com/martinfaartoft/piston/
* Copyright (c) 2016 Piston.js <martin.faartoft@gmail.com>; Licensed MIT*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        return Vector;
    }());
    ps.Vector = Vector;
})(ps || (ps = {}));
/// <reference path="resourcemanager.ts" />
/// <reference path="vector.ts" />
var ps;
(function (ps) {
    var BaseGameState = (function () {
        function BaseGameState(dimensions) {
            this.dimensions = dimensions;
        }
        return BaseGameState;
    }());
    ps.BaseGameState = BaseGameState;
})(ps || (ps = {}));
/// <reference path="basegamestate.ts" />
var ps;
(function (ps) {
    var Engine = (function () {
        function Engine(state, ctx, debug) {
            this.state = state;
            this.ctx = ctx;
            this.debug = debug;
            this.lastTime = Date.now();
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
        Engine.prototype.run = function () {
            var now = Date.now();
            var dt = (now - this.lastTime) / 1000.0;
            this.state.update(dt);
            this.state.render(this.ctx);
            this.lastTime = now;
            this.requestAnimationFrame.call(window, this.run.bind(this));
        };
        return Engine;
    }());
    ps.Engine = Engine;
})(ps || (ps = {}));
/// <reference path="basegamestate.ts" />
var ps;
(function (ps) {
    var Entity = (function () {
        function Entity(pos, speed, radius) {
            this.pos = pos;
            this.speed = speed;
            this.radius = radius;
            this.destroyed = false;
            this.isWrapping = false;
        }
        Entity.prototype.update = function (dt, state) {
            this.pos = this.pos.add(this.speed.multiply(dt));
            if (this.isWrapping) {
                this.wrap(state.dimensions);
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
        Entity.prototype.getWrappedBoundingCircles = function (dimensions) {
            var boundingCircles = [this];
            for (var i = -1; i <= 1; i++) {
                for (var j = -1; j <= 1; j++) {
                    boundingCircles.push({
                        pos: [this.pos[0] + i * dimensions[0], this.pos[1] + j * dimensions[1]],
                        radius: this.radius,
                        entity: this
                    });
                }
            }
            return boundingCircles;
        };
        return Entity;
    }());
    ps.Entity = Entity;
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
        Point.prototype.distanceTo = function (p) {
            return Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2));
        };
        return Point;
    }());
    ps.Point = Point;
})(ps || (ps = {}));
/// <reference path="resourcemanager.ts" />
/// <reference path="point.ts" />
var ps;
(function (ps) {
    var Sprite = (function () {
        function Sprite(spriteSheetCoordinates, spriteSize, frames, speed, url) {
            this.spriteSheetCoordinates = spriteSheetCoordinates;
            this.spriteSize = spriteSize;
            this.frames = frames;
            this.speed = speed;
            this.url = url;
            this.index = 0;
            this.index = Math.random() * frames.length;
        }
        Sprite.prototype.update = function (dt) {
            this.index = this.index + this.speed * dt % this.frames.length;
        };
        Sprite.prototype.render = function (ctx, resourceManager, pos, size, rotation) {
            var frame = 0;
            if (this.speed > 0) {
                var idx = Math.floor(this.index);
                frame = this.frames[idx % this.frames.length];
            }
            var sprite_x = this.spriteSheetCoordinates[0] + frame * this.spriteSize[0];
            var sprite_y = this.spriteSheetCoordinates[1];
            if (rotation === 0) {
                ctx.drawImage(resourceManager.get(this.url), sprite_x, sprite_y, this.spriteSize[0], this.spriteSize[1], pos[0] - size[0] / 2.0, pos[1] - size[1] / 2.0, size[0], size[1]);
            }
            else {
                ctx.translate(pos[0], pos[1]);
                ctx.rotate(rotation);
                ctx.drawImage(resourceManager.get(this.url), sprite_x, sprite_y, this.spriteSize[0], this.spriteSize[1], -size[0] / 2, -size[1] / 2, size[0], size[1]);
                ctx.rotate(-rotation);
                ctx.translate(-pos[0], -pos[1]);
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
        EntityWithSprites.prototype.update = function (dt, state) {
            _super.prototype.update.call(this, dt, state);
            for (var _i = 0, _a = this.sprites; _i < _a.length; _i++) {
                var sprite = _a[_i];
                sprite.update(dt);
            }
        };
        return EntityWithSprites;
    }(ps.Entity));
    ps.EntityWithSprites = EntityWithSprites;
})(ps || (ps = {}));
var ps;
(function (ps) {
    function isKeyDown(key) {
        return pressedKeys[key.toUpperCase()];
    }
    ps.isKeyDown = isKeyDown;
    var pressedKeys = {};
    (function () {
        function setKey(event, status) {
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
            pressedKeys[key] = status;
        }
        document.addEventListener("keydown", function (e) {
            setKey(e, true);
        });
        document.addEventListener("keyup", function (e) {
            setKey(e, false);
        });
        window.addEventListener("blur", function () {
            pressedKeys = {};
        });
    })();
})(ps || (ps = {}));
/// <reference path="basegamestate.ts" />
/// <reference path="collidable.ts" />
var ps;
(function (ps) {
    function detectCircularCollision(a, b, state) {
        // circle collision        
        var distance = a.pos.distanceTo(b.pos);
        var collision = distance < a.radius + b.radius;
        if (collision) {
            a.collideWith(b, state);
            b.collideWith(a, state);
        }
        return collision;
    }
    ps.detectCircularCollision = detectCircularCollision;
})(ps || (ps = {}));
/// <reference path="engine.ts" />
/// <reference path="entitywithsprites.ts" />
/// <reference path="input.ts" />
/// <reference path="sprite.ts" />
/// <reference path="collisiondetector.ts" />
/// <reference path="vector.ts" />
/// <reference path="point.ts" /> 
//# sourceMappingURL=piston-0.2.0.js.map