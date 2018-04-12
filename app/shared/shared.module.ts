//import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';

import { FilterTextboxModule } from './filter-textbox/filter-textbox.module';

import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TrimPipe } from './pipes/trim.pipe';
import { DatemPipe } from './pipes/datem.pipe';

import { SortByDirective } from './directives/sortby.directive';
//import { DatepickerComponent } from './components/datepicker/datepicker.component'



import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlertModule, TabsModule, DatepickerModule, TimepickerModule  } from 'ng2-bootstrap';
import { DatepickerComponent } from './components/datepicker/datepicker.component'
import { DialogModule } from '@progress/kendo-angular-dialog';

//import { ToasterModule } from 'angular2-toaster/angular2-toaster';

//import { AccordionModule } from 'ng2-bootstrap/accordion';
//import { AlertModule } from 'ng2-bootstrap/Alert';
//import { ButtonsModule } from 'ng2-bootstrap/buttons';
//import { CarouselModule } from 'ng2-bootstrap/carousel';
//import { CollapseModule } from 'ng2-bootstrap/collapse';
//import { DropdownModule } from 'ng2-bootstrap/dropdown';
//import { ModalModule } from 'ng2-bootstrap/modal';
//import { PaginationModule } from 'ng2-bootstrap/pagination';
//import { ProgressbarModule } from 'ng2-bootstrap/progressbar';
//import { RatingModule } from 'ng2-bootstrap/rating';
//import { TabsModule } from 'ng2-bootstrap/tabs';
//import { TimepickerModule } from 'ng2-bootstrap/timepicker';
//import { TooltipModule } from 'ng2-bootstrap/tooltip';
//import { TypeaheadModule } from 'ng2-bootstrap/typeahead';
import { SpinnerService } from './services/spinner.service';
import { SpinnerComponent } from './services/spinner.component';
import { FlotDirective } from './directives/flot/flot.directive';
import { ToastrService } from './services/toastr.service';


@NgModule({
    imports: [
        CommonModule,
        FilterTextboxModule,
        FormsModule,
        ReactiveFormsModule,
        DatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        DialogModule,
        //AccordionModule.forRoot(),
        //AlertModule.forRoot(),
        //ButtonsModule.forRoot(),
        //CarouselModule.forRoot(),
        //CollapseModule.forRoot()
        //.forRoot() DatepickerModule,
        //DropdownModule.forRoot(),
        //ModalModule.forRoot(),
        //PaginationModule.forRoot(),
        //ProgressbarModule.forRoot(),
        //RatingModule.forRoot(),
        TabsModule.forRoot(),
        //TimepickerModule.forRoot(),
        //TooltipModule.forRoot(),
        //TypeaheadModule.forRoot()
    ],

    exports: [
        CommonModule,
        FormsModule,
        CapitalizePipe,
        TrimPipe,
        DatemPipe,
        SortByDirective,
        FilterTextboxModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        DatepickerComponent,
        //AccordionModule,
        //AlertModule,
        //ButtonsModule,
        //CarouselModule,
        //CollapseModule,
        // DatepickerModule,
        //DropdownModule,
        //ModalModule,
        //PaginationModule,
        //ProgressbarModule,
        //RatingModule,
        TabsModule,
        //TimepickerModule,
        //TooltipModule,
        //TypeaheadModule,
        //FlotDirective
        //SparklineDirective,
        //EasypiechartDirective,
        //CheckallDirective,
        //VectormapDirective,
        //NowDirective,
        //ScrollableDirective,
        //JqcloudDirective
    ],

    declarations: [
        CapitalizePipe,
        TrimPipe,
        DatemPipe,
        SortByDirective,
        DatepickerComponent,
        SpinnerComponent
        //DatepickerComponent
        //FlotDirective
        //SparklineDirective,
        //EasypiechartDirective,
        //CheckallDirective,
        //VectormapDirective,
        //NowDirective,
        //ScrollableDirective,
        //JqcloudDirective
    ],
    providers: [
        SpinnerService,
        ToastrService
    ],
    entryComponents: [
        SpinnerComponent
    ]
})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
