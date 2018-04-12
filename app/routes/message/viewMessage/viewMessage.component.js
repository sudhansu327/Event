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
var ViewMessageComponent = (function () {
    function ViewMessageComponent() {
    }
    ViewMessageComponent.prototype.ngOnInit = function () {
        this.title = "Message Dashboard";
        this.subtitle = "View, edit, and delete messages here.";
    };
    return ViewMessageComponent;
}());
ViewMessageComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'view-message',
        templateUrl: 'viewMessage.component.html',
        styleUrls: ['viewMessage.component.css']
    }),
    __metadata("design:paramtypes", [])
], ViewMessageComponent);
exports.ViewMessageComponent = ViewMessageComponent;
//# sourceMappingURL=viewMessage.component.js.map