import { Component, OnInit, Injector, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IEventPromotionVm, IEventCalendarVm,IEvent} from '../../../shared/interfaces/models';
import { EventService } from '../../../data/services/event.service';
import { SpinnerService } from '../../../shared/services/spinner.service';


@Component({
    moduleId: module.id,
    selector: 'app-home',
    providers: [SpinnerService],
    templateUrl: './home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
    @ViewChild('spinner', { read: ViewContainerRef }) container: ViewContainerRef;
    router: Router;
    public eventsCount: number;
    public promotionsCount: number;
    public title: string;
    public subtitle: string;
    public eventData: IEvent = {
        Title: '', SubTitle: '', ContentType: '', RenderOnHomeScreen: false,
        ActiveDateFrom: new Date(), ActiveDateTo: new Date(), EventFromDate: new Date(), EventToDate: new Date(),
        DisplayEventDate: false, DisplayCountdown: false, GeneralContent: true,
        Locations: [], EventCategoryId: 0, TermsandConditions:'',
        EventLocation: '', SummaryDescription: '', EventCategoryName: '', EventId: 0, EventImages: [],
        DetailTitle: '', DetailDescription: '', MoreInfoText: '', MoreInfoUrl: '', NotificationMessage: '', EventDashboardImage:null
    };
    public firstEvent: IEvent = this.eventData;
    public secondEvent: IEvent = this.eventData;
    public thirdEvent: IEvent = this.eventData;
    constructor(private injector: Injector, private dataService: EventService, private _spinner: SpinnerService) { }

    ngOnInit() {
        this.router = this.injector.get(Router);
       
        this.getEventPromotionCount();
        this.getTopThreeEvents();
    }
    //Get Event by EventId
    getEventPromotionCount() {

        this.title = "Dashboard";
        this.subtitle = "Welcome to Events and Promotions Dashboard";

        this._spinner.start(this.container);
        this.dataService.getEventPromotionCount()
            .subscribe((response: IEventPromotionVm) => {
                this.eventsCount = response.EventsCount;
                this.promotionsCount = response.PromotionsCount;
            },
            (err: any) => console.log(err),
            () => {
               this._spinner.stop();
            });
    }
    //Get Top 3 Events
    getTopThreeEvents() {
        
        this.dataService.getTopThreeEvents()
            .subscribe((response: IEvent[]) => {
                if (response !== null && response !== undefined) {
                    if (response.length > 2)
                    this.firstEvent = response[2];
                    if (response.length > 1)
                    this.secondEvent = response[1];
                    this.thirdEvent = response[0];
                    //for (var i = 0; i < response[0].EventImages.length; i++) {
                    //    this.thirdEvent.EventDashboardImage = response[0].EventImages[i].Image;
                    //    break;
                    //}
                }
             
            },
            (err: any) => console.log(err),
            () => {
               
            });
    }
    onNavigate(content:string) {

       
        this.router.navigate(["/eventsDashboard"], { queryParams: { type: content } });
    }
}
