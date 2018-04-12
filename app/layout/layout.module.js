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
var sidebar_component_1 = require("./sidebar/sidebar.component");
var header_component_1 = require("./header/header.component");
var navsearch_component_1 = require("./header/navsearch/navsearch.component");
var offsidebar_component_1 = require("./offsidebar/offsidebar.component");
var userblock_component_1 = require("./sidebar/userblock/userblock.component");
var userblock_service_1 = require("./sidebar/userblock/userblock.service");
var footer_component_1 = require("./footer/footer.component");
var shared_module_1 = require("../shared/shared.module");
var LayoutModule = (function () {
    function LayoutModule() {
    }
    return LayoutModule;
}());
LayoutModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule
        ],
        providers: [
            userblock_service_1.UserblockService
        ],
        declarations: [
            sidebar_component_1.SidebarComponent,
            userblock_component_1.UserblockComponent,
            header_component_1.HeaderComponent,
            navsearch_component_1.NavsearchComponent,
            offsidebar_component_1.OffsidebarComponent,
            footer_component_1.FooterComponent
        ],
        exports: [
            sidebar_component_1.SidebarComponent,
            userblock_component_1.UserblockComponent,
            header_component_1.HeaderComponent,
            navsearch_component_1.NavsearchComponent,
            offsidebar_component_1.OffsidebarComponent,
            footer_component_1.FooterComponent
        ]
    }),
    __metadata("design:paramtypes", [])
], LayoutModule);
exports.LayoutModule = LayoutModule;
//# sourceMappingURL=layout.module.js.map