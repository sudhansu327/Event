import {Component, OnInit,Input} from '@angular/core';
import {Http} from '@angular/http';
import {IEventImage} from '../../shared/interfaces/models';

@Component({
    moduleId: module.id,
    selector: "app-carousel",
    templateUrl: 'carousel.component.html'
})

export class CarouselComponent implements OnInit  {
    private start = false;
    current: number = 0;
    isPrevHidden: boolean = true;
    isNextHidden: boolean = true;
    @Input() images: IEventImage[];

    constructor() { }

    ngOnInit() {
       
        if (this.images.length > 1) {
            this.isNextHidden = false;
        }
    }
    prevClick() {
        this.current--;
        this.isPrevHidden = this.current === 0;
        this.isNextHidden = false;
    }
    nextClick() {
        this.current++;
        this.isNextHidden = this.current === this.images.length-1;
        this.isPrevHidden = false;
    }

    isActive(eventImageId: number) {
        return eventImageId === this.images[this.current].EventImageId;
    }
}
