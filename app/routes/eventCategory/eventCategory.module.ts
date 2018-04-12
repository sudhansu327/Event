import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';

import { EventCategoryComponent } from './eventCategory.component';
import { EventCategoryGridComponent } from './eventCategory-grid.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    { path: '', component: EventCategoryComponent }
   // { path: '', component: EventCategoryGridComponent },

];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        GridModule
    ],
    declarations: [
        EventCategoryComponent,
       EventCategoryGridComponent
    ],
    exports: [
        RouterModule
    ]
})
export class EventCategoryModule { }
