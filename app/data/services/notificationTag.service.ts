import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import '../../reactive-extensions';

//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import 'rxjs/add/operator/toPromise';
import { INotificationTag } from '../../shared/interfaces/models';

@Injectable()
export class NotificationTagService {

    tagUrl: string = 'api/NotificationTag';

    constructor(private http: Http) { }

    getNotificationTags(): Observable<INotificationTag[]> {
        return this.http.get(this.tagUrl + '/' + 'GetNotificationTags')
            .map((res: Response) => {
                let tags = res.json();
                return tags;
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


}
