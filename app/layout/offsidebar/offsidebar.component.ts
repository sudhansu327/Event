import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../core/settings/settings.service';
import { ThemesService } from '../../core/themes/themes.service';

@Component({
    moduleId: module.id,
    selector: 'app-offsidebar',
    templateUrl: './offsidebar.component.html'
})
export class OffsidebarComponent implements OnInit {

    currentTheme: any ;
    selectedLanguage: string;

    constructor(public settings: SettingsService, public themes: ThemesService) {
        this.currentTheme = themes.getDefaultTheme();
        this.selectedLanguage = this.getLangs()[0].code;
    }

    ngOnInit() { }

    setTheme() {
        this.themes.setTheme(this.currentTheme);
    }

    getLangs() {
        return [{ code: 'en', text: 'English' }];
    }

    setLang(value) {        
    }
}
