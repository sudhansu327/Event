import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import '../../reactive-extensions';

//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';


import { IEventCategory, IAirport, IEvent, IEventPromotionVm, ILocation, IEventCalendarVm} from '../../shared/interfaces/models';
import Models = require("../../shared/interfaces/models");

@Injectable()
export class EventService {

    eventCategoryBaseUrl: string = 'api/eventcategory';
    airportBaseUrl: string = 'api/Airport';
    eventBaseUrl: string = 'api/Events';
    locationLocatorBaseUrl: string = 'api/LocationLocator';

    constructor(private http: Http) { }

    //fetch event categories to disply in Create Event page
    getEventCategories(): Observable<IEventCategory[]> {
        return this.http.get(this.eventCategoryBaseUrl + '/' + 'GetEventCategories')
            .map((res: Response) => {
                let eventCategories = res.json();
                return eventCategories;
            })
            .catch(this.handleError);
    }

    //fetch location to disply in Create Event page
    getAirports(): Observable<IAirport[]> {
        return this.http.get(this.airportBaseUrl + '/' + 'GetAirports')
            .map((res: Response) => {
                let eventCategories = res.json();
                return eventCategories;
            })
            .catch(this.handleError);
    }

    //Create an Event
    addEvent(event: IEvent): Observable<IEvent> {
        return this.http.post(this.eventBaseUrl + '/' +'AddEvent', event)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    //Get All events
    getEvents(): Observable<IEvent[]> {
        return this.http.get(this.eventBaseUrl + '/' + 'GetAllEvents')
            .map((res: Response) => {
                let events = res.json();
                return events;
            })
            .catch(this.handleError);
    }
    deleteEvent(id: number): Observable<boolean> {
        return this.http.delete(this.eventBaseUrl + '/' + 'DeleteEvent' + '/' + id)
            .map((res: Response) => res.json().status)
            .catch(this.handleError);
    }

    //Get Event by EventId
    getEvent(eventId:number): Observable<IEvent> {
        return this.http.get(this.eventBaseUrl + '/' + 'GetEvent' + '/' + eventId)
            .map((res: Response) => {
                let events = res.json();
                return events;
            })
            .catch(this.handleError);
    }
    //Update an Event
    updateEvent(event: IEvent): Observable<IEvent> {
        return this.http.put(this.eventBaseUrl + '/' + 'UpdateEvent', event)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    //Get All LOCATION
    getAllLocations(): Observable<ILocation[]> {
        return this.http.get(this.locationLocatorBaseUrl + '/' + 'GetAllLocations')
            .map((res: Response) => {
                let events = res.json();
                return events;
            })
            .catch(this.handleError);
    }
    //Get Top Three Events
    getTopThreeEvents(): Observable<Models.IEvent[]> {
        return this.http.get(this.eventBaseUrl + '/' + 'GetTopThreeEvents')
            .map((res: Response) => {
                let events = res.json();
                return events;
            })
            .catch(this.handleError);
    }
    handleError(error: any) {
        console.error('server error:', error);
        if (error instanceof Response) {
            let errMessage = '';
            try {
                errMessage = error.json().error;
            } catch (err) {
                errMessage = error.statusText;
            }
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'server error');
    }

    insertCategory(category: IEventCategory): Observable<IEventCategory> {
        return this.http.post(this.eventCategoryBaseUrl, category)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    updateCategory(category: IEventCategory): Observable<boolean> {
        return this.http.put(this.eventCategoryBaseUrl + '/' + 'update'+'/'+category.EventCategoryId, category)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    //Get Events and Promotions Count to be displayed in the home page
    getEventPromotionCount(): Observable<IEventPromotionVm> {
        return this.http.get(this.eventBaseUrl + '/' + 'GetEventPromotionCount')
            .map((res: Response) => {
                let events = res.json();
                return events;
            })
            .catch(this.handleError);
    }
    //Get All calendar events
    getCalendarEvents(): Observable<IEventCalendarVm[]> {
        return this.http.get(this.eventBaseUrl + '/' + 'GetCalendarEvents')
            .map((res: Response) => {
                let events = res.json();
                return events;
            })
            .catch(this.handleError);
    }

}
