import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IMessageViewVm } from '../../../shared/interfaces/models';

import { MessageService } from '../../../data/services/message.service';



@Component({
    moduleId: module.id,
    selector: 'view-message',
    templateUrl: 'viewMessage.component.html',
    styleUrls: ['viewMessage.component.css']
})


export class ViewMessageComponent implements OnInit {
    title: string;
    subtitle: string;
    public draftsMessageList: any[];
    public historyMessageList: any[];
    public scheduledMessageList: any[];
    constructor() { }

    ngOnInit() {
        this.title = "Message Dashboard";
        this.subtitle = "View, edit, and delete messages here.";
    }




}

