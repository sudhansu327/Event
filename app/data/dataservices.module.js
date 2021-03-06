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
var http_1 = require("@angular/http");
var module_import_guard_1 = require("../core/module-import-guard");
var event_service_1 = require("./services/event.service");
var eventCategory_service_1 = require("./services/eventCategory.service");
var user_service_1 = require("./services/user.service");
var message_service_1 = require("./services/message.service");
var notificationTag_service_1 = require("./services/notificationTag.service");
var location_service_1 = require("./services/location.service");
var DataServiceModule = (function () {
    function DataServiceModule(parentModule) {
        module_import_guard_1.throwIfAlreadyLoaded(parentModule, 'DataServiceModule');
    }
    return DataServiceModule;
}());
DataServiceModule = __decorate([
    core_1.NgModule({
        imports: [
            http_1.HttpModule
        ],
        exports: [
            http_1.HttpModule
        ],
        providers: [
            event_service_1.EventService, eventCategory_service_1.EventCategoryService, user_service_1.UserService, message_service_1.MessageService, notificationTag_service_1.NotificationTagService,
            location_service_1.LocationService
        ]
    }),
    __param(0, core_1.Optional()), __param(0, core_1.SkipSelf()),
    __metadata("design:paramtypes", [DataServiceModule])
], DataServiceModule);
exports.DataServiceModule = DataServiceModule;
//# sourceMappingURL=dataservices.module.js.map