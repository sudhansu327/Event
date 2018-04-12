"use strict";
var Home = {
    text: 'Dashboard',
    link: '/home',
    icon: 'icon-speedometer'
};
var Dashboard = {
    text: 'Event List',
    link: '/eventsDashboard',
    icon: 'icon-list'
};
var Category = {
    text: 'Category',
    link: '/eventCategory',
    icon: 'icon-grid'
};
var Message = {
    text: 'Message',
    link: '/message',
    icon: 'icon-envelope',
    submenu: [
        {
            text: 'Message Dashboard',
            link: '/message/messageDashboard'
        },
        {
            text: 'Create Message',
            link: '/message/createMessage'
        }
    ]
};
var Location = {
    text: 'Location',
    link: '/location',
    icon: 'icon-plane'
};
var headingMain = {
    text: 'Main Navigation',
    heading: true
};
exports.menu = [
    headingMain,
    Home,
    Dashboard,
    Category,
    Message,
    Location
];
//# sourceMappingURL=menu.js.map