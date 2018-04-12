import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IExploreVm, IMessage, IPushNotification, ILocationMin, IMessageAction, IAutopopulate} from '../../shared/interfaces/models';
import { NotificationTagService } from '../../data/services/notificationTag.service';
import { MessageService } from '../../data/services/message.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Eventservice = require("../../data/services/event.service");
import { ToastrService } from '../../shared/services/toastr.service';
import * as moment from 'moment';


@Component({
    moduleId: module.id,
    selector: 'message',
    templateUrl: 'message.component.html',
    styleUrls: ['message.component.css']
})
export class MessageComponent implements OnInit {
    title: string;
    subtitle: string;
    router: Router;
    isEditMode: boolean = false;
    private paramRoute: any;
    public tagObj: any;
    public exploreList: any;
    public locationList: ILocationMin[] = [];
    public audienceType: string;
    isSpecificUser: boolean = false;
    platform: boolean = true;
    notificationType: string;
    selectedTag: ILocationMin[] = [];
    filterData: ILocationMin[];
    selectedLocation: ILocationMin[] = [];
    currentDate:Date = new Date();
    public scheduledDate: Date = new Date();
    messageDurationType: string = "2";
    public messageActionList: IMessageAction[] = [];
    public actionDescription: string;
    public message: IMessage = {
        Audience: '', Notification: { ios: { sound: '', badge: '', alert: '' } }, NotificationType: '', InAppNotification: false, PushNotification: false,
        PushNotificationText: '', messageId: 0, DeviceTypes: '', MessageScheduledDate: new Date(), MessageScheduledDateString: '', MessageExpirationDate: new Date(), ExpirationDurationQuantity: null,
        ExpirationDurationType: null, MessageExpirationDateString: '', MessageAction: null, selectedTags: [], TagName: [], SelectedMessageAction: '', MessageSendTime: '', ExpirationCheck: false, Duration: ''
    };
    pushNotification: IPushNotification = { Message: this.message, Status: '', MessageId: 0 };
    //notificationTag: INotificationTag = { NotificationTagId: 0,TagName: '', Notification: this.message};
    constructor(private dataService: NotificationTagService, private route: ActivatedRoute, private injector: Injector, private messageService: MessageService, private eventService: Eventservice.EventService, private toastrService: ToastrService) { }

    ngOnInit() {
        this.title = 'New Message';
        this.subtitle = "Create a new message here.";
        this.router = this.injector.get(Router);
        this.paramRoute = this.route
            .queryParams
            .subscribe(params => {
                // Defaults to 0 if no query param provided.
                this.message.messageId = +params['messageId'] || 0;
            });
        this.loadInitialData();



    }
    loadInitialData() {
        this.getLocations();
        this.setMessageAction();
    }

    public filterChange(filter: any): void {
        this.filterData = this.locationList.filter((s) => s.LocationName.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
    navigate() {

    }
    setMessageAction() {
        this.messageActionList = [{ ActionId: 0, ActionName: 'Select Message Action', ActionDescription: '' }, { ActionId: 1, ActionName: 'Home', ActionDescription: 'Opens the web homepage URL and app home screen for a Push Notification, and dismisses the In-App Message' },
            { ActionId: 2, ActionName: 'Landing page', ActionDescription: 'Open to an HTML landing page within your app' },
            { ActionId: 3, ActionName: 'Deep Link', ActionDescription: 'Open to a configured screen within your app or on the web' },
            { ActionId: 4, ActionName: 'Web Page', ActionDescription: 'Opens to a web page in a browser' },
            { ActionId: 5, ActionName: 'Share', ActionDescription: 'Prompt user to share this on social networks' }];
    }

    onMessageActionChange(action: any) {
        this.message.MessageAction = action;
        this.message.SelectedMessageAction = action.ActionName;
        this.actionDescription = action.ActionDescription;
    }

    onAudienceChange() {
        if (this.message.Audience === 'all')
            this.selectedLocation = [];
    }

    onMessageSentChange() {
        if (this.message.MessageSendTime === 'Now') {
            this.message.MessageScheduledDate = new Date();
            this.message.MessageExpirationDateString = '';
        }
    }

    onDurationChange() {
        if (this.message.Duration === 'Duration') {
            this.message.MessageExpirationDate = new Date();
            this.message.MessageExpirationDateString = '';
        } else {
            this.message.ExpirationDurationQuantity = 0;
            this.message.ExpirationDurationType = 0;
        }
    }

    addMessage(status: string) {

        this.message.Notification.ios.alert = "";
        this.message.Notification.ios.badge = "";
        var str = '';
        var idArray = [];
        if (this.selectedLocation != null) {
            for (var i = 0; i < this.selectedLocation.length; i++) {
                var data = this.selectedLocation[i].LocationId;
                str += String.fromCharCode(data);
                idArray.push(data);
            }

            this.message.TagName = idArray;
        }
        if (this.message.NotificationType === "Push") {
            this.message.PushNotification = true;
            this.message.InAppNotification = false;
        }
        else if (this.message.NotificationType === "InApp") {
            this.message.PushNotification = false;
            this.message.InAppNotification = true;
        }

        if (this.message.MessageScheduledDate) {
            this.message.MessageScheduledDateString = moment(this.message.MessageScheduledDate).format('MM/DD/YYYY h:mm:ss a');
        }

        if (this.message.MessageExpirationDate) {
            this.message.MessageExpirationDateString = moment(this.message.MessageExpirationDate).format('MM/DD/YYYY h:mm:ss a');
        }



        this.pushNotification.Message = this.message;
        this.pushNotification.Status = status;

        if (this.pushNotification.MessageId === null || this.pushNotification.MessageId === undefined || this.pushNotification.MessageId === 0) {
            this.messageService.insertMessage(this.pushNotification)
                .subscribe((response: IPushNotification) => {
                    this.pushNotification = response;
                },
                (err: any) => this.toastrService.showError("An error ocurred while trying to add record."), () => {
                    this.toastrService.showSuccess("Data inserted Successfully!");

                });
        } else {
            this.messageService.updateMessage(this.pushNotification)
                .subscribe((response: IPushNotification) => {
                    this.pushNotification = response;
                },
                (err: any) => this.toastrService.showError("An error ocurred while trying to update record."),
                () => {
                    this.toastrService.showSuccess("Data updated Successfully!");

                });
        }

    }
    getLocations() {
        this.eventService.getAllLocations()
            .subscribe((response: ILocationMin[]) => {
                this.locationList = response;
                this.filterData = this.locationList;
                if (this.message.messageId > 0) { //Update event
                    this.isEditMode = true;
                    this.title = 'Edit Event';
                    this.subtitle = 'Update event here';
                    this.getMessageById(this.message.messageId);
                }


            },
            (err: any) => console.log(err),
            () => {
                console.log('Retrieved locations');
            });
    }

    getMessageById(msgId: number) {
        this.messageService.getMessageById(msgId)
            .subscribe((response: IPushNotification) => {
                this.message = response.Message;

                if (this.message.PushNotification) {
                    this.message.NotificationType = "Push";
                }
                else { this.message.NotificationType = "InApp"; }
                if (this.message.ExpirationDurationQuantity !== 0)
                    this.message.Duration = "Duration";
                else
                    this.message.Duration = "DateTime";

                if (this.message.TagName !== null)
                    this.selectedLocation = this.loadSelectedTag(this.message.TagName);

                this.pushNotification.Status = response.Status;
                this.pushNotification.MessageId = msgId;

                if (response.Message.MessageScheduledDateString !== '') {
                    this.message.MessageScheduledDate = new Date(response.Message.MessageScheduledDateString);
                }

                if (response.Message.MessageExpirationDateString !== '' || response.Message.MessageExpirationDateString !== null) {
                    this.message.MessageExpirationDate = new Date(response.Message.MessageExpirationDateString);
                }

                var mAction = this.messageActionList.filter(a => a.ActionName === this.message.SelectedMessageAction);
                if (mAction !== null && mAction !== undefined && mAction.length > 0) {
                    this.message.MessageAction = this.messageActionList.filter(a => a.ActionName === this.message.SelectedMessageAction)[0];
                }


            },
            (err: any) => console.log(err),
            () => {
                console.log('Retrieved event');
            });
    }

    loadSelectedTag(tagString: any[]) {
        var resultList = [];
        for (var x = 0; x < tagString.length; x++) {
            var id = parseInt(tagString[x]);
            var result = this.getTag(id);
            resultList.push(result);
        }
        for (var i = 0; i < resultList.length; i++) {
            this.selectedTag.push({ LocationId: resultList[i].LocationId, LocationName: resultList[i].LocationName, LocationNameAirportCode: resultList[i].LocationNameAirportCode });
        }
        return this.selectedTag;
    }

    getTag(id: number) {
        for (var i = 0; i < this.locationList.length; i++) {
            if (this.locationList[i].LocationId === id) {
                this.tagObj = this.locationList[i];
                return this.tagObj;
            }
        }
    };



}

