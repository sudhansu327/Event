import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import '../../reactive-extensions';

//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import 'rxjs/add/operator/toPromise';
import { IMessage, IPushNotification, IMessageViewVm } from '../../shared/interfaces/models';

@Injectable()
export class MessageService {

    messageBaseUrl: string = 'api/Message';

    constructor(private http: Http) { }

    getMessages(): Observable<IMessageViewVm> {
        return this.http.get(this.messageBaseUrl + '/' + 'GetMessages')
            .map((res: Response) => {
                let messages = res.json();
                return messages;
            })
            .catch(this.handleError);
    }
    insertMessage(message: IPushNotification): Observable<IPushNotification> {
        return this.http.post(this.messageBaseUrl + '/' + 'AddMessage', message)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    updateMessage(message: IPushNotification): Observable<IPushNotification> {
        return this.http.post(this.messageBaseUrl + '/' + 'UpdateMessage', message)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    deleteMessage(id: number): Observable<boolean> {
        return this.http.delete(this.messageBaseUrl + '/' + 'DeleteMessage' + '/' + id)
            .map((res: Response) => res.json().status)
            .catch(this.handleError);
    }
    getMessageById(msgId: number): Observable<IPushNotification> {
        return this.http.get(this.messageBaseUrl + '/' + 'GetMessageById' + '/' + msgId)
            .map((res: Response) => {
                let messages = res.json();
                //return messages;
                return messages;
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
