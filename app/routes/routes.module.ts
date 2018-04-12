import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MenuService } from '../core/menu/menu.service';
import { SharedModule } from '../shared/shared.module';

import { menu } from './menu';

@NgModule({
    imports: [
        SharedModule.forRoot(),
        RouterModule.forRoot([

            {
                path: '',
                children: [
                    { path: '', redirectTo: '/home', pathMatch: 'full' },
                    { path: 'event', loadChildren: 'app/routes/event/event.module#EventModule' },
                    { path: 'eventsDashboard', loadChildren: 'app/routes/eventsDashboard/eventsDashboard.module#EventsDashboardModule' },
                    { path: 'eventCategory', loadChildren: 'app/routes/eventCategory/eventCategory.module#EventCategoryModule' },
                    { path: 'home', loadChildren: 'app/routes/home/home.module#HomeModule' },
                    { path: 'message', loadChildren: 'app/routes/message/message.module#MessageModule' },
                    { path: 'location', loadChildren: 'app/routes/location/location.module#LocationModule' },
                ]
            },

            // Not found
            { path: '**', redirectTo: '/home' }

        ])
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})

export class RoutesModule {
    constructor(private menuService: MenuService) {
        menuService.addMenu(menu);
    }
}
