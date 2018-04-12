import { NgModule } from '@angular/core';
import { LocationComponent } from './location.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
const routes: Routes = [
    { path: '', component: LocationComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        GridModule,
        DropDownsModule
    ],
    declarations: [LocationComponent,],
    exports: [
        RouterModule
    ]
})
export class LocationModule { }