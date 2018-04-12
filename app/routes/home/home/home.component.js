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
var event_service_1 = require("../../../data/services/event.service");
var spinner_service_1 = require("../../../shared/services/spinner.service");
var HomeComponent = (function () {
    function HomeComponent(injector, dataService, _spinner) {
        this.injector = injector;
        this.dataService = dataService;
        this._spinner = _spinner;
        this.eventData = {
            Title: '', SubTitle: '', ContentType: '', RenderOnHomeScreen: false,
            ActiveDateFrom: new Date(), ActiveDateTo: new Date(), EventFromDate: new Date(), EventToDate: new Date(),
            DisplayEventDate: false, DisplayCountdown: false, GeneralContent: true,
            Locations: [], EventCategoryId: 0, TermsandConditions: '',
            EventLocation: '', SummaryDescription: '', EventCategoryName: '', EventId: 0, EventImages: [],
            DetailTitle: '', DetailDescription: '', MoreInfoText: '', MoreInfoUrl: '', NotificationMessage: '', EventDashboardImage: null
        };
        this.firstEvent = this.eventData;
        this.secondEvent = this.eventData;
        this.thirdEvent = this.eventData;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.router = this.injector.get(router_1.Router);
        this.getEventPromotionCount();
        this.getTopThreeEvents();
    };
    HomeComponent.prototype.getEventPromotionCount = function () {
        var _this = this;
        this.title = "Dashboard";
        this.subtitle = "Welcome to Events and Promotions Dashboard";
        this._spinner.start(this.container);
        this.dataService.getEventPromotionCount()
            .subscribe(function (response) {
            _this.eventsCount = response.EventsCount;
            _this.promotionsCount = response.PromotionsCount;
        }, function (err) { return console.log(err); }, function () {
            _this._spinner.stop();
        });
    };
    HomeComponent.prototype.getTopThreeEvents = function () {
        var _this = this;
        this.dataService.getTopThreeEvents()
            .subscribe(function (response) {
            if (response !== null && response !== undefined) {
                if (response.length > 2)
                    _this.firstEvent = response[2];
                if (response.length > 1)
                    _this.secondEvent = response[1];
                _this.thirdEvent = response[0];
            }
        }, function (err) { return console.log(err); }, function () {
        });
    };
    HomeComponent.prototype.onNavigate = function (content) {
        this.router.navigate(["/eventsDashboard"], { queryParams: { type: content } });
    };
    return HomeComponent;
}());
__decorate([
    core_1.ViewChild('spinner', { read: core_1.ViewContainerRef }),
    __metadata("design:type", core_1.ViewContainerRef)
], HomeComponent.prototype, "container", void 0);
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-home',
        providers: [spinner_service_1.SpinnerService],
        templateUrl: './home.component.html',
        styleUrls: ['home.component.css']
    }),
    __metadata("design:paramtypes", [core_1.Injector, event_service_1.EventService, spinner_service_1.SpinnerService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map