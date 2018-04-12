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
var EventService = (function () {
    function EventService(http) {
        this.http = http;
        this.eventCategoryBaseUrl = 'api/eventcategory';
        this.airportBaseUrl = 'api/Airport';
        this.eventBaseUrl = 'api/Events';
        this.locationLocatorBaseUrl = 'api/LocationLocator';
    }
    EventService.prototype.getEventCategories = function () {
        return this.http.get(this.eventCategoryBaseUrl + '/' + 'GetEventCategories')
            .map(function (res) {
            var eventCategories = res.json();
            return eventCategories;
        })
            .catch(this.handleError);
    };
    EventService.prototype.getAirports = function () {
        return this.http.get(this.airportBaseUrl + '/' + 'GetAirports')
            .map(function (res) {
            var eventCategories = res.json();
            return eventCategories;
        })
            .catch(this.handleError);
    };
    EventService.prototype.addEvent = function (event) {
        return this.http.post(this.eventBaseUrl + '/' + 'AddEvent', event)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    EventService.prototype.getEvents = function () {
        return this.http.get(this.eventBaseUrl + '/' + 'GetAllEvents')
            .map(function (res) {
            var events = res.json();
            return events;
        })
            .catch(this.handleError);
    };
    EventService.prototype.deleteEvent = function (id) {
        return this.http.delete(this.eventBaseUrl + '/' + 'DeleteEvent' + '/' + id)
            .map(function (res) { return res.json().status; })
            .catch(this.handleError);
    };
    EventService.prototype.getEvent = function (eventId) {
        return this.http.get(this.eventBaseUrl + '/' + 'GetEvent' + '/' + eventId)
            .map(function (res) {
            var events = res.json();
            return events;
        })
            .catch(this.handleError);
    };
    EventService.prototype.updateEvent = function (event) {
        return this.http.put(this.eventBaseUrl + '/' + 'UpdateEvent', event)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    EventService.prototype.getAllLocations = function () {
        return this.http.get(this.locationLocatorBaseUrl + '/' + 'GetAllLocations')
            .map(function (res) {
            var events = res.json();
            return events;
        })
            .catch(this.handleError);
    };
    EventService.prototype.getTopThreeEvents = function () {
        return this.http.get(this.eventBaseUrl + '/' + 'GetTopThreeEvents')
            .map(function (res) {
            var events = res.json();
            return events;
        })
            .catch(this.handleError);
    };
    EventService.prototype.handleError = function (error) {
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
    EventService.prototype.insertCategory = function (category) {
        return this.http.post(this.eventCategoryBaseUrl, category)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    EventService.prototype.updateCategory = function (category) {
        return this.http.put(this.eventCategoryBaseUrl + '/' + 'update' + '/' + category.EventCategoryId, category)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    EventService.prototype.getEventPromotionCount = function () {
        return this.http.get(this.eventBaseUrl + '/' + 'GetEventPromotionCount')
            .map(function (res) {
            var events = res.json();
            return events;
        })
            .catch(this.handleError);
    };
    EventService.prototype.getCalendarEvents = function () {
        return this.http.get(this.eventBaseUrl + '/' + 'GetCalendarEvents')
            .map(function (res) {
            var events = res.json();
            return events;
        })
            .catch(this.handleError);
    };
    return EventService;
}());
EventService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], EventService);
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map