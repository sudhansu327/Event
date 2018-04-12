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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/platform-browser/animations");
var layout_component_1 = require("./layout/layout.component");
var routes_module_1 = require("./routes/routes.module");
var core_module_1 = require("./core/core.module");
var dataservices_module_1 = require("./data/dataservices.module");
var shared_module_1 = require("./shared/shared.module");
var layout_module_1 = require("./layout/layout.module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            animations_1.BrowserAnimationsModule,
            platform_browser_1.BrowserModule,
            layout_module_1.LayoutModule,
            forms_1.FormsModule,
            routes_module_1.RoutesModule,
            core_module_1.CoreModule,
            dataservices_module_1.DataServiceModule,
            shared_module_1.SharedModule.forRoot()
        ],
        declarations: [layout_component_1.LayoutComponent],
        bootstrap: [layout_component_1.LayoutComponent]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map