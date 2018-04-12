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
var message_component_1 = require("./message.component");
var shared_module_1 = require("../../shared/shared.module");
var kendo_angular_grid_1 = require("@progress/kendo-angular-grid");
var ng2_tag_input_1 = require("ng2-tag-input");
var viewMessage_grid_component_1 = require("./viewMessage/viewMessage-grid.component");
var viewMessage_component_1 = require("./viewMessage/viewMessage.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var kendo_angular_dateinputs_1 = require("@progress/kendo-angular-dateinputs");
var kendo_angular_dropdowns_1 = require("@progress/kendo-angular-dropdowns");
var routes = [
    { path: 'messageDashboard', component: viewMessage_component_1.ViewMessageComponent },
    { path: 'createMessage', component: message_component_1.MessageComponent }
];
var MessageModule = (function () {
    function MessageModule() {
    }
    return MessageModule;
}());
MessageModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild(routes),
            shared_module_1.SharedModule,
            kendo_angular_grid_1.GridModule,
            ng2_tag_input_1.TagInputModule,
            ng2_bootstrap_1.TimepickerModule,
            kendo_angular_dateinputs_1.DateInputsModule,
            kendo_angular_dropdowns_1.DropDownsModule
        ],
        declarations: [
            message_component_1.MessageComponent,
            viewMessage_grid_component_1.ViewMessageGridComponent,
            viewMessage_component_1.ViewMessageComponent
        ],
        exports: [
            router_1.RouterModule
        ]
    }),
    __metadata("design:paramtypes", [])
], MessageModule);
exports.MessageModule = MessageModule;
//# sourceMappingURL=message.module.js.map