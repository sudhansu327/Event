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
var filter_textbox_module_1 = require("./filter-textbox/filter-textbox.module");
var capitalize_pipe_1 = require("./pipes/capitalize.pipe");
var trim_pipe_1 = require("./pipes/trim.pipe");
var datem_pipe_1 = require("./pipes/datem.pipe");
var sortby_directive_1 = require("./directives/sortby.directive");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var datepicker_component_1 = require("./components/datepicker/datepicker.component");
var kendo_angular_dialog_1 = require("@progress/kendo-angular-dialog");
var spinner_service_1 = require("./services/spinner.service");
var spinner_component_1 = require("./services/spinner.component");
var toastr_service_1 = require("./services/toastr.service");
var SharedModule = SharedModule_1 = (function () {
    function SharedModule() {
    }
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule_1
        };
    };
    return SharedModule;
}());
SharedModule = SharedModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            filter_textbox_module_1.FilterTextboxModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            ng2_bootstrap_1.DatepickerModule.forRoot(),
            ng2_bootstrap_1.TimepickerModule.forRoot(),
            kendo_angular_dialog_1.DialogModule,
            ng2_bootstrap_1.TabsModule.forRoot(),
        ],
        exports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            capitalize_pipe_1.CapitalizePipe,
            trim_pipe_1.TrimPipe,
            datem_pipe_1.DatemPipe,
            sortby_directive_1.SortByDirective,
            filter_textbox_module_1.FilterTextboxModule,
            common_1.CommonModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            router_1.RouterModule,
            datepicker_component_1.DatepickerComponent,
            ng2_bootstrap_1.TabsModule,
        ],
        declarations: [
            capitalize_pipe_1.CapitalizePipe,
            trim_pipe_1.TrimPipe,
            datem_pipe_1.DatemPipe,
            sortby_directive_1.SortByDirective,
            datepicker_component_1.DatepickerComponent,
            spinner_component_1.SpinnerComponent
        ],
        providers: [
            spinner_service_1.SpinnerService,
            toastr_service_1.ToastrService
        ],
        entryComponents: [
            spinner_component_1.SpinnerComponent
        ]
    }),
    __metadata("design:paramtypes", [])
], SharedModule);
exports.SharedModule = SharedModule;
var SharedModule_1;
//# sourceMappingURL=shared.module.js.map