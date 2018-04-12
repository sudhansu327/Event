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
var EventsDashboardComponent = (function () {
    function EventsDashboardComponent(route, injector) {
        this.route = route;
        this.injector = injector;
    }
    EventsDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router = this.injector.get(router_1.Router);
        this.paramRoute = this.route
            .queryParams
            .subscribe(function (params) {
            _this.contentType = params['type'] || '';
        });
        switch (this.contentType) {
            case "Event":
                this.title = 'Event List';
                this.subtitle = 'Add/Edit and search for event details';
                break;
            case "Promotion":
                this.title = 'Promotion List';
                this.subtitle = 'Add/Edit and search for promotion details';
                break;
            default:
                this.title = 'Event List';
                this.subtitle = 'Add/Edit and search for event details';
                break;
        }
    };
    return EventsDashboardComponent;
}());
EventsDashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'eventsDashboard',
        templateUrl: 'eventsDashboard.component.html',
        styleUrls: ['eventDashboard.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, core_1.Injector])
], EventsDashboardComponent);
exports.EventsDashboardComponent = EventsDashboardComponent;
//# sourceMappingURL=eventsDashboard.component.js.map