/// <reference path="../../typings.d.ts" />
import { Component, Input, OnInit, OnDestroy, Injector, ChangeDetectionStrategy, ViewContainerRef, ApplicationRef, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { State, process } from '@progress/kendo-data-query';
import { EventService } from '../../data/services/event.service';
import { IEvent, IContentType, ILocation} from '../../shared/interfaces/models';
import { ToastrService } from '../../shared/services/toastr.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from '../../core/services/filter.service';
import * as moment from 'moment';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
@Component({
    moduleId: module.id,
    selector: 'events-dashboard-grid',
    templateUrl: 'eventsDashboard-grid.component.html'
  
})
export class EventsDashboardGridComponent implements OnInit, OnDestroy {
  
    public events: any[];
    filterText: string;
    filteredEvents: IEvent[] = [];
    public eventsMaster: any[];
    private editedRowIndex: number;
    public formGroup: FormGroup;
    public contentType: string;
    public contentTypesList:IContentType[]=[];
    router: Router;
    private loading: boolean = true;
    private paramRoute: any;
    public startDate: Date;
    public endDate: Date;
    locationList: ILocation[];
    locationMasterList: ILocation[];
    selectedLocation:any;
    constructor(private route: ActivatedRoute, private dataService: EventService,private filterService: FilterService, private injector: Injector, public vRef: ViewContainerRef, private toastrService: ToastrService) { }

    ngOnInit() {
        this.router = this.injector.get(Router);

        this.paramRoute = this.route
            .queryParams
            .subscribe(params => {
                // Defaults to '' if no query param provided.
                this.contentType = params['type'] || '';
            });

        this.setContentTypeList();  
        this.getEvents(this.contentType);
        this.getAllLocations();
    }
    public state: State = {
        sort: [],
        skip: 0,
        take: 10
    };
    setContentTypeList() {
        this.contentTypesList = [{ ContentTypeName: 'All' }, { ContentTypeName: 'Event' }, { ContentTypeName: 'Promotion' }];
    }
    onContentTypeChange(content: any) {
       //this is needed for the url to display correct type when changing radio buttons
        var contentName = '';
        if (content!== undefined && content !== null && content.ContentTypeName) {
            contentName = content.ContentTypeName;
        } else if (content !== undefined && content !== null) {
            contentName = content;
        } 
        this.contentType = contentName;
        if (contentName !== '') {
            this.router.navigate(["/eventsDashboard"], { queryParams: { type: contentName } }); 
        }
      
        if (contentName === 'All') {
            this.events = this.filteredEvents = this.eventsMaster;
        }
       
        this.filterGridData();
    }
    getEvents(contentType:string='') {


        this.dataService.getEvents()
            .subscribe((response: IEvent[]) => {
                //Kendo grid is not accepting date format till date is converted to a valid javascript date
                for (var i = 0; i < response.length; i++) {
                    response[i].EventFromDate = new Date(response[i].EventFromDate.toString());
                    response[i].EventToDate = new Date(response[i].EventToDate.toString());
                }
             
                this.events = this.filteredEvents = response;
                this.eventsMaster = response;
               
                if (contentType !== "" && contentType !== undefined) {
                    this.onContentTypeChange(contentType);
                } else if (this.contentType !== "" && this.contentType !== undefined) {
                    this.onContentTypeChange(this.contentType);
                }
            },
            (err: any) => console.log(err),
            () => {
                this.loading = false;
                this.toastrService.showInfo("Data Loaded");

            });
    }
  
    getAllLocations() {
        this.dataService.getAllLocations()
            .subscribe((response: ILocation[]) => {
                this.locationList = response;
                    this.locationMasterList = response;
                },
            (err: any) => console.log(err),
           );
    }
    locationSelection(event) {
       
        this.selectedLocation = event;
        if (event === undefined || event === null) {
            this.locationList = this.locationMasterList;
        }
        this.filterGridData();
    }
  
    locationFilter(event) {
        this.locationList = this.locationMasterList
            .filter((s) =>
                s.LocationName.toLowerCase().indexOf(event.toLowerCase()) !== -1
            );

    }
    protected editHandler({sender, rowIndex, dataItem}) {
        
        this.router.navigate(["/event"], { queryParams: { eventId: dataItem.EventId} });
    }


    protected addHandler({sender}) {
        this.router.navigate(["/event"]);
    }
  
    private closeEditor(grid, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
        this.editedRowIndex = undefined;
        this.formGroup = undefined;
    }


    protected removeHandler({dataItem}) {
       
        this.dataService.deleteEvent(dataItem.EventId)
            .subscribe((response: boolean) => {
                this.getEvents();
            },
            (err: any) => console.log(err),
            () => {
                this.toastrService.showSuccess("Deleted Successfully!");

            });
    }
    filterChanged(data: string) {
        if (data && this.filteredEvents) {
            data = data.toUpperCase();
            const props = ['Title', 'SubTitle', 'ContentType', 'EventCategoryName'];
            this.filteredEvents = this.filterService.filter<IEvent>(this.filteredEvents, data, props);
        }
        else {
          
            this.filterGridData();
        }
       
       
    }

   
    onFromDateChange(startDate: Date): void {
        this.startDate = startDate;
        this.filterGridData();
      
    }
    onToDateChange(endDate: Date): void {
        this.endDate = endDate;
        this.filterGridData();
      
    }
    resetEventData() {
        this.startDate = null;
        this.endDate = null;
        this.filteredEvents = this.eventsMaster;
        this.contentType = "";
        this.locationSelection(null);
        this.router.navigate(["/eventsDashboard"]);
    }
    filterGridData() {
        
        var isContentFilter = (this.contentType !== 'All' && this.contentType !=="");
        var isStartDateFilter = this.startDate;
        var isEndDateFilter = this.endDate;
        var isLocationFilter = this.selectedLocation;
        var data = this.eventsMaster;
        if (isContentFilter) {
            data = data.filter(a => a.ContentType === this.contentType);
        }
        if (isStartDateFilter) {
            var startDate = moment(this.startDate).format('MM/DD/YYYY');
            data = data.filter(a => moment(a.EventFromDate).format('MM/DD/YYYY') >= startDate); 
        }
        
        if (isEndDateFilter) {
            var endDate = moment(this.endDate).format('MM/DD/YYYY');
            data = data.filter(a => moment(a.EventToDate).format('MM/DD/YYYY') <= endDate);  
        }
        if (isLocationFilter) {
            var locationData: any=[];
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].Locations.length; j++) {
                    if (data[i].Locations[j].LocationId === this.selectedLocation.LocationId) {
                        if (locationData.indexOf(data[i]) === -1) {
                            locationData.push(data[i]);
                        }
                        
                    }
                }
            }
            data = locationData;
        }
        this.events = this.filteredEvents = data;
    }
    ngOnDestroy() {
        this.paramRoute.unsubscribe();
    }
    public sliderChange(pageIndex: number): void {
        this.state.skip = (pageIndex - 1) * this.state.take;
    }
}
