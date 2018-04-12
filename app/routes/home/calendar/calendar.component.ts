import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import {  IEventCalendarVm } from '../../../shared/interfaces/models';
import { EventService } from '../../../data/services/event.service';
import Models = require("../../../shared/interfaces/models");
declare var $: any;

@Component({
    moduleId: module.id.toString(),
    selector: 'home-calendar',
    templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit, AfterViewInit, OnDestroy {

    $calendar: any;
    calendarOptions: any = {
        // isRTL: true,
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        buttonIcons: { // note the space at the beginning
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
        displayEventTime:false,
        eventClick: this.eventClick.bind(this),
        dayClick: this.dayClick.bind(this)
    };
  
 
    calendarEvents: Array<IEventCalendarVm> = [];
    selectedEvent = null;

    // reference to the calendar element
    @ViewChild('fullcalendar') fullcalendar: ElementRef;

    constructor(private dataService: EventService) {
        this.getCalendarEvents();
        this.calendarOptions.events = this.calendarEvents;
    }

    ngOnInit() {

        this.$calendar = $(this.fullcalendar.nativeElement);
    }

    ngAfterViewInit() {
        // init calendar plugin
        this.$calendar.fullCalendar(this.calendarOptions);
    }

    eventClick(calEvent, jsEvent, view) {

        this.selectedEvent = {
            title: calEvent.title,
            start: calEvent.start,
            url: calEvent.url || ''
        };

        console.log('Event: ' + calEvent.title);
        console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        console.log('View: ' + view.name);

    }

    dayClick(date, jsEvent, view) {
        this.selectedEvent = {
            date: date.format()
        };
    }

    addEvent(event) {
        // store event
        this.calendarEvents.push(event);
        // display event in calendar
        this.$calendar.fullCalendar('renderEvent', event, true);
    }

   
    getCalendarEvents() {
    
        this.dataService.getCalendarEvents()
            .subscribe((response: IEventCalendarVm[]) => {
                
                for (var i = 0; i < response.length; i++) {
                    this.addEvent({
                            title: response[i].title,
                            start: response[i].start,
                            end: response[i].end,
                            backgroundColor: response[i].backgroundColor,
                            borderColor: response[i].backgroundColor
                        }
                    );
                }
              
            });
     
    }

   
    ngOnDestroy() {
        this.$calendar.fullCalendar('destroy');
    }
}
