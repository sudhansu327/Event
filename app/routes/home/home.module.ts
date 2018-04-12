import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent}  from './calendar/calendar.component';
const routes: Routes = [
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [HomeComponent, CalendarComponent],
    exports: [
        RouterModule
    ]
})
export class HomeModule { }
