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
    selector: 'fbo-component',
    templateUrl: 'fbo.component.html',
    styleUrls: ['fbo.component.css']
})
export class FboComponent implements OnInit {
    title: string;
    subtitle: string;
    router: Router;
    fboList:any[];
    //need a separate array to filter into for typeahead that won't mess with the masterlist.
    fboComboBoxList: ILocation[];
    geofenceComboBoxList: IGeofence[];
    geofenceList: any[];
    state: State;
    gridView: GridDataResult;
    pageSize: number;
    formGroup: FormGroup;
    constructor(private injector: Injector, private dataService: LocationService, private toastrService: ToastrService) { }
    ngOnInit() {
        this.title = "Fbo Administration";
        this.subtitle = "Update Fbo Geofence Mapping";
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
        var fboObservable = this.dataService.getAllLocations();
        Observable.forkJoin([fboObservable, geofenceObservable])
            .subscribe((response) => {
                this.fboList = response[0];
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
        this.gridView = {
            data: this.fboList.slice(this.state.skip, this.state.skip + this.pageSize),
            total: this.fboList.length
        };
    }

    protected editHandler({ sender, rowIndex, dataItem }) {


        this.formGroup = new FormGroup({

            'GeofenceName': new FormControl(dataItem.GeofenceId, Validators.required),
            // 'GeofenceId': new FormControl(dataItem.GeofenceId)
        });

        var editedRowIndex = rowIndex;

        sender.editRow(rowIndex, this.formGroup);

    }

    public testHandler(event): void {
        var test = "hey, got here";
    }


    protected cancelHandler({ sender, rowIndex }) {
        sender.closeRow(rowIndex);
    }

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

    protected fboSelection(event) {

        if (event === undefined || event === null) {
            this.gridView.data = this.fboList;
            return;
        }

        this.gridView.data = this.fboList.filter(fbo => fbo.LocationId === event.LocationId) as any[];

    }
    
    protected geofenceSelection(event, rowIndex, sender) {

        if (event === undefined || event === null) {
            return;
        }

        this.gridView.data[rowIndex].GeofenceId = event.GeofenceId;

    }

    protected fboFilter(event) {
        this.fboComboBoxList = this.fboList
            .filter((s) =>
                s.LocationName.toLowerCase().indexOf(event.toLowerCase()) !== -1
            );
    }

    protected geofenceFilter(event) {
        this.geofenceComboBoxList = this.geofenceList
            .filter((s) =>
                s.GeofenceName.toLowerCase().indexOf(event.toLowerCase()) !== -1
            );
    }

    protected fboFill(event) {
        //Fill with data if clicked
        this.fboComboBoxList = this.fboList;
    }

    protected geofenceFill(event){
        this.geofenceComboBoxList = this.geofenceList;
    }
}

