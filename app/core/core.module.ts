import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { FilterService } from './services/filter.service';
import { SorterService } from './services/sorter.service';
import { TrackByService } from './services/trackby.service';
import { DialogService } from './services/dialog.service';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { ValidationService } from './services/validation.service';

import { SettingsService } from './settings/settings.service';
import { ThemesService } from './themes/themes.service';
import { MenuService } from './menu/menu.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule        
    ],
    exports: [
        RouterModule                
    ],
    declarations: [
    ],
    providers: [
        SettingsService,
        ThemesService,
        MenuService,
        SorterService,
        FilterService,
        TrackByService, 
        DialogService,
        ValidationService
    ] // these should be singleton
})
export class CoreModule {    //Ensure that CoreModule is only loaded into AppModule

  //Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
      throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}



