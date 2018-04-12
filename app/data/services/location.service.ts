import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import '../../reactive-extensions';

//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { ILocation, IGeofence} from '../../shared/interfaces/models';

@Injectable()
export class LocationService {

    locationLocatorBaseUrl: string = 'api/LocationLocator';
    constructor(private http: Http) {}

//Get All Locations
    getAllLocations(): Observable<ILocation[]> {
        return this.http.get(this.locationLocatorBaseUrl + '/' + 'GetAllLocations')
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getGeofences(): Observable<IGeofence[]> {
        return this.http.get(this.locationLocatorBaseUrl + '/' + 'GetGeofences')
            .map((res: Response) => {
                let events = res.json();
                return events;
            }).catch(this.handleError);
    }

    updateLocationGeofence(location): Observable<ILocation>{
        return this.http.post(this.locationLocatorBaseUrl + '/' + "UpdateLocationGeofence", location)
        .map((res: Response) => res.json())
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