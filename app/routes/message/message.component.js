"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var notificationTag_service_1 = require("../../data/services/notificationTag.service");
var message_service_1 = require("../../data/services/message.service");
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var Eventservice = require("../../data/services/event.service");
var toastr_service_1 = require("../../shared/services/toastr.service");
var moment = require("moment");
var MessageComponent = (function () {
    function MessageComponent(dataService, route, injector, messageService, eventService, toastrService) {
        this.dataService = dataService;
        this.route = route;
        this.injector = injector;
        this.messageService = messageService;
        this.eventService = eventService;
        this.toastrService = toastrService;
        this.isEditMode = false;
        this.locationList = [];
        this.isSpecificUser = false;
        this.platform = true;
        this.selectedTag = [];
        this.selectedLocation = [];
        this.currentDate = new Date();
        this.scheduledDate = new Date();
        this.messageDurationType = "2";
        this.messageActionList = [];
        this.message = {
            Audience: '', Notification: { ios: { sound: '', badge: '', alert: '' } }, NotificationType: '', InAppNotification: false, PushNotification: false,
            PushNotificationText: '', messageId: 0, DeviceTypes: '', MessageScheduledDate: new Date(), MessageScheduledDateString: '', MessageExpirationDate: new Date(), ExpirationDurationQuantity: null,
            ExpirationDurationType: null, MessageExpirationDateString: '', MessageAction: null, selectedTags: [], TagName: [], SelectedMessageAction: '', MessageSendTime: '', ExpirationCheck: false, Duration: ''
        };
        this.pushNotification = { Message: this.message, Status: '', MessageId: 0 };
    }
    MessageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.title = 'New Message';
        this.subtitle = "Create a new message here.";
        this.router = this.injector.get(router_1.Router);
        this.paramRoute = this.route
            .queryParams
            .subscribe(function (params) {
            _this.message.messageId = +params['messageId'] || 0;
        });
        this.loadInitialData();
    };
    MessageComponent.prototype.loadInitialData = function () {
        this.getLocations();
        this.setMessageAction();
    };
    MessageComponent.prototype.filterChange = function (filter) {
        this.filterData = this.locationList.filter(function (s) { return s.LocationName.toLowerCase().indexOf(filter.toLowerCase()) !== -1; });
    };
    MessageComponent.prototype.navigate = function () {
    };
    MessageComponent.prototype.setMessageAction = function () {
        this.messageActionList = [{ ActionId: 0, ActionName: 'Select Message Action', ActionDescription: '' }, { ActionId: 1, ActionName: 'Home', ActionDescription: 'Opens the web homepage URL and app home screen for a Push Notification, and dismisses the In-App Message' },
            { ActionId: 2, ActionName: 'Landing page', ActionDescription: 'Open to an HTML landing page within your app' },
            { ActionId: 3, ActionName: 'Deep Link', ActionDescription: 'Open to a configured screen within your app or on the web' },
            { ActionId: 4, ActionName: 'Web Page', ActionDescription: 'Opens to a web page in a browser' },
            { ActionId: 5, ActionName: 'Share', ActionDescription: 'Prompt user to share this on social networks' }];
    };
    MessageComponent.prototype.onMessageActionChange = function (action) {
        this.message.MessageAction = action;
        this.message.SelectedMessageAction = action.ActionName;
        this.actionDescription = action.ActionDescription;
    };
    MessageComponent.prototype.onAudienceChange = function () {
        if (this.message.Audience === 'all')
            this.selectedLocation = [];
    };
    MessageComponent.prototype.onMessageSentChange = function () {
        if (this.message.MessageSendTime === 'Now') {
            this.message.MessageScheduledDate = new Date();
            this.message.MessageExpirationDateString = '';
        }
    };
    MessageComponent.prototype.onDurationChange = function () {
        if (this.message.Duration === 'Duration') {
            this.message.MessageExpirationDate = new Date();
            this.message.MessageExpirationDateString = '';
        }
        else {
            this.message.ExpirationDurationQuantity = 0;
            this.message.ExpirationDurationType = 0;
        }
    };
    MessageComponent.prototype.addMessage = function (status) {
        var _this = this;
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
                .subscribe(function (response) {
                _this.pushNotification = response;
            }, function (err) { return _this.toastrService.showError("An error ocurred while trying to add record."); }, function () {
                _this.toastrService.showSuccess("Data inserted Successfully!");
            });
        }
        else {
            this.messageService.updateMessage(this.pushNotification)
                .subscribe(function (response) {
                _this.pushNotification = response;
            }, function (err) { return _this.toastrService.showError("An error ocurred while trying to update record."); }, function () {
                _this.toastrService.showSuccess("Data updated Successfully!");
            });
        }
    };
    MessageComponent.prototype.getLocations = function () {
        var _this = this;
        this.eventService.getAllLocations()
            .subscribe(function (response) {
            _this.locationList = response;
            _this.filterData = _this.locationList;
            if (_this.message.messageId > 0) {
                _this.isEditMode = true;
                _this.title = 'Edit Event';
                _this.subtitle = 'Update event here';
                _this.getMessageById(_this.message.messageId);
            }
        }, function (err) { return console.log(err); }, function () {
            console.log('Retrieved locations');
        });
    };
    MessageComponent.prototype.getMessageById = function (msgId) {
        var _this = this;
        this.messageService.getMessageById(msgId)
            .subscribe(function (response) {
            _this.message = response.Message;
            if (_this.message.PushNotification) {
                _this.message.NotificationType = "Push";
            }
            else {
                _this.message.NotificationType = "InApp";
            }
            if (_this.message.ExpirationDurationQuantity !== 0)
                _this.message.Duration = "Duration";
            else
                _this.message.Duration = "DateTime";
            if (_this.message.TagName !== null)
                _this.selectedLocation = _this.loadSelectedTag(_this.message.TagName);
            _this.pushNotification.Status = response.Status;
            _this.pushNotification.MessageId = msgId;
            if (response.Message.MessageScheduledDateString !== '') {
                _this.message.MessageScheduledDate = new Date(response.Message.MessageScheduledDateString);
            }
            if (response.Message.MessageExpirationDateString !== '' || response.Message.MessageExpirationDateString !== null) {
                _this.message.MessageExpirationDate = new Date(response.Message.MessageExpirationDateString);
            }
            var mAction = _this.messageActionList.filter(function (a) { return a.ActionName === _this.message.SelectedMessageAction; });
            if (mAction !== null && mAction !== undefined && mAction.length > 0) {
                _this.message.MessageAction = _this.messageActionList.filter(function (a) { return a.ActionName === _this.message.SelectedMessageAction; })[0];
            }
        }, function (err) { return console.log(err); }, function () {
            console.log('Retrieved event');
        });
    };
    MessageComponent.prototype.loadSelectedTag = function (tagString) {
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
    };
    MessageComponent.prototype.getTag = function (id) {
        for (var i = 0; i < this.locationList.length; i++) {
            if (this.locationList[i].LocationId === id) {
                this.tagObj = this.locationList[i];
                return this.tagObj;
            }
        }
    };
    ;
    return MessageComponent;
}());
MessageComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'message',
        templateUrl: 'message.component.html',
        styleUrls: ['message.component.css']
    }),
    __metadata("design:paramtypes", [notificationTag_service_1.NotificationTagService, router_2.ActivatedRoute, core_1.Injector, message_service_1.MessageService, Eventservice.EventService, toastr_service_1.ToastrService])
], MessageComponent);
exports.MessageComponent = MessageComponent;
//# sourceMappingURL=message.component.js.map