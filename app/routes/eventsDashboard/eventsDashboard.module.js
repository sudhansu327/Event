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
var router_1 = require("@angular/router");
var kendo_angular_grid_1 = require("@progress/kendo-angular-grid");
var eventsDashboard_component_1 = require("./eventsDashboard.component");
var eventsDashboard_grid_component_1 = require("./eventsDashboard-grid.component");
var shared_module_1 = require("../../shared/shared.module");
var kendo_angular_dropdowns_1 = require("@progress/kendo-angular-dropdowns");
var kendo_angular_dateinputs_1 = require("@progress/kendo-angular-dateinputs");
var routes = [
    { path: '', component: eventsDashboard_component_1.EventsDashboardComponent }
];
var EventsDashboardModule = (function () {
    function EventsDashboardModule() {
    }
    return EventsDashboardModule;
}());
EventsDashboardModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild(routes),
            shared_module_1.SharedModule,
            kendo_angular_grid_1.GridModule,
            kendo_angular_dropdowns_1.DropDownsModule,
            kendo_angular_dateinputs_1.DateInputsModule
        ],
        declarations: [
            eventsDashboard_component_1.EventsDashboardComponent,
            eventsDashboard_grid_component_1.EventsDashboardGridComponent
        ],
        exports: [
            router_1.RouterModule
        ]
    }),
    __metadata("design:paramtypes", [])
], EventsDashboardModule);
exports.EventsDashboardModule = EventsDashboardModule;
//# sourceMappingURL=eventsDashboard.module.js.map