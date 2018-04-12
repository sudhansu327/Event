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
var http_1 = require("@angular/http");
require("../../reactive-extensions");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/toPromise");
var MessageService = (function () {
    function MessageService(http) {
        this.http = http;
        this.messageBaseUrl = 'api/Message';
    }
    MessageService.prototype.getMessages = function () {
        return this.http.get(this.messageBaseUrl + '/' + 'GetMessages')
            .map(function (res) {
            var messages = res.json();
            return messages;
        })
            .catch(this.handleError);
    };
    MessageService.prototype.insertMessage = function (message) {
        return this.http.post(this.messageBaseUrl + '/' + 'AddMessage', message)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    MessageService.prototype.updateMessage = function (message) {
        return this.http.post(this.messageBaseUrl + '/' + 'UpdateMessage', message)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    MessageService.prototype.deleteMessage = function (id) {
        return this.http.delete(this.messageBaseUrl + '/' + 'DeleteMessage' + '/' + id)
            .map(function (res) { return res.json().status; })
            .catch(this.handleError);
    };
    MessageService.prototype.getMessageById = function (msgId) {
        return this.http.get(this.messageBaseUrl + '/' + 'GetMessageById' + '/' + msgId)
            .map(function (res) {
            var messages = res.json();
            return messages;
        })
            .catch(this.handleError);
    };
    MessageService.prototype.handleError = function (error) {
        console.error('server error:', error);
        if (error instanceof http_1.Response) {
            var errMessage = '';
            try {
                errMessage = error.json().error;
            }
            catch (err) {
                errMessage = error.statusText;
            }
            return Observable_1.Observable.throw(errMessage);
        }
        return Observable_1.Observable.throw(error || 'server error');
    };
    return MessageService;
}());
MessageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map