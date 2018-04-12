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
var event_service_1 = require("../../../data/services/event.service");
var CalendarComponent = (function () {
    function CalendarComponent(dataService) {
        this.dataService = dataService;
        this.calendarOptions = {
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            buttonIcons: {
                prev: ' fa fa-caret-left',
                next: ' fa fa-caret-right'
            },
            buttonText: {
                today: 'today',
                month: 'month',
                week: 'week',
                day: 'day'
            },
            defaultView: 'month',
            editable: true,
            droppable: true,
            displayEventTime: false,
            eventClick: this.eventClick.bind(this),
            dayClick: this.dayClick.bind(this)
        };
        this.calendarEvents = [];
        this.selectedEvent = null;
        this.getCalendarEvents();
        this.calendarOptions.events = this.calendarEvents;
    }
    CalendarComponent.prototype.ngOnInit = function () {
        this.$calendar = $(this.fullcalendar.nativeElement);
    };
    CalendarComponent.prototype.ngAfterViewInit = function () {
        this.$calendar.fullCalendar(this.calendarOptions);
    };
    CalendarComponent.prototype.eventClick = function (calEvent, jsEvent, view) {
        this.selectedEvent = {
            title: calEvent.title,
            start: calEvent.start,
            url: calEvent.url || ''
        };
        console.log('Event: ' + calEvent.title);
        console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        console.log('View: ' + view.name);
    };
    CalendarComponent.prototype.dayClick = function (date, jsEvent, view) {
        this.selectedEvent = {
            date: date.format()
        };
    };
    CalendarComponent.prototype.addEvent = function (event) {
        this.calendarEvents.push(event);
        this.$calendar.fullCalendar('renderEvent', event, true);
    };
    CalendarComponent.prototype.getCalendarEvents = function () {
        var _this = this;
        this.dataService.getCalendarEvents()
            .subscribe(function (response) {
            for (var i = 0; i < response.length; i++) {
                _this.addEvent({
                    title: response[i].title,
                    start: response[i].start,
                    end: response[i].end,
                    backgroundColor: response[i].backgroundColor,
                    borderColor: response[i].backgroundColor
                });
            }
        });
    };
    CalendarComponent.prototype.ngOnDestroy = function () {
        this.$calendar.fullCalendar('destroy');
    };
    return CalendarComponent;
}());
__decorate([
    core_1.ViewChild('fullcalendar'),
    __metadata("design:type", core_1.ElementRef)
], CalendarComponent.prototype, "fullcalendar", void 0);
CalendarComponent = __decorate([
    core_1.Component({
        moduleId: module.id.toString(),
        selector: 'home-calendar',
        templateUrl: './calendar.component.html'
    }),
    __metadata("design:paramtypes", [event_service_1.EventService])
], CalendarComponent);
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=calendar.component.js.map