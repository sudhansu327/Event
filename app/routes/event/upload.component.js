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
var ng2_file_upload_1 = require("ng2-file-upload");
var URL = 'api/Events/UploadEventAttachment';
var UploadComponent = (function () {
    function UploadComponent() {
        this.uploader = new ng2_file_upload_1.FileUploader({ url: URL });
        this.uploaderThumbnl = new ng2_file_upload_1.FileUploader({ url: URL });
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
        this.imageList = [];
        this.imgObj = null;
    }
    UploadComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    UploadComponent.prototype.fileOverAnother = function (e) {
        this.hasAnotherDropZoneOver = e;
    };
    UploadComponent.prototype.removeItemFromQueue = function (item) {
        this.uploader.queue.splice(this.uploader.queue.indexOf(item), 1);
        if (this.imageList) {
            for (var v = 0; v < this.imageList.length; v++) {
                if (this.imageList[v].ImageName === item.file.name) {
                    this.imageList.splice(v, 1);
                }
            }
        }
    };
    UploadComponent.prototype.removeThmbnlItemFromQueue = function (item) {
        this.uploaderThumbnl.queue.splice(this.uploaderThumbnl.queue.indexOf(item), 1);
        this.thmbnlImg = null;
    };
    UploadComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.uploader.clearQueue = function () {
            _this.uploader.queue = [];
            _this.imageList = [];
        };
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            _this.strFileData = response;
            _this.imgObj = JSON.parse(_this.strFileData);
            _this.imageList.push(_this.imgObj);
        };
        this.uploaderThumbnl.clearQueue = function () {
            _this.uploaderThumbnl.queue = [];
            _this.strThmbnlFileData = null;
        };
        this.uploaderThumbnl.onCompleteItem = function (item, response, status, headers) {
            _this.strThmbnlFileData = response;
            _this.thmbnlImg = JSON.parse(_this.strThmbnlFileData);
        };
    };
    return UploadComponent;
}());
UploadComponent = __decorate([
    core_1.Component({
        selector: 'app-upload',
        moduleId: module.id,
        templateUrl: 'upload.component.html'
    }),
    __metadata("design:paramtypes", [])
], UploadComponent);
exports.UploadComponent = UploadComponent;
//# sourceMappingURL=upload.component.js.map