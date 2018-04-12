import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessageComponent } from './message.component';
import { SharedModule } from '../../shared/shared.module';
import { GridModule } from '@progress/kendo-angular-grid';
import { TagInputModule } from 'ng2-tag-input';
import { ViewMessageGridComponent } from './viewMessage/viewMessage-grid.component';
import { ViewMessageComponent } from './viewMessage/viewMessage.component';
import { TimepickerModule } from 'ng2-bootstrap';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

const routes: Routes = [
    
    { path: 'messageDashboard', component: ViewMessageComponent },
    { path: 'createMessage', component: MessageComponent }
  
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        GridModule,
        TagInputModule,
        TimepickerModule,
        DateInputsModule,
        DropDownsModule
    ],
    declarations: [
        MessageComponent,
        ViewMessageGridComponent,
        ViewMessageComponent
      
    ],
    exports: [
        RouterModule
    ]
})
export class MessageModule { }
