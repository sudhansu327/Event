import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IEventCategory } from '../../shared/interfaces/models';

import { EventCategoryService } from '../../data/services/eventCategory.service';
//import { EventService } from '../../data/services/event.service';


@Component({
    moduleId: module.id,
    selector: 'event-category',
    templateUrl: 'eventCategory.component.html',
    styleUrls: ['eventCategory.component.css']
})


export class EventCategoryComponent implements OnInit {
    title: string;
    subtitle: string;
    public eventCategories: any[];

    constructor(  ) { }

    ngOnInit() {
        this.title = "Category Management";
        this.subtitle = "Add, edit, and delete categories here.";
    }

   


}

