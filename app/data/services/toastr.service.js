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
var http_1 = require("@angular/http");
require("../../reactive-extensions");
require("rxjs/add/operator/toPromise");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var ToastrService = (function () {
    function ToastrService(http, toastr, options) {
        this.http = http;
        this.toastr = toastr;
        this.options = options;
        this.options.positionClass = "toast-bottom-right";
        this.options.showCloseButton = true;
    }
    ToastrService.prototype.setContainer = function (vRef) {
        this.toastr.setRootViewContainerRef(vRef);
    };
    ToastrService.prototype.showSuccess = function (message) {
        this.toastr.success(message);
    };
    ToastrService.prototype.showError = function (message) {
        this.toastr.error(message);
    };
    ToastrService.prototype.showInfo = function (message) {
        this.toastr.info(message);
    };
    ToastrService.prototype.showWarning = function (message) {
        this.toastr.warning(message);
    };
    return ToastrService;
}());
ToastrService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        ng2_toastr_1.ToastsManager,
        ng2_toastr_1.ToastOptions])
], ToastrService);
exports.ToastrService = ToastrService;
//# sourceMappingURL=toastr.service.js.map