"use strict";
var core_1 = require('@angular/core');
var object_id_1 = require('../utils/object-id');
var d3_1 = require('../d3');
var Bar = (function () {
    function Bar(element) {
        this.roundEdges = true;
        this.gradient = false;
        this.offset = 0;
        this.clickHandler = new core_1.EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    Bar.prototype.ngOnInit = function () {
        var pageUrl = window.location.href;
        this.gradientId = 'grad' + object_id_1.default().toString();
        this.gradientFill = "url(" + pageUrl + "#" + this.gradientId + ")";
        this.startOpacity = this.getStartOpacity();
    };
    Bar.prototype.ngOnChanges = function () {
        if (!this.initialized) {
            this.loadAnimation();
            this.initialized = true;
        }
        else {
            this.update();
        }
    };
    Bar.prototype.update = function () {
        this.animateToCurrentForm();
    };
    Bar.prototype.loadAnimation = function () {
        this.path = this.getStartingPath();
        setTimeout(this.update.bind(this), 100);
    };
    Bar.prototype.animateToCurrentForm = function () {
        var node = d3_1.default.select(this.element).select('.bar');
        var path = this.getPath();
        node.transition().duration(750)
            .attr('d', path);
    };
    Bar.prototype.getStartingPath = function () {
        var radius = this.getRadius();
        var path;
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                path = this.roundedRect(this.x, this.y + this.height, this.width, 0, radius, true, true, false, false);
            }
            else if (this.orientation === 'horizontal') {
                path = this.roundedRect(this.x, this.y, 0, this.height, radius, false, true, false, true);
            }
        }
        else {
            if (this.orientation === 'vertical') {
                path = this.roundedRect(this.x, this.y + this.height, this.width, 0, radius, false, false, false, false);
            }
            else if (this.orientation === 'horizontal') {
                path = this.roundedRect(this.x, this.y, 0, this.height, radius, false, false, false, false);
            }
        }
        return path;
    };
    Bar.prototype.getPath = function () {
        var radius = this.getRadius();
        var path;
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                path = this.roundedRect(this.x, this.y, this.width, this.height, radius, true, true, false, false);
            }
            else if (this.orientation === 'horizontal') {
                path = this.roundedRect(this.x, this.y, this.width, this.height, radius, false, true, false, true);
            }
        }
        else {
            path = this.roundedRect(this.x, this.y, this.width, this.height, radius, false, false, false, false);
        }
        return path;
    };
    Bar.prototype.getRadius = function () {
        var radius = 0;
        if (this.roundEdges && this.height > radius && this.width > radius) {
            radius = 5;
        }
        return radius;
    };
    Bar.prototype.getStartOpacity = function () {
        if (this.roundEdges) {
            return 0.2;
        }
        else {
            return 0.5;
        }
    };
    Bar.prototype.roundedRect = function (x, y, w, h, r, tl, tr, bl, br) {
        var retval;
        retval = "M" + (x + r) + "," + y;
        retval += "h" + (w - 2 * r);
        if (tr) {
            retval += "a" + r + "," + r + " 0 0 1 " + r + "," + r;
        }
        else {
            retval += "h" + r;
            retval += "v" + r;
        }
        retval += "v" + (h - 2 * r);
        if (br) {
            retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + r;
        }
        else {
            retval += "v" + r;
            retval += "h" + -r;
        }
        retval += "h" + (2 * r - w);
        if (bl) {
            retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + -r;
        }
        else {
            retval += "h" + -r;
            retval += "v" + -r;
        }
        retval += "v" + (2 * r - h);
        if (tl) {
            retval += "a" + r + "," + r + " 0 0 1 " + r + "," + -r;
        }
        else {
            retval += "v" + -r;
            retval += "h" + r;
        }
        retval += "z";
        return retval;
    };
    Bar.prototype.click = function () {
        this.clickHandler.emit(this.data);
    };
    Bar.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[bar]',
                    template: "\n    <svg:defs *ngIf=\"gradient\">\n      <svg:g svgLinearGradient\n        [color]=\"fill\"\n        [orientation]=\"orientation\"\n        [name]=\"gradientId\"\n        [startOpacity]=\"startOpacity\"\n      />\n    </svg:defs>\n    <svg:path\n      class=\"bar\"\n      stroke=\"none\"\n      [attr.d]=\"path\"\n      [attr.fill]=\"gradient ? gradientFill : fill\"\n      [style.cursor]=\"'pointer'\"\n      (click)=\"click()\"\n    />\n  "
                },] },
    ];
    Bar.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    Bar.propDecorators = {
        'fill': [{ type: core_1.Input },],
        'data': [{ type: core_1.Input },],
        'width': [{ type: core_1.Input },],
        'height': [{ type: core_1.Input },],
        'x': [{ type: core_1.Input },],
        'y': [{ type: core_1.Input },],
        'orientation': [{ type: core_1.Input },],
        'roundEdges': [{ type: core_1.Input },],
        'gradient': [{ type: core_1.Input },],
        'offset': [{ type: core_1.Input },],
        'clickHandler': [{ type: core_1.Output },],
    };
    return Bar;
}());
exports.Bar = Bar;
//# sourceMappingURL=bar.component.js.map