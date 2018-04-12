"use strict";
var core_1 = require("@angular/core");
function routerTransition() {
    return slideToLeft();
}
exports.routerTransition = routerTransition;
function slideToRight() {
    return core_1.trigger('routerTransition', [
        core_1.state('void', core_1.style({ position: 'fixed', width: '40%' })),
        core_1.state('*', core_1.style({ position: 'fixed', width: '0%' })),
        core_1.transition(':enter', [
            core_1.style({ transform: 'translateX(-40%)' }),
            core_1.animate('0.5s ease-in-out', core_1.style({ transform: 'translateX(0%)' }))
        ]),
        core_1.transition(':leave', [
            core_1.style({ transform: 'translateX(0%)' }),
            core_1.animate('0.5s ease-in-out', core_1.style({ transform: 'translateX(40%)' }))
        ])
    ]);
}
function slideToLeft() {
    return core_1.trigger('routerTransition', [
        core_1.state('void', core_1.style({ position: 'fixed', width: '40%' })),
        core_1.state('*', core_1.style({ position: 'fixed', width: '0%' })),
        core_1.transition(':enter', [
            core_1.style({ transform: 'translateX(40%)' }),
            core_1.animate('0.5s ease-in-out', core_1.style({ transform: 'translateX(0%)' }))
        ]),
        core_1.transition(':leave', [
            core_1.style({ transform: 'translateX(0%)' }),
            core_1.animate('0.5s ease-in-out', core_1.style({ transform: 'translateX(-40%)' }))
        ])
    ]);
}
function slideToBottom() {
    return core_1.trigger('routerTransition', [
        core_1.state('void', core_1.style({ position: 'fixed', width: '100%', height: '100%' })),
        core_1.state('*', core_1.style({ position: 'fixed', width: '100%', height: '100%' })),
        core_1.transition(':enter', [
            core_1.style({ transform: 'translateY(-100%)' }),
            core_1.animate('0.5s ease-in-out', core_1.style({ transform: 'translateY(0%)' }))
        ]),
        core_1.transition(':leave', [
            core_1.style({ transform: 'translateY(0%)' }),
            core_1.animate('0.5s ease-in-out', core_1.style({ transform: 'translateY(100%)' }))
        ])
    ]);
}
function slideToTop() {
    return core_1.trigger('routerTransition', [
        core_1.state('void', core_1.style({ position: 'fixed', width: '100%', height: '100%' })),
        core_1.state('*', core_1.style({ position: 'fixed', width: '100%', height: '100%' })),
        core_1.transition(':enter', [
            core_1.style({ transform: 'translateY(100%)' }),
            core_1.animate('0.5s ease-in-out', core_1.style({ transform: 'translateY(0%)' }))
        ]),
        core_1.transition(':leave', [
            core_1.style({ transform: 'translateY(0%)' }),
            core_1.animate('0.5s ease-in-out', core_1.style({ transform: 'translateY(-100%)' }))
        ])
    ]);
}
//# sourceMappingURL=router.animations.js.map