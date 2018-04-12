import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';

import { EventsDashboardComponent } from './eventsDashboard.component';
import { EventsDashboardGridComponent } from './eventsDashboard-grid.component';
import { SharedModule } from '../../shared/shared.module';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

const routes: Routes = [
    { path: '', component: EventsDashboardComponent }
   
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        GridModule,
        DropDownsModule,
        DateInputsModule
    ],
    declarations: [
        EventsDashboardComponent,
        EventsDashboardGridComponent
    ],
    exports: [
        RouterModule
    ]
})
export class EventsDashboardModule { }
