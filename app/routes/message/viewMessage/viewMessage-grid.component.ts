import { Component, Input, OnInit, Injector, ChangeDetectionStrategy, ViewContainerRef, ApplicationRef, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { State, process } from '@progress/kendo-data-query';
import { MessageService } from '../../../data/services/message.service';
import { ToastrService } from '../../../shared/services/toastr.service';
import { IMessageViewVm } from '../../../shared/interfaces/models';
import { Router } from '@angular/router';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
@Component({
    moduleId: module.id,
    selector: 'message-dashboard-grid',
    templateUrl: 'viewMessage-grid.component.html'

})
export class ViewMessageGridComponent implements OnInit {
   
    public draftsMessageList: any[];
    public historyMessageList: any[];
    public scheduledMessageList: any[];
    private editedRowIndex: number;
    router: Router;
  
    private loading: boolean = true;


    constructor(private dataService: MessageService, private toastrService: ToastrService, private injector: Injector) { }

    ngOnInit() {
        this.getMessages();
        this.router = this.injector.get(Router);
    }
    public draftState: State = {
        sort: [],
        skip: 0,
        take: 10
    };
    public historyState: State = {
        sort: [],
        skip: 0,
        take: 10
    };
    public scheduledState: State = {
        sort: [],
        skip: 0,
        take: 10
    };
   
    getMessages() {


        this.dataService.getMessages()
            .subscribe((response: IMessageViewVm) => {
                this.draftsMessageList = response.DraftsMessageList;
                this.historyMessageList = response.HistoryMessageList;
                this.scheduledMessageList = response.ScheduledMessageList;
               
            },
            (err: any) => console.log(err),
            () => {
                this.loading = false;
                this.toastrService.showInfo("Data Loaded");
            });
    }
    protected editHandler({sender, rowIndex, dataItem}) {

        this.router.navigate(["/message/createMessage"], { queryParams: { messageId: dataItem.MessageId } });
    }

    protected removeHandler({dataItem}) {

        this.dataService.deleteMessage(dataItem.MessageId)
            .subscribe((response: boolean) => {
                this.getMessages();
            },
            (err: any) => console.log(err),
            () => {
                this.toastrService.showSuccess("Deleted Successfully!");

            });
    }
    protected pageChange(pageIndex: number): void {
        this.draftState.skip = (pageIndex - 1) * this.draftState.take;
    }
    protected historyGridPageChange(pageIndex: number): void {
        this.historyState.skip = (pageIndex - 1) * this.historyState.take;
       
    }
    protected scheduledGridPageChange(pageIndex: number): void {
        this.scheduledState.skip = (pageIndex - 1) * this.scheduledState.take;
        
    }
   
}
