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
var FboComponent = (function () {
    function FboComponent(injector, dataService, toastrService) {
        this.injector = injector;
        this.dataService = dataService;
        this.toastrService = toastrService;
    }
    FboComponent.prototype.ngOnInit = function () {
        this.title = "Fbo Administration";
        this.subtitle = "Update Fbo Geofence Mapping";
        this.router = this.injector.get(router_1.Router);
        this.pageSize = 10;
        this.state = {
            sort: [],
            skip: 0,
            take: 10,
        };
        this.getPageData();
    };
    FboComponent.prototype.getPageData = function () {
        var _this = this;
        var geofenceObservable = this.dataService.getGeofences();
        var fboObservable = this.dataService.getAllLocations();
        Rx_1.Observable.forkJoin([fboObservable, geofenceObservable])
            .subscribe(function (response) {
            _this.fboList = response[0];
            _this.geofenceList = response[1];
        }, function (err) { return console.log(err); }, function () {
            _this.loadGridView();
            _this.toastrService.showInfo("Data Loaded");
        });
    };
    FboComponent.prototype.pageChange = function (event) {
        this.state.skip = event.skip;
        this.loadGridView();
    };
    FboComponent.prototype.loadGridView = function () {
        this.gridView = {
            data: this.fboList.slice(this.state.skip, this.state.skip + this.pageSize),
            total: this.fboList.length
        };
    };
    FboComponent.prototype.editHandler = function (_a) {
        var sender = _a.sender, rowIndex = _a.rowIndex, dataItem = _a.dataItem;
        this.formGroup = new forms_1.FormGroup({
            'GeofenceName': new forms_1.FormControl(dataItem.GeofenceId, forms_1.Validators.required),
        });
        var editedRowIndex = rowIndex;
        sender.editRow(rowIndex, this.formGroup);
    };
    FboComponent.prototype.testHandler = function (event) {
        var test = "hey, got here";
    };
    FboComponent.prototype.cancelHandler = function (_a) {
        var sender = _a.sender, rowIndex = _a.rowIndex;
        sender.closeRow(rowIndex);
    };
    FboComponent.prototype.saveHandler = function (_a) {
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
    FboComponent.prototype.fboSelection = function (event) {
        if (event === undefined || event === null) {
            this.gridView.data = this.fboList;
            return;
        }
        this.gridView.data = this.fboList.filter(function (fbo) { return fbo.LocationId === event.LocationId; });
    };
    FboComponent.prototype.geofenceSelection = function (event, rowIndex, sender) {
        if (event === undefined || event === null) {
            return;
        }
        this.gridView.data[rowIndex].GeofenceId = event.GeofenceId;
    };
    FboComponent.prototype.fboFilter = function (event) {
        this.fboComboBoxList = this.fboList
            .filter(function (s) {
            return s.LocationName.toLowerCase().indexOf(event.toLowerCase()) !== -1;
        });
    };
    FboComponent.prototype.geofenceFilter = function (event) {
        this.geofenceComboBoxList = this.geofenceList
            .filter(function (s) {
            return s.GeofenceName.toLowerCase().indexOf(event.toLowerCase()) !== -1;
        });
    };
    FboComponent.prototype.fboFill = function (event) {
        this.fboComboBoxList = this.fboList;
    };
    FboComponent.prototype.geofenceFill = function (event) {
        this.geofenceComboBoxList = this.geofenceList;
    };
    return FboComponent;
}());
FboComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'fbo-component',
        templateUrl: 'fbo.component.html',
        styleUrls: ['fbo.component.css']
    }),
    __metadata("design:paramtypes", [core_1.Injector, location_service_1.LocationService, toastr_service_1.ToastrService])
], FboComponent);
exports.FboComponent = FboComponent;
//# sourceMappingURL=fbo.component.js.map