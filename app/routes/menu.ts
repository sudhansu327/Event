const Home = {
    text: 'Dashboard',
    link: '/home',
    icon: 'icon-speedometer'
};

const Dashboard = {
    text: 'Event List',
    link: '/eventsDashboard',
    icon: 'icon-list'
};
const Category = {
    text: 'Category',
    link: '/eventCategory',
    icon: 'icon-grid'
};
const Message = {
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
const Location = {
    text: 'Location',
    link: '/location',
    icon: 'icon-plane'
};

const headingMain = {
    text: 'Main Navigation',
    heading: true
};

export const menu = [
    headingMain,
    Home,
    Dashboard,
    Category,
    Message,
    Location
];
