import { Component, Input, OnInit, ChangeDetectionStrategy, ViewContainerRef, ApplicationRef, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { State, process } from '@progress/kendo-data-query';
import { EventCategoryService } from '../../data/services/eventCategory.service';
import { IEventCategory } from '../../shared/interfaces/models';
import { ToastrService } from '../../shared/services/toastr.service';
import { GridDataResult,PageChangeEvent } from '@progress/kendo-angular-grid';


@Component({
    moduleId: module.id,
    selector: 'event-categories-grid',
    templateUrl: 'eventCategory-grid.component.html'

})
export class EventCategoryGridComponent implements OnInit {
   private editedRowIndex: number;
    public formGroup: FormGroup;
    private loading: boolean = true;
    private eventCategories: any[] ;
    eventCategory: IEventCategory = {
        EventCategoryId: 0,
        EventCategoryName: ''
    };

    constructor(private dataService: EventCategoryService, private toastrService: ToastrService) { }

    ngOnInit() {
        this.getEventCategories();
      
    }
    public state: State = {
        sort: [],
        skip: 0,
        take: 10
    };

    protected editHandler({sender, rowIndex, dataItem}) {


        this.formGroup = new FormGroup({

            'EventCategoryName': new FormControl(dataItem.EventCategoryName, Validators.required),

        });

        this.editedRowIndex = rowIndex;
       
        sender.editRow(rowIndex, this.formGroup);
        setTimeout(() => this.focusFirstCell());
    }


    protected addHandler({sender}) {
        this.closeEditor(sender);

        this.formGroup = new FormGroup({
            'EventCategoryName': new FormControl("", Validators.required),

        });
       
        sender.addRow(this.formGroup);
        setTimeout(() => this.focusFirstCell());
    }

    private closeEditor(grid, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
        this.editedRowIndex = undefined;
        this.formGroup = undefined;
    }

    protected cancelHandler({sender, rowIndex}) {
        this.closeEditor(sender, rowIndex);
    }
    getEventCategories() {


        this.dataService.getEventCategories()
            .subscribe((response: IEventCategory[]) => {
                this.eventCategories = response;
              
            },
            (err: any) => console.log(err),
            () => {
                this.loading = false;
                this.toastrService.showInfo("Data Loaded");
            });
    }
    protected saveHandler({sender, rowIndex, formGroup, isNew}) {

        const category: IEventCategory = formGroup.value;
        if (!sender._pristine) {
            if (isNew) {
                this.dataService.insertCategory(category)
                    .subscribe(response => this.getEventCategories());
            } else {
                category.EventCategoryId = this.eventCategories[rowIndex].EventCategoryId;
                this.dataService.updateCategory(category)
                    .subscribe(response => this.getEventCategories());
            }
        }
        sender.closeRow(rowIndex);
        this.toastrService.showSuccess("Success");

    }

    protected removeHandler({dataItem}) {

        this.dataService.deleteCategory(dataItem.EventCategoryId)
            .subscribe((response: boolean) => {
                this.getEventCategories();
            },
            (err: any) => console.log(err),
            () => {
                this.toastrService.showSuccess("Deleted Successfully!");

            });

    }
  
    public sliderChange(pageIndex: number): void {
        this.state.skip = (pageIndex - 1) * this.state.take;
    }
    private focusFirstCell() {
      
        var element = <HTMLElement>document.querySelector('.k-grid-content .k-grid-edit-row input.ng-pristine');
        element.focus();
    }
}
