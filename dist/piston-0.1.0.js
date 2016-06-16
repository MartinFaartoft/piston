/*! piston - v0.1.0 - 2016-06-16
* https://github.com/martinfaartoft/piston/
* Copyright (c) 2016 Piston.js <martin.faartoft@gmail.com>; Licensed MIT*/
var ps;
(function (ps) {
    var Sprite = (function () {
        function Sprite() {
        }
        Sprite.prototype.value = function () {
            return 1;
        };
        return Sprite;
    }());
    ps.Sprite = Sprite;
})(ps || (ps = {}));
/// <reference path="sprite.ts" />
var ps;
(function (ps) {
    var Engine = (function () {
        function Engine(dimensions) {
            this.dimensions = dimensions;
        }
        Engine.prototype.sum = function (a, b) {
            return a + b;
        };
        Engine.prototype.subtract = function (a, b) {
            return 1;
        };
        return Engine;
    }());
    ps.Engine = Engine;
})(ps || (ps = {}));
//# sourceMappingURL=piston-0.1.0.js.map