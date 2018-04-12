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
var http_1 = require("@angular/http");
require("../../reactive-extensions");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/toPromise");
var EventCategoryService = (function () {
    function EventCategoryService(http) {
        this.http = http;
        this.eventCategoryBaseUrl = 'api/EventCategory';
    }
    EventCategoryService.prototype.getEventCategories = function () {
        return this.http.get(this.eventCategoryBaseUrl + '/' + 'GetEventCategories')
            .map(function (res) {
            var eventCategories = res.json();
            return eventCategories;
        })
            .catch(this.handleError);
    };
    EventCategoryService.prototype.insertCategory = function (category) {
        return this.http.post(this.eventCategoryBaseUrl + '/' + 'AddEventCategory', category)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    EventCategoryService.prototype.updateCategory = function (category) {
        return this.http.post(this.eventCategoryBaseUrl + '/' + 'UpdateEventCategory', category)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    EventCategoryService.prototype.deleteCategory = function (id) {
        return this.http.delete(this.eventCategoryBaseUrl + '/' + 'DeleteEventCategory' + '/' + id)
            .map(function (res) { return res.json().status; })
            .catch(this.handleError);
    };
    EventCategoryService.prototype.handleError = function (error) {
        console.error('server error:', error);
        if (error instanceof http_1.Response) {
            var errMessage = '';
            try {
                errMessage = error.json().error;
            }
            catch (err) {
                errMessage = error.statusText;
            }
            return Observable_1.Observable.throw(errMessage);
        }
        return Observable_1.Observable.throw(error || 'server error');
    };
    return EventCategoryService;
}());
EventCategoryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], EventCategoryService);
exports.EventCategoryService = EventCategoryService;
//# sourceMappingURL=eventCategory.service.js.map