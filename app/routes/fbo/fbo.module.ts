import { NgModule } from '@angular/core';
import { FboComponent } from './fbo.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
const routes: Routes = [
    { path: '', component: FboComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        GridModule,
        DropDownsModule
    ],
    declarations: [FboComponent,],
    exports: [
        RouterModule
    ]
})
export class FboModule { }