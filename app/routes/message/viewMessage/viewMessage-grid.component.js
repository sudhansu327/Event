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
var message_service_1 = require("../../../data/services/message.service");
var toastr_service_1 = require("../../../shared/services/toastr.service");
var router_1 = require("@angular/router");
var ViewMessageGridComponent = (function () {
    function ViewMessageGridComponent(dataService, toastrService, injector) {
        this.dataService = dataService;
        this.toastrService = toastrService;
        this.injector = injector;
        this.loading = true;
        this.draftState = {
            sort: [],
            skip: 0,
            take: 10
        };
        this.historyState = {
            sort: [],
            skip: 0,
            take: 10
        };
        this.scheduledState = {
            sort: [],
            skip: 0,
            take: 10
        };
    }
    ViewMessageGridComponent.prototype.ngOnInit = function () {
        this.getMessages();
        this.router = this.injector.get(router_1.Router);
    };
    ViewMessageGridComponent.prototype.getMessages = function () {
        var _this = this;
        this.dataService.getMessages()
            .subscribe(function (response) {
            _this.draftsMessageList = response.DraftsMessageList;
            _this.historyMessageList = response.HistoryMessageList;
            _this.scheduledMessageList = response.ScheduledMessageList;
        }, function (err) { return console.log(err); }, function () {
            _this.loading = false;
            _this.toastrService.showInfo("Data Loaded");
        });
    };
    ViewMessageGridComponent.prototype.editHandler = function (_a) {
        var sender = _a.sender, rowIndex = _a.rowIndex, dataItem = _a.dataItem;
        this.router.navigate(["/message/createMessage"], { queryParams: { messageId: dataItem.MessageId } });
    };
    ViewMessageGridComponent.prototype.removeHandler = function (_a) {
        var _this = this;
        var dataItem = _a.dataItem;
        this.dataService.deleteMessage(dataItem.MessageId)
            .subscribe(function (response) {
            _this.getMessages();
        }, function (err) { return console.log(err); }, function () {
            _this.toastrService.showSuccess("Deleted Successfully!");
        });
    };
    ViewMessageGridComponent.prototype.pageChange = function (pageIndex) {
        this.draftState.skip = (pageIndex - 1) * this.draftState.take;
    };
    ViewMessageGridComponent.prototype.historyGridPageChange = function (pageIndex) {
        this.historyState.skip = (pageIndex - 1) * this.historyState.take;
    };
    ViewMessageGridComponent.prototype.scheduledGridPageChange = function (pageIndex) {
        this.scheduledState.skip = (pageIndex - 1) * this.scheduledState.take;
    };
    return ViewMessageGridComponent;
}());
ViewMessageGridComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'message-dashboard-grid',
        templateUrl: 'viewMessage-grid.component.html'
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService, toastr_service_1.ToastrService, core_1.Injector])
], ViewMessageGridComponent);
exports.ViewMessageGridComponent = ViewMessageGridComponent;
//# sourceMappingURL=viewMessage-grid.component.js.map