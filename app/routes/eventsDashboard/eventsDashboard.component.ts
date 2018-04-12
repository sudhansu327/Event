import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IEvent} from '../../shared/interfaces/models';
import { EventService } from '../../data/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'eventsDashboard',
    templateUrl: 'eventsDashboard.component.html',
    styleUrls: ['eventDashboard.component.css']
})


export class EventsDashboardComponent implements OnInit {
    title: string;
    subtitle: string;
    public events: any[];
    router: Router;
    private paramRoute: any;
    public contentType: string;
    constructor(private route: ActivatedRoute, private injector: Injector) { }
    ngOnInit() {
        this.router = this.injector.get(Router);

        this.paramRoute = this.route
            .queryParams
            .subscribe(params => {
                // Defaults to '' if no query param provided.
                this.contentType = params['type'] || '';
            });

        switch (this.contentType) {
            case "Event":
                this.title = 'Event List';
                this.subtitle = 'Add/Edit and search for event details';
                break;
            case "Promotion":
                this.title = 'Promotion List';
                this.subtitle = 'Add/Edit and search for promotion details';
                break;
            default:
                this.title = 'Event List';
                this.subtitle = 'Add/Edit and search for event details';
                break;
        }
    }
}


