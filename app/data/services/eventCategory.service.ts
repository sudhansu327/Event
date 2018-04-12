import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import '../../reactive-extensions';

//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import 'rxjs/add/operator/toPromise';
import { IEventCategory } from '../../shared/interfaces/models';

@Injectable()
export class EventCategoryService {

    eventCategoryBaseUrl: string = 'api/EventCategory';

    constructor(private http: Http) { }

    getEventCategories(): Observable<IEventCategory[]> {
        return this.http.get(this.eventCategoryBaseUrl + '/' + 'GetEventCategories')
            .map((res: Response) => {
                let eventCategories = res.json();
                return eventCategories;
            })
            .catch(this.handleError)
    }
    insertCategory(category: IEventCategory): Observable<IEventCategory> {
        return this.http.post(this.eventCategoryBaseUrl + '/' + 'AddEventCategory', category)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    updateCategory(category: IEventCategory): Observable<IEventCategory> {
        return this.http.post(this.eventCategoryBaseUrl + '/' + 'UpdateEventCategory', category)
        .map((res: Response) => res.json())
        .catch(this.handleError);
    }
    deleteCategory(id: number): Observable<boolean> {
        return this.http.delete(this.eventCategoryBaseUrl + '/'+ 'DeleteEventCategory' + '/' + id)
            .map((res: Response) => res.json().status)
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
   

}
