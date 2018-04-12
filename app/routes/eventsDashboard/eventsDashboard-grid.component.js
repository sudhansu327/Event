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
var event_service_1 = require("../../data/services/event.service");
var toastr_service_1 = require("../../shared/services/toastr.service");
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var filter_service_1 = require("../../core/services/filter.service");
var moment = require("moment");
var EventsDashboardGridComponent = (function () {
    function EventsDashboardGridComponent(route, dataService, filterService, injector, vRef, toastrService) {
        this.route = route;
        this.dataService = dataService;
        this.filterService = filterService;
        this.injector = injector;
        this.vRef = vRef;
        this.toastrService = toastrService;
        this.filteredEvents = [];
        this.contentTypesList = [];
        this.loading = true;
        this.state = {
            sort: [],
            skip: 0,
            take: 10
        };
    }
    EventsDashboardGridComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router = this.injector.get(router_1.Router);
        this.paramRoute = this.route
            .queryParams
            .subscribe(function (params) {
            _this.contentType = params['type'] || '';
        });
        this.setContentTypeList();
        this.getEvents(this.contentType);
        this.getAllLocations();
    };
    EventsDashboardGridComponent.prototype.setContentTypeList = function () {
        this.contentTypesList = [{ ContentTypeName: 'All' }, { ContentTypeName: 'Event' }, { ContentTypeName: 'Promotion' }];
    };
    EventsDashboardGridComponent.prototype.onContentTypeChange = function (content) {
        var contentName = '';
        if (content !== undefined && content !== null && content.ContentTypeName) {
            contentName = content.ContentTypeName;
        }
        else if (content !== undefined && content !== null) {
            contentName = content;
        }
        this.contentType = contentName;
        if (contentName !== '') {
            this.router.navigate(["/eventsDashboard"], { queryParams: { type: contentName } });
        }
        if (contentName === 'All') {
            this.events = this.filteredEvents = this.eventsMaster;
        }
        this.filterGridData();
    };
    EventsDashboardGridComponent.prototype.getEvents = function (contentType) {
        var _this = this;
        if (contentType === void 0) { contentType = ''; }
        this.dataService.getEvents()
            .subscribe(function (response) {
            for (var i = 0; i < response.length; i++) {
                response[i].EventFromDate = new Date(response[i].EventFromDate.toString());
                response[i].EventToDate = new Date(response[i].EventToDate.toString());
            }
            _this.events = _this.filteredEvents = response;
            _this.eventsMaster = response;
            if (contentType !== "" && contentType !== undefined) {
                _this.onContentTypeChange(contentType);
            }
            else if (_this.contentType !== "" && _this.contentType !== undefined) {
                _this.onContentTypeChange(_this.contentType);
            }
        }, function (err) { return console.log(err); }, function () {
            _this.loading = false;
            _this.toastrService.showInfo("Data Loaded");
        });
    };
    EventsDashboardGridComponent.prototype.getAllLocations = function () {
        var _this = this;
        this.dataService.getAllLocations()
            .subscribe(function (response) {
            _this.locationList = response;
            _this.locationMasterList = response;
        }, function (err) { return console.log(err); });
    };
    EventsDashboardGridComponent.prototype.locationSelection = function (event) {
        this.selectedLocation = event;
        if (event === undefined || event === null) {
            this.locationList = this.locationMasterList;
        }
        this.filterGridData();
    };
    EventsDashboardGridComponent.prototype.locationFilter = function (event) {
        this.locationList = this.locationMasterList
            .filter(function (s) {
            return s.LocationName.toLowerCase().indexOf(event.toLowerCase()) !== -1;
        });
    };
    EventsDashboardGridComponent.prototype.editHandler = function (_a) {
        var sender = _a.sender, rowIndex = _a.rowIndex, dataItem = _a.dataItem;
        this.router.navigate(["/event"], { queryParams: { eventId: dataItem.EventId } });
    };
    EventsDashboardGridComponent.prototype.addHandler = function (_a) {
        var sender = _a.sender;
        this.router.navigate(["/event"]);
    };
    EventsDashboardGridComponent.prototype.closeEditor = function (grid, rowIndex) {
        if (rowIndex === void 0) { rowIndex = this.editedRowIndex; }
        grid.closeRow(rowIndex);
        this.editedRowIndex = undefined;
        this.formGroup = undefined;
    };
    EventsDashboardGridComponent.prototype.removeHandler = function (_a) {
        var _this = this;
        var dataItem = _a.dataItem;
        this.dataService.deleteEvent(dataItem.EventId)
            .subscribe(function (response) {
            _this.getEvents();
        }, function (err) { return console.log(err); }, function () {
            _this.toastrService.showSuccess("Deleted Successfully!");
        });
    };
    EventsDashboardGridComponent.prototype.filterChanged = function (data) {
        if (data && this.filteredEvents) {
            data = data.toUpperCase();
            var props = ['Title', 'SubTitle', 'ContentType', 'EventCategoryName'];
            this.filteredEvents = this.filterService.filter(this.filteredEvents, data, props);
        }
        else {
            this.filterGridData();
        }
    };
    EventsDashboardGridComponent.prototype.onFromDateChange = function (startDate) {
        this.startDate = startDate;
        this.filterGridData();
    };
    EventsDashboardGridComponent.prototype.onToDateChange = function (endDate) {
        this.endDate = endDate;
        this.filterGridData();
    };
    EventsDashboardGridComponent.prototype.resetEventData = function () {
        this.startDate = null;
        this.endDate = null;
        this.filteredEvents = this.eventsMaster;
        this.contentType = "";
        this.locationSelection(null);
        this.router.navigate(["/eventsDashboard"]);
    };
    EventsDashboardGridComponent.prototype.filterGridData = function () {
        var _this = this;
        var isContentFilter = (this.contentType !== 'All' && this.contentType !== "");
        var isStartDateFilter = this.startDate;
        var isEndDateFilter = this.endDate;
        var isLocationFilter = this.selectedLocation;
        var data = this.eventsMaster;
        if (isContentFilter) {
            data = data.filter(function (a) { return a.ContentType === _this.contentType; });
        }
        if (isStartDateFilter) {
            var startDate = moment(this.startDate).format('MM/DD/YYYY');
            data = data.filter(function (a) { return moment(a.EventFromDate).format('MM/DD/YYYY') >= startDate; });
        }
        if (isEndDateFilter) {
            var endDate = moment(this.endDate).format('MM/DD/YYYY');
            data = data.filter(function (a) { return moment(a.EventToDate).format('MM/DD/YYYY') <= endDate; });
        }
        if (isLocationFilter) {
            var locationData = [];
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].Locations.length; j++) {
                    if (data[i].Locations[j].LocationId === this.selectedLocation.LocationId) {
                        if (locationData.indexOf(data[i]) === -1) {
                            locationData.push(data[i]);
                        }
                    }
                }
            }
            data = locationData;
        }
        this.events = this.filteredEvents = data;
    };
    EventsDashboardGridComponent.prototype.ngOnDestroy = function () {
        this.paramRoute.unsubscribe();
    };
    EventsDashboardGridComponent.prototype.sliderChange = function (pageIndex) {
        this.state.skip = (pageIndex - 1) * this.state.take;
    };
    return EventsDashboardGridComponent;
}());
EventsDashboardGridComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'events-dashboard-grid',
        templateUrl: 'eventsDashboard-grid.component.html'
    }),
    __metadata("design:paramtypes", [router_2.ActivatedRoute, event_service_1.EventService, filter_service_1.FilterService, core_1.Injector, core_1.ViewContainerRef, toastr_service_1.ToastrService])
], EventsDashboardGridComponent);
exports.EventsDashboardGridComponent = EventsDashboardGridComponent;
//# sourceMappingURL=eventsDashboard-grid.component.js.map