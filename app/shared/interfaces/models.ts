export interface ICustomer {
    ID: number;
    FirstName: string;
    LastName: string;
    Gender: string;
    Address: string;
    City: string;
    State: IState;
    Orders?: IOrder[];
    OrderTotal?: number;
    Latitude?: number,
    Longitude?: number
}

export interface IState {
    Abbreviation: string;
    Name: string;
}

export interface IOrder {
    ProductName: string;
    ItemCost: number;
}

export interface IOrderItem {
    ID: number;
    ProductName: string;
    ItemCost: number;
}

export interface ITag {
  TagId: number;
  TagName: string;
}

export interface IAirport {
    //FboId: number;
    //FboName: string;
     AirportId :number;
     AirportCode :string;
     AirportName: string;
}

export interface IEventCategory {
    EventCategoryId: number;
    EventCategoryName: string;
   
   
}
export interface IContentType {
    ContentTypeName:string
}
export interface IEvent {
    Title: string;
    SubTitle:string;
    SummaryDescription:string;
    ContentType: string;
    RenderOnHomeScreen?: boolean;
    ActiveDateFrom: Date;
    ActiveDateTo: Date;
    EventFromDate: Date;
    EventToDate: Date;
    DisplayEventDate?: boolean;
    DisplayCountdown?:boolean;
    GeneralContent?: boolean;
    Locations: ILocationMin[];
    EventCategoryId?: number;
    EventLocation: string;
    EventCategoryName: string;
    EventId: number;
    EventImages: IEventImage[];
    DetailTitle: string;
    DetailDescription: string;
    MoreInfoText: string;
    MoreInfoUrl: string;
    NotificationMessage: string;
    EventDashboardImage: any;
    TermsandConditions: string;
}
export interface IUser {
    UserId: string;
    DisplayName: string;
    FirstName: string;
    LastName: string;
    ImageString:string;
}
export interface IEventPromotionVm {    
    EventsCount: number;
    PromotionsCount: number;


}
export interface ILocationMin {
        LocationId:number;
        LocationName: string;
        LocationNameAirportCode:string;
}

export interface ILocation {
        LocationId:number;
        LocationName: string;
        LocationNameAirportCode:string;
        LocationAddress:string;
        LogoPath:string;
        GeofenceId:string;
        AirPortCode:string;
        AirPortCity:string;
        AirPortState:string;
        ZipCode:string;
        FuelBrand:string;
        Email:string;
        Services:string[];
}

export interface IGeofence {
        GeofenceId:number;
        GeofenceName: string;
}

export interface IAutopopulate {
    value: number;
    display: string;
}

export interface IEventImage {
    AssocEventImageId:number;
    EventImageId: number;
    ImageType:string;
    Image: any;
    ImageName: string;
}

export interface IEventCalendarVm {

    id: number;
    title: string;
    start: Date;
    end: Date;
    url: string;
    backgroundColor: string;
    borderColor: string;

}
export interface IExploreVm {
    InformationText:string;
}
export interface IMessage {
    Audience: string;
    NotificationType:string;
    Notification: IMessageNotification;
    InAppNotification: boolean;
    PushNotification: boolean;
    PushNotificationText: string;
    messageId: number;
    DeviceTypes: string;
    MessageScheduledDate: Date;
    MessageExpirationDate: Date;
    ExpirationDurationQuantity: number;
    ExpirationDurationType: number;
    selectedTags: any[];
    TagName:any[];
    SelectedMessageAction: string;
    MessageSendTime: string;
    ExpirationCheck: boolean;
    Duration: string;
    MessageAction: IMessageAction;
    MessageScheduledDateString:string;
    MessageExpirationDateString:string;
}

export interface IMessageNotification {
    ios: IMessagePlatform;
}
export interface IMessagePlatform {
    alert: string;
    sound: string;
    badge:string;
}
export interface INotificationTag {
    NotificationTagId: number;
    TagName: string;
    notification:IMessage;
}
export interface IPushNotification {
    Message: IMessage,
    Status: string;
    MessageId:number;
    

}
export interface IMessageViewVm {
    DraftsMessageList: MessageViewListVm[];
    HistoryMessageList: MessageViewListVm[];
    ScheduledMessageList: MessageViewListVm[];
}
export interface MessageViewListVm {
    Message: string;
    isIos: boolean;
    Audience: string;
    Delivery: string;
    Status: string;
    MessageId:number;
}
export interface IMessageAction {
    ActionId: number;
    ActionName: string;
    ActionDescription:string;
}