import { Component, OnInit, OnDestroy, Injector, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAirport, IEventCategory, IEvent, ILocationMin,IEventImage } from '../../shared/interfaces/models';
import { EventService } from '../../data/services/event.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ToastrService } from '../../shared/services/toastr.service';
import { SpinnerService } from '../../shared/services/spinner.service';
import { UploadComponent } from './upload.component';
import { GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { State, process } from '@progress/kendo-data-query';




@Component({
    moduleId: module.id,
    selector: 'cm-event',
    providers: [SpinnerService],
    templateUrl: 'event.component.html',
    styleUrls: ['event.component.css']
})
export class EventComponent implements OnInit, OnDestroy {
    @ViewChild('spinner', { read: ViewContainerRef }) container: ViewContainerRef;
    @ViewChild(UploadComponent)
    private uploadComponent: UploadComponent;
    title: string;
    subtitle: string;
    isEditMode:boolean=false;
    private paramRoute: any;
    router: Router;
    categories: IEventCategory[];
    locationList: ILocationMin[];
    filterData: ILocationMin[];
    selectedLocation: ILocationMin[] = [];
    associatedImages: IEventImage[] = [];
    existingThumbnailImgCount: number = 0;
    existingDetailImgCount: number = 0;
    event: IEvent = {
        Title: '', SubTitle: '', ContentType: '', RenderOnHomeScreen: false,
        ActiveDateFrom: new Date(), ActiveDateTo: new Date(), EventFromDate: new Date(), EventToDate: new Date(),
        DisplayEventDate: false, DisplayCountdown: false, GeneralContent: true,
        Locations: [], EventCategoryId: 0,
        EventLocation: '', SummaryDescription: '', EventCategoryName: '', EventId: 0, EventImages: [], TermsandConditions: '', 
        DetailTitle: '', DetailDescription: '', MoreInfoText: '', MoreInfoUrl: '', NotificationMessage: '', EventDashboardImage: null,
    };
    eventCopy: IEvent;
    opened: boolean = false;
    detailImage: any;
    imageTitle: string = '';
    noImages:boolean=false;

    constructor(private route: ActivatedRoute,
        private dataService: EventService,
        private injector: Injector,
        public vRef: ViewContainerRef,
        private toastrService: ToastrService,
        private _spinner: SpinnerService) { }

    ngOnInit() {
        this.loadInitialData();
        this.router = this.injector.get(Router);
        this.paramRoute = this.route
            .queryParams
            .subscribe(params => {
                // Defaults to 0 if no query param provided.
                this.event.EventId = +params['eventId'] || 0;
            });
        if (this.event.EventId > 0) { //Update event
            this.isEditMode = true;
            this.title = 'Edit Event';
            this.subtitle = 'Update event here';
            this.getEvent(this.event.EventId);
        }
        else //Create new Event
        {
            this.title = 'Add Event';
            this.subtitle = 'Create new event here';
        }
    }

    public filterChange(filter: any): void {
        this.filterData = this.locationList.filter((s) => s.LocationName.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
    loadInitialData(): void {
        this._spinner.start(this.container);
        var locationList = this.dataService.getAllLocations();
        var categoryList = this.dataService.getEventCategories();

        Observable.forkJoin([locationList, categoryList])
            .subscribe((response) => {
                this.locationList = response[0];
                this.categories = response[1];
                this.filterData = this.locationList;
            }, (err: any) => {
                console.log(err);
                this.toastrService.showError("An error has occured");
            },
            () => {
                this._spinner.stop();
            });
    }

    ngOnDestroy() {
        this.paramRoute.unsubscribe();
    }

    //Get Event by EventId
    getEvent(eventId:number) {
        this.dataService.getEvent(eventId)
            .subscribe((response: IEvent) => {
                this.event = response;
                //this.eventCopy = Object.assign({}, this.event);
                //this.associatedImages = this.eventCopy.EventImages;
                this.associatedImages = this.event.EventImages.map(x => Object.assign({}, x));
                this.loadLocationSpecificDataForEvent(this.event.Locations);

                this.event.EventImages.forEach((item) => {
                    if (item.ImageType === 'Detail') {
                        this.existingDetailImgCount++;
                    }
                    else if (item.ImageType === 'Thumbnail') {
                        this.existingThumbnailImgCount++;
                    }
                });
             
            },
            (err: any) => console.log(err),
            () => {
                console.log('Retrieved event');
            });
    }

    public loadLocationSpecificDataForEvent(eventLocations: ILocationMin[]): void {
        for (var i = 0; i < eventLocations.length; i++) {
            this.selectedLocation.push({ LocationId: eventLocations[i].LocationId, LocationName: eventLocations[i].LocationName, LocationNameAirportCode: eventLocations[i].LocationNameAirportCode });
        }  
    }

    deleteAttachment(data: IEventImage) {
        if (data.ImageType ==='Thumbnail') { //If existing thumbnail img has been deleted
            this.existingThumbnailImgCount--;
        }
        this.event.EventImages.splice(this.event.EventImages.indexOf(data), 1);
        if (this.event.EventImages.length == 1 && this.event.EventImages[0].ImageType ==='Thumbnail') {
            this.existingDetailImgCount--;
        }
    }

    saveEvent() {
        this.uploadComponent.imageList.forEach((item) => {
            item.ImageType = 'Detail';
        });
        this.event.EventImages = this.event.EventImages.concat(this.uploadComponent.imageList); //Concat newly added files with existing.
        if (this.uploadComponent.thmbnlImg) {
            this.uploadComponent.thmbnlImg.ImageType = 'Thumbnail';
            this.event.EventImages.push(this.uploadComponent.thmbnlImg); // Push Thumbnail Image
        }
        this.event.Locations = [];
        if (this.selectedLocation && this.selectedLocation.length > 0) {
            for (var i = 0; i < this.selectedLocation.length;i++) {
                this.event.Locations.push({
                    LocationId: this.selectedLocation[i].LocationId, LocationName: this.selectedLocation[i].LocationName,LocationNameAirportCode:this.selectedLocation[i].LocationNameAirportCode
                });
            }
        }
        if (this.event.EventId > 0) {
            this.updateEvent();
        } else {
            this.addEvent();
        }
    }

    addEvent() {
        this.associatedImages = [];
        this._spinner.start(this.container);
        this.event.GeneralContent = !(this.selectedLocation && this.selectedLocation.length > 0);
        this.dataService.addEvent(this.event)
            .subscribe((insertedEvent: IEvent) => {
                this.associatedImages = insertedEvent.EventImages;
                if (insertedEvent) {
                    this.toastrService.showSuccess("Add successful");
                } else {
                    this.toastrService.showWarning("Unable to add Event");
                }
            },(err: any) => {
                this.toastrService.showError("An error has occured");
                this._spinner.stop();
                console.log(err);
            }, () => {this._spinner.stop();});
    }
   
    updateEvent() {
        this.event.TermsandConditions = this.event.ContentType === 'Event' ? '' : this.event.TermsandConditions; //Incase Promotion gets changed to Event or Vice versa
        this._spinner.start(this.container);
        this.event.GeneralContent = !(this.selectedLocation && this.selectedLocation.length > 0);
        this.dataService.updateEvent(this.event)
            .subscribe((updatedEvent: IEvent) => {
                if (updatedEvent) {
                    this.toastrService.showSuccess("Update successful");
                } else {
                    this.toastrService.showWarning("Unable to update Event");  
                }
            },(err: any) => {
                this.toastrService.showError("An error has occured");
                this._spinner.stop();
            }, () => { this._spinner.stop() });
    }

    validateImageUpload() {
        var detailImgCnt = 0;
        var thmbnlImgCnt = 0;
        this.event.EventImages.forEach((item) => {
            if (item.ImageType === 'Detail') {
                detailImgCnt++;
            }
            else if (item.ImageType === 'Thumbnail') {
                thmbnlImgCnt++;
            }
        });

        if ((this.uploadComponent.imageList.length > 0 || detailImgCnt > 0) && (this.uploadComponent.thmbnlImg != null || thmbnlImgCnt > 0) ) {
            this.saveEvent();
        } else {
            this.noImages = true;
        }
    }

    clickThumbnail(clickedImg: IEventImage) {
        this.opened = true;
        this.detailImage = clickedImg.Image;
        this.imageTitle = clickedImg.ImageName;
    }
    closeDialog() {
        this.opened = false;
        this.detailImage = '';
    }

    closeImageValidationDialog() {
        this.noImages = false;
    }

    resetEventData() {
        this.event = {
            Title: '', SubTitle: '', ContentType: '', RenderOnHomeScreen: false,
            ActiveDateFrom: new Date(), ActiveDateTo: new Date(), EventFromDate: new Date(), EventToDate: new Date(),
            DisplayEventDate: false, DisplayCountdown: false, GeneralContent: true,
            Locations: [], EventCategoryId: 0,
            EventLocation: '', SummaryDescription: '', EventCategoryName: '', EventId: 0, EventImages: [], TermsandConditions:'',
            DetailTitle: '', DetailDescription: '', MoreInfoText: '', MoreInfoUrl: '', NotificationMessage:'',EventDashboardImage:null
        };
        this.selectedLocation = [];
    }

    //onActiveFromDateChange(activeFrmDate: Date): void {
    //    this.event.ActiveDateFrom = activeFrmDate;
    //}
    //onActiveToDateChange(activeToDate: Date): void {
    //    this.event.ActiveDateTo = activeToDate;
    //}
    //onEventFromDateChange(eventFrmDate: Date): void {
    //    this.event.EventFromDate = eventFrmDate;
    //}
    //onEventToDateChange(eventToDate: Date): void {
    //    this.event.EventToDate = eventToDate;
    //}

    onBackClick() {
        this.router.navigate(["/eventsDashboard"]);
    };
}