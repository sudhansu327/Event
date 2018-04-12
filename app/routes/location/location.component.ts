/// <reference path="../../typings.d.ts" />
import { Component, Input, OnInit, OnDestroy, Injector, ChangeDetectionStrategy, ViewContainerRef, ApplicationRef, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { State, process } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { LocationService } from '../../data/services/location.service';
import { IEvent, IContentType, ILocation, IGeofence } from '../../shared/interfaces/models';
import { ToastrService } from '../../shared/services/toastr.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { FilterService } from '../../core/services/filter.service';
import * as moment from 'moment';


@Component({
    moduleId: module.id,
    selector: 'location-component',
    templateUrl: 'location.component.html',
    styleUrls: ['location.component.css']
})
export class LocationComponent implements OnInit {
    title: string;
    subtitle: string;
    router: Router;
    locationList: ILocation[];
    //need a separate array to filter into for typeahead that won't mess with the masterlist.
    locationComboBoxList: ILocation[];
    geofenceComboBoxList: IGeofence[];
    geofenceList: IGeofence[];
    public state: State;
    gridView: GridDataResult;
    pageSize: number;
    formGroup: any;
    gimbalGeofenceId: string;
    rowIndex: number;
    searchText: string;
    // public eventCategories: any[];
    // public events: any[];
    // filterText: string;
    // filteredEvents: IEvent[] = [];
    // public eventsMaster: any[];
    // private editedRowIndex: number;
    // public formGroup: FormGroup;
    // public contentType: string;
    // public contentTypesList: IContentType[] = [];
    // router: Router;
    // private loading: boolean = true;
    // private paramRoute: any;
    // public startDate: Date;
    // public endDate: Date;
    // fboList: ILocation[];
    // fboMasterList: ILocation[];
    // selectedFbo: any;
    // constructor(private route: ActivatedRoute, private dataService: EventService, private filterService: FilterService, private injector: Injector, public vRef: ViewContainerRef, private toastrService: ToastrService) { }
    constructor(private injector: Injector, private dataService: LocationService, private toastrService: ToastrService) { }
    ngOnInit() {
        this.title = "Location Administration";
        this.subtitle = "Update Location Geofence Mapping";
        this.router = this.injector.get(Router);
        this.pageSize = 10;
        //grid configuration
        this.state = {
            sort: [],
            skip: 0,
            take: 10,
        };
        this.getPageData();
    }

    getPageData(): void {

        var geofenceObservable = this.dataService.getGeofences();
        var locationObservable = this.dataService.getAllLocations();
        Observable.forkJoin([locationObservable, geofenceObservable])
            .subscribe((response) => {
                this.locationList = response[0];
                this.geofenceList = response[1];
            }, (err: any) => console.log(err),
            () => {
                this.loadGridView();
                this.toastrService.showInfo("Data Loaded");
            });
        // if (localStorage.getItem("fboData") == null) {
        //     var fboObservable = this.dataService.getAllFbos();

        //     fboObservable.subscribe((response) => {
        //         this.fboList = response;
        //         localStorage.setItem("fboData", JSON.stringify(response));
        //     }, (err: any) => console.log(err),
        //         () => {
        //             this.loadGridView();
        //             this.toastrService.showInfo("Data Loaded");
        //         });

        // }
        // else {
        //     this.fboList = JSON.parse(localStorage.getItem("fboData")) as IFbo[];
        //     this.loadGridView();
        //     this.toastrService.showInfo("Data Loaded");
        // }
    }


    protected pageChange(event: PageChangeEvent): void {
        this.state.skip = event.skip;
        this.loadGridView();
    }

    private loadGridView(): void {
        
        //select was throwing it as a string.
        this.state.take == Number(this.state.take);

        this.gridView = {
            data: this.locationList.slice(this.state.skip, (this.state.skip + this.state.take)),
            total: this.locationList.length
        };

        var test = this.locationList.slice(this.state.skip, (this.state.skip + this.state.take));
    }

    protected editHandler({ sender, rowIndex, dataItem }) {

        this.rowIndex = rowIndex;
        // make a this.geoFenceId.  set it in the selecthandle events, clear it on edithandler initialization
        this.formGroup = new FormGroup({

            'GeofenceName': new FormControl(dataItem.GimbalGeofenceId, Validators.required),
            'LocationName': new FormControl(dataItem.LocationName, Validators.required)
        });

        var editedRowIndex = rowIndex;

        sender.editRow(rowIndex, this.formGroup);
        setTimeout(() => this.focusFirstCell());
    }

    protected addHandler({ sender, rowIndex, dataItem }) {

        this.router.navigate(["/location"]);

    }

    protected cancelHandler({ sender, rowIndex }) {
        sender.closeRow(rowIndex);
        this.gimbalGeofenceId = null;
    }


    // protected filterChanged(data: string) {
    //     if (data && this.fboList) {
    //         data = data.toUpperCase();
    //         const props = ['Title', 'SubTitle', 'ContentType', 'EventCategoryName'];
    //         this.filteredEvents = this.filterService.filter<IEvent>(this.filteredEvents, data, props);
    //     }
    //     else {

    //         this.filterGridData();
    //     }


    // }

    protected saveHandler({ sender, rowIndex, dataItem, formGroup }) {
        if (!sender._pristine) {
            var location = this.gridView.data[rowIndex];
            this.dataService.updateLocationGeofence(location)
                .subscribe((response) => {
                    this.gridView.data[rowIndex] = response;
                });
        }

        // const category: IEventCategory = formGroup.value;
        // if (!sender._pristine) {

        //         category.EventCategoryId = this.eventCategories[rowIndex].EventCategoryId;
        //         this.dataService.updateCategory(category)
        //             .subscribe(response => this.getEventCategories());
        //     }
        // }
        // sender.closeRow(rowIndex);
        // this.toastrService.showSuccess("Success");
    }

    protected locationFill(event) {
        //Fill with data if clicked
        this.locationComboBoxList = this.locationList;
    }

    protected locationSelection(event) {

        if (event === undefined || event === null) {
            this.gridView.data = this.locationList;
            return;
        }

        this.gridView.data = this.locationList.filter(loc => loc.LocationId === event.LocationId) as any[];

    }

    protected locationFilter(event) {
        this.locationComboBoxList = this.locationList
            .filter((s) =>
                s.LocationName.toLowerCase().indexOf(event.toLowerCase()) !== -1
            );
        this.gridView.data = this.locationComboBoxList;
    }

    protected onSearchButtonClick() {

        try {
            this.gridView.data = this.locationList
                .filter((l) =>
                    (l.LocationName != null && l.LocationName.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1) ||
                    (l.LocationAddress != null && l.LocationAddress.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1) ||
                    (l.AirPortCity != null && l.AirPortCity.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1) ||
                    (l.AirPortCode != null && l.AirPortCode.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1) ||
                    (l.AirPortState != null && l.AirPortState.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1) ||
                    (l.Email != null && l.Email.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1) ||
                    (l.FuelBrand != null && l.FuelBrand.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1) ||
                    (l.LocationId != null && l.LocationId.toString().indexOf(this.searchText) !== -1) ||
                    (l.ZipCode != null && l.ZipCode.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1) ||
                    (l.Services != null && l.Services.findIndex(s => s.toLowerCase() == this.searchText.toLowerCase()) !== -1)
                );
        }
        catch (error) {
            console.log(error); //some Locations have properties coming over as null.
        }

        if (this.searchText == null || this.searchText == "") {
            this.gridView.data == this.locationList;
        }

    }

    protected geofenceSelection(event, rowIndex, sender, formGroup, dataItem) {

        if (event === undefined || event === null) {
            return;
        }

        this.formGroup.controls.GeofenceName.setValue(event.GeofenceId);

        //   var test =   this.gridView.data[rowIndex].GeofenceId
        this.gimbalGeofenceId = event.GeofenceId;
        //    = event.GeofenceId;
        var test = formGroup;
    }



    protected geofenceFilter(event) {
        this.geofenceComboBoxList = this.geofenceList
            .filter((s) =>
                s.GeofenceName.toLowerCase().indexOf(event.toLowerCase()) !== -1
            );
    }

    protected geofenceFill(event) {
        this.geofenceComboBoxList = this.geofenceList;
    }
    private focusFirstCell() {

        var element = <HTMLElement>document.querySelector('.k-grid-content .k-grid-edit-row input.ng-pristine');
        element.focus();
    }
}

