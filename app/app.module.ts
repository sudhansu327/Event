import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutComponent } from './layout/layout.component';
import { RoutesModule } from './routes/routes.module';

import { CoreModule } from './core/core.module';
import { DataServiceModule } from './data/dataservices.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,        
        LayoutModule,
        FormsModule,
        RoutesModule,     //Main routes for application
        CoreModule,           //Singleton objects (services, components that are loaded only once, etc.)
        DataServiceModule,//Singleton objects (services, components that are loaded only once, etc.)
        SharedModule.forRoot()
        
    ],
    declarations: [LayoutComponent],
    bootstrap: [LayoutComponent]
})
export class AppModule {
    
}