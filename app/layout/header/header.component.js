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
var browser = require('jquery.browser');
var userblock_service_1 = require("../sidebar/userblock/userblock.service");
var settings_service_1 = require("../../core/settings/settings.service");
var HeaderComponent = (function () {
    function HeaderComponent(userblockService, settings, rd) {
        this.userblockService = userblockService;
        this.settings = settings;
        this.rd = rd;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.isNavSearchVisible = false;
        if (browser.msie) {
        }
    };
    HeaderComponent.prototype.toggleUserBlock = function (event) {
        event.preventDefault();
        this.userblockService.toggleVisibility();
    };
    HeaderComponent.prototype.openNavSearch = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.setNavSearchVisible(true);
    };
    HeaderComponent.prototype.setNavSearchVisible = function (stat) {
        this.isNavSearchVisible = stat;
    };
    HeaderComponent.prototype.getNavSearchVisible = function () {
        return this.isNavSearchVisible;
    };
    HeaderComponent.prototype.toggleOffsidebar = function () {
        this.settings.layout.offsidebarOpen = !this.settings.layout.offsidebarOpen;
    };
    HeaderComponent.prototype.toggleCollapsedSideabar = function () {
        this.settings.layout.isCollapsed = !this.settings.layout.isCollapsed;
    };
    HeaderComponent.prototype.isCollapsedText = function () {
        return this.settings.layout.isCollapsedText;
    };
    return HeaderComponent;
}());
__decorate([
    core_1.ViewChild('fsbutton'),
    __metadata("design:type", core_1.ElementRef)
], HeaderComponent.prototype, "fsbutton", void 0);
HeaderComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-header',
        templateUrl: './header.component.html'
    }),
    __metadata("design:paramtypes", [userblock_service_1.UserblockService, settings_service_1.SettingsService, core_1.Renderer])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map