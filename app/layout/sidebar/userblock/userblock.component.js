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
var userblock_service_1 = require("./userblock.service");
var user_service_1 = require("../../../data/services/user.service");
var UserblockComponent = (function () {
    function UserblockComponent(userblockService, userService) {
        this.userblockService = userblockService;
        this.userService = userService;
        this.user = {
            DisplayName: '',
            FirstName: '',
            LastName: '',
            ImageString: '',
            UserId: ''
        };
    }
    UserblockComponent.prototype.ngOnInit = function () {
        this.getUserInformation();
    };
    UserblockComponent.prototype.getUserInformation = function () {
        var _this = this;
        this.userService.getUser()
            .subscribe(function (response) {
            _this.user = response;
        }, function (err) { return console.log(err); }, function () {
            console.log('Retrieved user Info');
        });
    };
    UserblockComponent.prototype.userBlockIsVisible = function () {
        return this.userblockService.getVisibility();
    };
    return UserblockComponent;
}());
UserblockComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-userblock',
        templateUrl: './userblock.component.html'
    }),
    __metadata("design:paramtypes", [userblock_service_1.UserblockService, user_service_1.UserService])
], UserblockComponent);
exports.UserblockComponent = UserblockComponent;
//# sourceMappingURL=userblock.component.js.map