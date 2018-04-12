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
var kendo_angular_dropdowns_1 = require("@progress/kendo-angular-dropdowns");
var ng2_tag_input_1 = require("ng2-tag-input");
var ng2_file_upload_1 = require("ng2-file-upload");
var kendo_angular_dateinputs_1 = require("@progress/kendo-angular-dateinputs");
var event_component_1 = require("./event.component");
var shared_module_1 = require("../../shared/shared.module");
var upload_component_1 = require("./upload.component");
var carousel_component_1 = require("./carousel.component");
var kendo_angular_dialog_1 = require("@progress/kendo-angular-dialog");
var routes = [
    { path: '', component: event_component_1.EventComponent }
];
var EventModule = (function () {
    function EventModule() {
    }
    return EventModule;
}());
EventModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild(routes),
            shared_module_1.SharedModule,
            kendo_angular_grid_1.GridModule,
            kendo_angular_dropdowns_1.DropDownsModule,
            ng2_tag_input_1.TagInputModule,
            ng2_file_upload_1.FileUploadModule,
            kendo_angular_dialog_1.DialogModule,
            kendo_angular_dateinputs_1.DateInputsModule
        ],
        declarations: [
            event_component_1.EventComponent,
            upload_component_1.UploadComponent,
            carousel_component_1.CarouselComponent
        ],
        exports: [
            router_1.RouterModule
        ]
    }),
    __metadata("design:paramtypes", [])
], EventModule);
exports.EventModule = EventModule;
//# sourceMappingURL=event.module.js.map