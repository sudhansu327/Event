import { LayoutComponent } from '../layout/layout.component';

export const routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            { path: 'event', loadChildren: 'app/routes/event/event.module#EventModule' },
            { path: 'eventsDashboard', loadChildren: 'app/routes/eventsDashboard/eventsDashboard.module#EventsDashboardModule' },
            { path: 'eventCategory', loadChildren: 'app/routes/eventCategory/eventCategory.module#EventCategoryModule' },
            { path: 'home', loadChildren: 'app/routes/home/home.module#HomeModule' },
            { path: 'message', loadChildren: 'app/routes/message/message.module#MessageModule' },
            { path: 'location', loadChildren: 'app/routes/location/location.module#LocationModule' }
        ]
    },

    // Not found
    { path: '**', redirectTo: '/home' }

];
