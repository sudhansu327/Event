import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    moduleId : module.id,
    selector: 'cm-datepicker',
    templateUrl: 'datepicker.component.html',
    styles: [`
    .popup {
      position: absolute;
      background-color: #fff;
      border-radius: 3px;
      border: 1px solid #ddd;
      height: 251px;
      z-index:2;
    }
  `],
})
export class DatepickerComponent {
    @Input()
    dateModel: Date;
    @Input()
    label: string;
    @Output() dateModelChange: EventEmitter<Date> = new EventEmitter<Date>();
    private showDatepicker: boolean = false;

    showPopup() {
        this.showDatepicker = true;
    }
    today(): void {
        this.dateModel = new Date();
        this.dateModelChange.emit(this.dateModel);
        this.showDatepicker = false;
    }

    clear(): void {
        this.dateModel = void 0;
        this.showDatepicker = false;
    }
    hidePopup(event) {
        this.showDatepicker = false;
        this.dateModel = event;
        this.dateModelChange.emit(event);
    }
}