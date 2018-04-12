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
var event_service_1 = require("../../data/services/event.service");
var router_2 = require("@angular/router");
var Rx_1 = require("rxjs/Rx");
var toastr_service_1 = require("../../shared/services/toastr.service");
var spinner_service_1 = require("../../shared/services/spinner.service");
var upload_component_1 = require("./upload.component");
var EventComponent = (function () {
    function EventComponent(route, dataService, injector, vRef, toastrService, _spinner) {
        this.route = route;
        this.dataService = dataService;
        this.injector = injector;
        this.vRef = vRef;
        this.toastrService = toastrService;
        this._spinner = _spinner;
        this.isEditMode = false;
        this.selectedLocation = [];
        this.associatedImages = [];
        this.existingThumbnailImgCount = 0;
        this.existingDetailImgCount = 0;
        this.event = {
            Title: '', SubTitle: '', ContentType: '', RenderOnHomeScreen: false,
            ActiveDateFrom: new Date(), ActiveDateTo: new Date(), EventFromDate: new Date(), EventToDate: new Date(),
            DisplayEventDate: false, DisplayCountdown: false, GeneralContent: true,
            Locations: [], EventCategoryId: 0,
            EventLocation: '', SummaryDescription: '', EventCategoryName: '', EventId: 0, EventImages: [], TermsandConditions: '',
            DetailTitle: '', DetailDescription: '', MoreInfoText: '', MoreInfoUrl: '', NotificationMessage: '', EventDashboardImage: null,
        };
        this.opened = false;
        this.imageTitle = '';
        this.noImages = false;
    }
    EventComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadInitialData();
        this.router = this.injector.get(router_2.Router);
        this.paramRoute = this.route
            .queryParams
            .subscribe(function (params) {
            _this.event.EventId = +params['eventId'] || 0;
        });
        if (this.event.EventId > 0) {
            this.isEditMode = true;
            this.title = 'Edit Event';
            this.subtitle = 'Update event here';
            this.getEvent(this.event.EventId);
        }
        else {
            this.title = 'Add Event';
            this.subtitle = 'Create new event here';
        }
    };
    EventComponent.prototype.filterChange = function (filter) {
        this.filterData = this.locationList.filter(function (s) { return s.LocationName.toLowerCase().indexOf(filter.toLowerCase()) !== -1; });
    };
    EventComponent.prototype.loadInitialData = function () {
        var _this = this;
        this._spinner.start(this.container);
        var locationList = this.dataService.getAllLocations();
        var categoryList = this.dataService.getEventCategories();
        Rx_1.Observable.forkJoin([locationList, categoryList])
            .subscribe(function (response) {
            _this.locationList = response[0];
            _this.categories = response[1];
            _this.filterData = _this.locationList;
        }, function (err) {
            console.log(err);
            _this.toastrService.showError("An error has occured");
        }, function () {
            _this._spinner.stop();
        });
    };
    EventComponent.prototype.ngOnDestroy = function () {
        this.paramRoute.unsubscribe();
    };
    EventComponent.prototype.getEvent = function (eventId) {
        var _this = this;
        this.dataService.getEvent(eventId)
            .subscribe(function (response) {
            _this.event = response;
            _this.associatedImages = _this.event.EventImages.map(function (x) { return Object.assign({}, x); });
            _this.loadLocationSpecificDataForEvent(_this.event.Locations);
            _this.event.EventImages.forEach(function (item) {
                if (item.ImageType === 'Detail') {
                    _this.existingDetailImgCount++;
                }
                else if (item.ImageType === 'Thumbnail') {
                    _this.existingThumbnailImgCount++;
                }
            });
        }, function (err) { return console.log(err); }, function () {
            console.log('Retrieved event');
        });
    };
    EventComponent.prototype.loadLocationSpecificDataForEvent = function (eventLocations) {
        for (var i = 0; i < eventLocations.length; i++) {
            this.selectedLocation.push({ LocationId: eventLocations[i].LocationId, LocationName: eventLocations[i].LocationName, LocationNameAirportCode: eventLocations[i].LocationNameAirportCode });
        }
    };
    EventComponent.prototype.deleteAttachment = function (data) {
        if (data.ImageType === 'Thumbnail') {
            this.existingThumbnailImgCount--;
        }
        this.event.EventImages.splice(this.event.EventImages.indexOf(data), 1);
        if (this.event.EventImages.length == 1 && this.event.EventImages[0].ImageType === 'Thumbnail') {
            this.existingDetailImgCount--;
        }
    };
    EventComponent.prototype.saveEvent = function () {
        this.uploadComponent.imageList.forEach(function (item) {
            item.ImageType = 'Detail';
        });
        this.event.EventImages = this.event.EventImages.concat(this.uploadComponent.imageList);
        if (this.uploadComponent.thmbnlImg) {
            this.uploadComponent.thmbnlImg.ImageType = 'Thumbnail';
            this.event.EventImages.push(this.uploadComponent.thmbnlImg);
        }
        this.event.Locations = [];
        if (this.selectedLocation && this.selectedLocation.length > 0) {
            for (var i = 0; i < this.selectedLocation.length; i++) {
                this.event.Locations.push({
                    LocationId: this.selectedLocation[i].LocationId, LocationName: this.selectedLocation[i].LocationName, LocationNameAirportCode: this.selectedLocation[i].LocationNameAirportCode
                });
            }
        }
        if (this.event.EventId > 0) {
            this.updateEvent();
        }
        else {
            this.addEvent();
        }
    };
    EventComponent.prototype.addEvent = function () {
        var _this = this;
        this.associatedImages = [];
        this._spinner.start(this.container);
        this.event.GeneralContent = !(this.selectedLocation && this.selectedLocation.length > 0);
        this.dataService.addEvent(this.event)
            .subscribe(function (insertedEvent) {
            _this.associatedImages = insertedEvent.EventImages;
            if (insertedEvent) {
                _this.toastrService.showSuccess("Add successful");
            }
            else {
                _this.toastrService.showWarning("Unable to add Event");
            }
        }, function (err) {
            _this.toastrService.showError("An error has occured");
            _this._spinner.stop();
            console.log(err);
        }, function () { _this._spinner.stop(); });
    };
    EventComponent.prototype.updateEvent = function () {
        var _this = this;
        this.event.TermsandConditions = this.event.ContentType === 'Event' ? '' : this.event.TermsandConditions;
        this._spinner.start(this.container);
        this.event.GeneralContent = !(this.selectedLocation && this.selectedLocation.length > 0);
        this.dataService.updateEvent(this.event)
            .subscribe(function (updatedEvent) {
            if (updatedEvent) {
                _this.toastrService.showSuccess("Update successful");
            }
            else {
                _this.toastrService.showWarning("Unable to update Event");
            }
        }, function (err) {
            _this.toastrService.showError("An error has occured");
            _this._spinner.stop();
        }, function () { _this._spinner.stop(); });
    };
    EventComponent.prototype.validateImageUpload = function () {
        var detailImgCnt = 0;
        var thmbnlImgCnt = 0;
        this.event.EventImages.forEach(function (item) {
            if (item.ImageType === 'Detail') {
                detailImgCnt++;
            }
            else if (item.ImageType === 'Thumbnail') {
                thmbnlImgCnt++;
            }
        });
        if ((this.uploadComponent.imageList.length > 0 || detailImgCnt > 0) && (this.uploadComponent.thmbnlImg != null || thmbnlImgCnt > 0)) {
            this.saveEvent();
        }
        else {
            this.noImages = true;
        }
    };
    EventComponent.prototype.clickThumbnail = function (clickedImg) {
        this.opened = true;
        this.detailImage = clickedImg.Image;
        this.imageTitle = clickedImg.ImageName;
    };
    EventComponent.prototype.closeDialog = function () {
        this.opened = false;
        this.detailImage = '';
    };
    EventComponent.prototype.closeImageValidationDialog = function () {
        this.noImages = false;
    };
    EventComponent.prototype.resetEventData = function () {
        this.event = {
            Title: '', SubTitle: '', ContentType: '', RenderOnHomeScreen: false,
            ActiveDateFrom: new Date(), ActiveDateTo: new Date(), EventFromDate: new Date(), EventToDate: new Date(),
            DisplayEventDate: false, DisplayCountdown: false, GeneralContent: true,
            Locations: [], EventCategoryId: 0,
            EventLocation: '', SummaryDescription: '', EventCategoryName: '', EventId: 0, EventImages: [], TermsandConditions: '',
            DetailTitle: '', DetailDescription: '', MoreInfoText: '', MoreInfoUrl: '', NotificationMessage: '', EventDashboardImage: null
        };
        this.selectedLocation = [];
    };
    EventComponent.prototype.onBackClick = function () {
        this.router.navigate(["/eventsDashboard"]);
    };
    ;
    return EventComponent;
}());
__decorate([
    core_1.ViewChild('spinner', { read: core_1.ViewContainerRef }),
    __metadata("design:type", core_1.ViewContainerRef)
], EventComponent.prototype, "container", void 0);
__decorate([
    core_1.ViewChild(upload_component_1.UploadComponent),
    __metadata("design:type", upload_component_1.UploadComponent)
], EventComponent.prototype, "uploadComponent", void 0);
EventComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'cm-event',
        providers: [spinner_service_1.SpinnerService],
        templateUrl: 'event.component.html',
        styleUrls: ['event.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        event_service_1.EventService,
        core_1.Injector,
        core_1.ViewContainerRef,
        toastr_service_1.ToastrService,
        spinner_service_1.SpinnerService])
], EventComponent);
exports.EventComponent = EventComponent;
//# sourceMappingURL=event.component.js.map