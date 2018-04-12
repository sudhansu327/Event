import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import '../../reactive-extensions';

//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import 'rxjs/add/operator/toPromise';
import { IUser } from '../../shared/interfaces/models';

@Injectable()
export class UserService {

    userBaseUrl: string = 'api/User';

    constructor(private http: Http) { }

    getUser(): Observable<IUser> {
        return this.http.get(this.userBaseUrl + '/' + 'GetUser')
            .map((res: Response) => {
                let user = res.json();
                return user;
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
