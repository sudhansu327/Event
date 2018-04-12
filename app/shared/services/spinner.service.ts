import { Injectable, ApplicationRef, ViewContainerRef, Component, ComponentRef, ComponentFactoryResolver, ComponentFactory, ViewChild } from '@angular/core';

import { SpinnerComponent } from './spinner.component'; // error here, wrong path


@Injectable()
export class SpinnerService {
    spinnerComp: ComponentRef<any>;

    constructor(private _appRef: ApplicationRef, private _resolver: ComponentFactoryResolver) {
    }

    public start(placeholder) { // placeholder missing!
        //let elementRef: ViewContainerRef = (<any>this._appRef)['_rootComponents'][0].location; // remove this
        let elementRef = placeholder; // add this
        return this.startInside(elementRef, null);
    }

    public startInside(elementRef: ViewContainerRef, anchorName: string) {

        let factory = this._resolver.resolveComponentFactory(SpinnerComponent);
        this.spinnerComp = elementRef.createComponent(factory);
    }

    public stop() {
        if (this.spinnerComp) {
            this.spinnerComp.destroy();
        }
    }
}