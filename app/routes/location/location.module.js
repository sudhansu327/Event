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
var location_component_1 = require("./location.component");
var router_1 = require("@angular/router");
var shared_module_1 = require("../../shared/shared.module");
var kendo_angular_grid_1 = require("@progress/kendo-angular-grid");
var kendo_angular_dropdowns_1 = require("@progress/kendo-angular-dropdowns");
var routes = [
    { path: '', component: location_component_1.LocationComponent },
];
var LocationModule = (function () {
    function LocationModule() {
    }
    return LocationModule;
}());
LocationModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild(routes),
            shared_module_1.SharedModule,
            kendo_angular_grid_1.GridModule,
            kendo_angular_dropdowns_1.DropDownsModule
        ],
        declarations: [location_component_1.LocationComponent,],
        exports: [
            router_1.RouterModule
        ]
    }),
    __metadata("design:paramtypes", [])
], LocationModule);
exports.LocationModule = LocationModule;
//# sourceMappingURL=location.module.js.map