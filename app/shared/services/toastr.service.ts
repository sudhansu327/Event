//import { Injectable } from '@angular/core'

////TODO: Fis this

//declare let toastr: any;

//@Injectable()
//export class ToastrService {
//    constructor() {
//        //toastr.options = { positionClass: 'toast-bottom-right', newestOnTop: false, closeButton: true, preventDuplicates: true }
//    }
//    showSuccess(message:string) {
//        //toastr.success(message);
//    }
//    showError(message: string) {
//        //toastr.error(message);
//    }
//    showInfo(message: string) {
//        //toastr.info(message);
//    }
//    showWarning(message: string) {
//        //toastr.warning(message);
//    }
//}


import { Injectable } from '@angular/core';
import * as toastr from 'toastr';


@Injectable()
export class ToastrService {

    constructor() {
        toastr.options.positionClass = 'toast-bottom-right';
        toastr.options.newestOnTop = false;
        toastr.options.closeButton = true;
        toastr.options.preventDuplicates = true;
    }
    showSuccess(message: string, title?: string) {
        toastr.success(message, title)
    }
    showInfo(message: string, title?: string) {
        toastr.info(message, title)
    }
    showWarning(message: string, title?: string) {
        toastr.warning(message, title)
    }
    showError(message: string, title?: string) {
        toastr.error(message, title)
    }
}



