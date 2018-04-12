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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var filter_service_1 = require("./services/filter.service");
var sorter_service_1 = require("./services/sorter.service");
var trackby_service_1 = require("./services/trackby.service");
var dialog_service_1 = require("./services/dialog.service");
var module_import_guard_1 = require("./module-import-guard");
var validation_service_1 = require("./services/validation.service");
var settings_service_1 = require("./settings/settings.service");
var themes_service_1 = require("./themes/themes.service");
var menu_service_1 = require("./menu/menu.service");
var CoreModule = (function () {
    function CoreModule(parentModule) {
        module_import_guard_1.throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
    return CoreModule;
}());
CoreModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            router_1.RouterModule
        ],
        exports: [
            router_1.RouterModule
        ],
        declarations: [],
        providers: [
            settings_service_1.SettingsService,
            themes_service_1.ThemesService,
            menu_service_1.MenuService,
            sorter_service_1.SorterService,
            filter_service_1.FilterService,
            trackby_service_1.TrackByService,
            dialog_service_1.DialogService,
            validation_service_1.ValidationService
        ]
    }),
    __param(0, core_1.Optional()), __param(0, core_1.SkipSelf()),
    __metadata("design:paramtypes", [CoreModule])
], CoreModule);
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.module.js.map