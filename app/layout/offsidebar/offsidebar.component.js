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
var settings_service_1 = require("../../core/settings/settings.service");
var themes_service_1 = require("../../core/themes/themes.service");
var OffsidebarComponent = (function () {
    function OffsidebarComponent(settings, themes) {
        this.settings = settings;
        this.themes = themes;
        this.currentTheme = themes.getDefaultTheme();
        this.selectedLanguage = this.getLangs()[0].code;
    }
    OffsidebarComponent.prototype.ngOnInit = function () { };
    OffsidebarComponent.prototype.setTheme = function () {
        this.themes.setTheme(this.currentTheme);
    };
    OffsidebarComponent.prototype.getLangs = function () {
        return [{ code: 'en', text: 'English' }];
    };
    OffsidebarComponent.prototype.setLang = function (value) {
    };
    return OffsidebarComponent;
}());
OffsidebarComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-offsidebar',
        templateUrl: './offsidebar.component.html'
    }),
    __metadata("design:paramtypes", [settings_service_1.SettingsService, themes_service_1.ThemesService])
], OffsidebarComponent);
exports.OffsidebarComponent = OffsidebarComponent;
//# sourceMappingURL=offsidebar.component.js.map