import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';

import { throwIfAlreadyLoaded } from '../core/module-import-guard';


import { EventService } from './services/event.service';
import { EventCategoryService } from './services/eventCategory.service';
import { UserService } from './services/user.service';
import { MessageService } from './services/message.service';
import { NotificationTagService } from './services/notificationTag.service';
import { LocationService } from './services/location.service';
@NgModule({
    imports: [        
        HttpModule
    ],
    exports: [
        HttpModule        
    ],    
    providers: [
        EventService, EventCategoryService, UserService, MessageService, NotificationTagService,
        LocationService
    ] // these should be singleton
})
export class DataServiceModule {    //Ensure that CoreModule is only loaded into AppModule

  //Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
    constructor( @Optional() @SkipSelf() parentModule: DataServiceModule) {
        throwIfAlreadyLoaded(parentModule, 'DataServiceModule');
  }
}



