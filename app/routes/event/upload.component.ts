import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { IEventImage } from '../../shared/interfaces/models';

const URL = 'api/Events/UploadEventAttachment';

@Component({
    selector: 'app-upload',
    moduleId: module.id,    
    templateUrl: 'upload.component.html'
})
export class UploadComponent implements OnInit {
    public uploader: FileUploader = new FileUploader({ url: URL });
    public uploaderThumbnl: FileUploader = new FileUploader({ url: URL });
    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;
    public imageList: IEventImage[] = [];
    strFileData: string;
    imgObj: IEventImage = null;

    public thmbnlImg: IEventImage;
    strThmbnlFileData: string;
    
    

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }

    constructor() { }

    removeItemFromQueue(item: any) {
        this.uploader.queue.splice(this.uploader.queue.indexOf(item), 1);
        if (this.imageList) {
            //for (var v=0 in this.imageList) // for acts as a foreach
            for (var v = 0;v<this.imageList.length;v++) // for acts as a foreach
            {
                if (this.imageList[v].ImageName === item.file.name) {
                    this.imageList.splice(v,1);
                }
            }
        }
    }

    removeThmbnlItemFromQueue(item: any) {
        this.uploaderThumbnl.queue.splice(this.uploaderThumbnl.queue.indexOf(item), 1);
        this.thmbnlImg = null;
    }

    ngOnInit() {
        //this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
        //    //form.append('someField': this.someValue);
        //    //form.append('someField2': this.someValue2);

        //    var a = fileItem;
        //};

        this.uploader.clearQueue = () => {
            this.uploader.queue = [];
            this.imageList = [];
        };
         
        this.uploader.onCompleteItem = (item: any, response: string, status: any, headers: any) => {
            this.strFileData = response;
            this.imgObj = JSON.parse(this.strFileData);
            this.imageList.push(this.imgObj);
        };

        //for thumbnail image
        this.uploaderThumbnl.clearQueue = () => {
            this.uploaderThumbnl.queue = [];
            this.strThmbnlFileData = null;
        };

        this.uploaderThumbnl.onCompleteItem = (item: any, response: string, status: any, headers: any) => {
            this.strThmbnlFileData = response;
            this.thmbnlImg = JSON.parse(this.strThmbnlFileData);
        };
    }

}
