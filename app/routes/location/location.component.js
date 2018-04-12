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
var forms_1 = require("@angular/forms");
var location_service_1 = require("../../data/services/location.service");
var toastr_service_1 = require("../../shared/services/toastr.service");
var router_1 = require("@angular/router");
var Rx_1 = require("rxjs/Rx");
var LocationComponent = (function () {
    function LocationComponent(injector, dataService, toastrService) {
        this.injector = injector;
        this.dataService = dataService;
        this.toastrService = toastrService;
    }
    LocationComponent.prototype.ngOnInit = function () {
        this.title = "Location Administration";
        this.subtitle = "Update Location Geofence Mapping";
        this.router = this.injector.get(router_1.Router);
        this.pageSize = 10;
        this.state = {
            sort: [],
            skip: 0,
            take: 10,
        };
        this.getPageData();
    };
    LocationComponent.prototype.getPageData = function () {
        var _this = this;
        var geofenceObservable = this.dataService.getGeofences();
        var locationObservable = this.dataService.getAllLocations();
        Rx_1.Observable.forkJoin([locationObservable, geofenceObservable])
            .subscribe(function (response) {
            _this.locationList = response[0];
            _this.geofenceList = response[1];
        }, function (err) { return console.log(err); }, function () {
            _this.loadGridView();
            _this.toastrService.showInfo("Data Loaded");
        });
    };
    LocationComponent.prototype.pageChange = function (event) {
        this.state.skip = event.skip;
        this.loadGridView();
    };
    LocationComponent.prototype.loadGridView = function () {
        this.state.take == Number(this.state.take);
        this.gridView = {
            data: this.locationList.slice(this.state.skip, (this.state.skip + this.state.take)),
            total: this.locationList.length
        };
        var test = this.locationList.slice(this.state.skip, (this.state.skip + this.state.take));
    };
    LocationComponent.prototype.editHandler = function (_a) {
        var _this = this;
        var sender = _a.sender, rowIndex = _a.rowIndex, dataItem = _a.dataItem;
        this.rowIndex = rowIndex;
        this.formGroup = new forms_1.FormGroup({
            'GeofenceName': new forms_1.FormControl(dataItem.GimbalGeofenceId, forms_1.Validators.required),
            'LocationName': new forms_1.FormControl(dataItem.LocationName, forms_1.Validators.required)
        });
        var editedRowIndex = rowIndex;
        sender.editRow(rowIndex, this.formGroup);
        setTimeout(function () { return _this.focusFirstCell(); });
    };
    LocationComponent.prototype.addHandler = function (_a) {
        var sender = _a.sender, rowIndex = _a.rowIndex, dataItem = _a.dataItem;
        this.router.navigate(["/location"]);
    };
    LocationComponent.prototype.cancelHandler = function (_a) {
        var sender = _a.sender, rowIndex = _a.rowIndex;
        sender.closeRow(rowIndex);
        this.gimbalGeofenceId = null;
    };
    LocationComponent.prototype.saveHandler = function (_a) {
        var _this = this;
        var sender = _a.sender, rowIndex = _a.rowIndex, dataItem = _a.dataItem, formGroup = _a.formGroup;
        if (!sender._pristine) {
            var location = this.gridView.data[rowIndex];
            this.dataService.updateLocationGeofence(location)
                .subscribe(function (response) {
                _this.gridView.data[rowIndex] = response;
            });
        }
    };
    LocationComponent.prototype.locationFill = function (event) {
        this.locationComboBoxList = this.locationList;
    };
    LocationComponent.prototype.locationSelection = function (event) {
        if (event === undefined || event === null) {
            this.gridView.data = this.locationList;
            return;
        }
        this.gridView.data = this.locationList.filter(function (loc) { return loc.LocationId === event.LocationId; });
    };
    LocationComponent.prototype.locationFilter = function (event) {
        this.locationComboBoxList = this.locationList
            .filter(function (s) {
            return s.LocationName.toLowerCase().indexOf(event.toLowerCase()) !== -1;
        });
        this.gridView.data = this.locationComboBoxList;
    };
    LocationComponent.prototype.onSearchButtonClick = function () {
        var _this = this;
        try {
            this.gridView.data = this.locationList
                .filter(function (l) {
                return (l.LocationName != null && l.LocationName.toLowerCase().indexOf(_this.searchText.toLowerCase()) !== -1) ||
                    (l.LocationAddress != null && l.LocationAddress.toLowerCase().indexOf(_this.searchText.toLowerCase()) !== -1) ||
                    (l.AirPortCity != null && l.AirPortCity.toLowerCase().indexOf(_this.searchText.toLowerCase()) !== -1) ||
                    (l.AirPortCode != null && l.AirPortCode.toLowerCase().indexOf(_this.searchText.toLowerCase()) !== -1) ||
                    (l.AirPortState != null && l.AirPortState.toLowerCase().indexOf(_this.searchText.toLowerCase()) !== -1) ||
                    (l.Email != null && l.Email.toLowerCase().indexOf(_this.searchText.toLowerCase()) !== -1) ||
                    (l.FuelBrand != null && l.FuelBrand.toLowerCase().indexOf(_this.searchText.toLowerCase()) !== -1) ||
                    (l.LocationId != null && l.LocationId.toString().indexOf(_this.searchText) !== -1) ||
                    (l.ZipCode != null && l.ZipCode.toLowerCase().indexOf(_this.searchText.toLowerCase()) !== -1) ||
                    (l.Services != null && l.Services.findIndex(function (s) { return s.toLowerCase() == _this.searchText.toLowerCase(); }) !== -1);
            });
        }
        catch (error) {
            console.log(error);
        }
        if (this.searchText == null || this.searchText == "") {
            this.gridView.data == this.locationList;
        }
    };
    LocationComponent.prototype.geofenceSelection = function (event, rowIndex, sender, formGroup, dataItem) {
        if (event === undefined || event === null) {
            return;
        }
        this.formGroup.controls.GeofenceName.setValue(event.GeofenceId);
        this.gimbalGeofenceId = event.GeofenceId;
        var test = formGroup;
    };
    LocationComponent.prototype.geofenceFilter = function (event) {
        this.geofenceComboBoxList = this.geofenceList
            .filter(function (s) {
            return s.GeofenceName.toLowerCase().indexOf(event.toLowerCase()) !== -1;
        });
    };
    LocationComponent.prototype.geofenceFill = function (event) {
        this.geofenceComboBoxList = this.geofenceList;
    };
    LocationComponent.prototype.focusFirstCell = function () {
        var element = document.querySelector('.k-grid-content .k-grid-edit-row input.ng-pristine');
        element.focus();
    };
    return LocationComponent;
}());
LocationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'location-component',
        templateUrl: 'location.component.html',
        styleUrls: ['location.component.css']
    }),
    __metadata("design:paramtypes", [core_1.Injector, location_service_1.LocationService, toastr_service_1.ToastrService])
], LocationComponent);
exports.LocationComponent = LocationComponent;
//# sourceMappingURL=location.component.js.map