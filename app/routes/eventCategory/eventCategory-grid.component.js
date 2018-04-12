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
var eventCategory_service_1 = require("../../data/services/eventCategory.service");
var toastr_service_1 = require("../../shared/services/toastr.service");
var EventCategoryGridComponent = (function () {
    function EventCategoryGridComponent(dataService, toastrService) {
        this.dataService = dataService;
        this.toastrService = toastrService;
        this.loading = true;
        this.eventCategory = {
            EventCategoryId: 0,
            EventCategoryName: ''
        };
        this.state = {
            sort: [],
            skip: 0,
            take: 10
        };
    }
    EventCategoryGridComponent.prototype.ngOnInit = function () {
        this.getEventCategories();
    };
    EventCategoryGridComponent.prototype.editHandler = function (_a) {
        var _this = this;
        var sender = _a.sender, rowIndex = _a.rowIndex, dataItem = _a.dataItem;
        this.formGroup = new forms_1.FormGroup({
            'EventCategoryName': new forms_1.FormControl(dataItem.EventCategoryName, forms_1.Validators.required),
        });
        this.editedRowIndex = rowIndex;
        sender.editRow(rowIndex, this.formGroup);
        setTimeout(function () { return _this.focusFirstCell(); });
    };
    EventCategoryGridComponent.prototype.addHandler = function (_a) {
        var _this = this;
        var sender = _a.sender;
        this.closeEditor(sender);
        this.formGroup = new forms_1.FormGroup({
            'EventCategoryName': new forms_1.FormControl("", forms_1.Validators.required),
        });
        sender.addRow(this.formGroup);
        setTimeout(function () { return _this.focusFirstCell(); });
    };
    EventCategoryGridComponent.prototype.closeEditor = function (grid, rowIndex) {
        if (rowIndex === void 0) { rowIndex = this.editedRowIndex; }
        grid.closeRow(rowIndex);
        this.editedRowIndex = undefined;
        this.formGroup = undefined;
    };
    EventCategoryGridComponent.prototype.cancelHandler = function (_a) {
        var sender = _a.sender, rowIndex = _a.rowIndex;
        this.closeEditor(sender, rowIndex);
    };
    EventCategoryGridComponent.prototype.getEventCategories = function () {
        var _this = this;
        this.dataService.getEventCategories()
            .subscribe(function (response) {
            _this.eventCategories = response;
        }, function (err) { return console.log(err); }, function () {
            _this.loading = false;
            _this.toastrService.showInfo("Data Loaded");
        });
    };
    EventCategoryGridComponent.prototype.saveHandler = function (_a) {
        var _this = this;
        var sender = _a.sender, rowIndex = _a.rowIndex, formGroup = _a.formGroup, isNew = _a.isNew;
        var category = formGroup.value;
        if (!sender._pristine) {
            if (isNew) {
                this.dataService.insertCategory(category)
                    .subscribe(function (response) { return _this.getEventCategories(); });
            }
            else {
                category.EventCategoryId = this.eventCategories[rowIndex].EventCategoryId;
                this.dataService.updateCategory(category)
                    .subscribe(function (response) { return _this.getEventCategories(); });
            }
        }
        sender.closeRow(rowIndex);
        this.toastrService.showSuccess("Success");
    };
    EventCategoryGridComponent.prototype.removeHandler = function (_a) {
        var _this = this;
        var dataItem = _a.dataItem;
        this.dataService.deleteCategory(dataItem.EventCategoryId)
            .subscribe(function (response) {
            _this.getEventCategories();
        }, function (err) { return console.log(err); }, function () {
            _this.toastrService.showSuccess("Deleted Successfully!");
        });
    };
    EventCategoryGridComponent.prototype.sliderChange = function (pageIndex) {
        this.state.skip = (pageIndex - 1) * this.state.take;
    };
    EventCategoryGridComponent.prototype.focusFirstCell = function () {
        var element = document.querySelector('.k-grid-content .k-grid-edit-row input.ng-pristine');
        element.focus();
    };
    return EventCategoryGridComponent;
}());
EventCategoryGridComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'event-categories-grid',
        templateUrl: 'eventCategory-grid.component.html'
    }),
    __metadata("design:paramtypes", [eventCategory_service_1.EventCategoryService, toastr_service_1.ToastrService])
], EventCategoryGridComponent);
exports.EventCategoryGridComponent = EventCategoryGridComponent;
//# sourceMappingURL=eventCategory-grid.component.js.map