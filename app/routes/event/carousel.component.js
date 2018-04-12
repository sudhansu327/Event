"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var CarouselComponent = (function () {
    function CarouselComponent() {
        this.start = false;
        this.current = 0;
        this.isPrevHidden = true;
        this.isNextHidden = true;
    }
    CarouselComponent.prototype.ngOnInit = function () {
        if (this.images.length > 1) {
            this.isNextHidden = false;
        }
    };
    CarouselComponent.prototype.prevClick = function () {
        this.current--;
        this.isPrevHidden = this.current === 0;
        this.isNextHidden = false;
    };
    CarouselComponent.prototype.nextClick = function () {
        this.current++;
        this.isNextHidden = this.current === this.images.length - 1;
        this.isPrevHidden = false;
    };
    CarouselComponent.prototype.isActive = function (eventImageId) {
        return eventImageId === this.images[this.current].EventImageId;
    };
    return CarouselComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], CarouselComponent.prototype, "images", void 0);
CarouselComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "app-carousel",
        templateUrl: 'carousel.component.html'
    }),
    __metadata("design:paramtypes", [])
], CarouselComponent);
exports.CarouselComponent = CarouselComponent;
//# sourceMappingURL=carousel.component.js.map