import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TagInputModule } from 'ng2-tag-input';
import { FileUploadModule } from 'ng2-file-upload';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';


import { EventComponent } from './event.component';
import { SharedModule } from '../../shared/shared.module';
import { UploadComponent } from './upload.component';
import {CarouselComponent} from './carousel.component';
import { DialogModule } from '@progress/kendo-angular-dialog';


const routes: Routes = [
    { path: '', component: EventComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        GridModule,
        DropDownsModule,
        TagInputModule,
        FileUploadModule,
        DialogModule,
        DateInputsModule
    ],
    declarations: [
        EventComponent,
        UploadComponent,
        CarouselComponent
    ],
    exports: [
        RouterModule
    ]
})
export class EventModule { }
