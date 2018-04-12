import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';
import { UserService } from '../../../data/services/user.service';
import {  IUser } from '../../../shared/interfaces/models';


@Component({
    moduleId: module.id,
    selector: 'app-userblock',
    templateUrl: './userblock.component.html'
})
export class UserblockComponent implements OnInit {
    user: any;
    
    constructor(private userblockService: UserblockService, private userService: UserService) {

        this.user = {
            DisplayName: '',
            FirstName: '',
            LastName:'',
            ImageString: '',
            UserId: ''
            
        };
    }

    ngOnInit() {
        this.getUserInformation();
    }
    getUserInformation() {

        this.userService.getUser()
            .subscribe((response: IUser) => {
                this.user = response;
                

            },
            (err: any) => console.log(err),
            () => {
                console.log('Retrieved user Info');
            });
        
    }
    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }

}
