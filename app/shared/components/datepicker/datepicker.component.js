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
var DatepickerComponent = (function () {
    function DatepickerComponent() {
        this.dateModelChange = new core_1.EventEmitter();
        this.showDatepicker = false;
    }
    DatepickerComponent.prototype.showPopup = function () {
        this.showDatepicker = true;
    };
    DatepickerComponent.prototype.today = function () {
        this.dateModel = new Date();
        this.dateModelChange.emit(this.dateModel);
        this.showDatepicker = false;
    };
    DatepickerComponent.prototype.clear = function () {
        this.dateModel = void 0;
        this.showDatepicker = false;
    };
    DatepickerComponent.prototype.hidePopup = function (event) {
        this.showDatepicker = false;
        this.dateModel = event;
        this.dateModelChange.emit(event);
    };
    return DatepickerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], DatepickerComponent.prototype, "dateModel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatepickerComponent.prototype, "label", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DatepickerComponent.prototype, "dateModelChange", void 0);
DatepickerComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'cm-datepicker',
        templateUrl: 'datepicker.component.html',
        styles: ["\n    .popup {\n      position: absolute;\n      background-color: #fff;\n      border-radius: 3px;\n      border: 1px solid #ddd;\n      height: 251px;\n      z-index:2;\n    }\n  "],
    }),
    __metadata("design:paramtypes", [])
], DatepickerComponent);
exports.DatepickerComponent = DatepickerComponent;
//# sourceMappingURL=datepicker.component.js.map