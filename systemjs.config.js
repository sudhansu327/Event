(function (global) {

    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        '@angular': 'node_modules/@angular',
        '@progress': 'node_modules/@progress',
        '@telerik': 'node_modules/@telerik',
        'rxjs': 'node_modules/rxjs',
        'jquery.browser': 'node_modules/jquery.browser',
        'jquery': 'node_modules/jquery',
        'fullcalendar': 'node_modules/fullcalendar/',
        'moment': 'node_modules/moment',
        'ng2-bootstrap': 'node_modules/ng2-bootstrap',
        'ng2-toastr': 'node_modules/ng2-toastr',
        'ng2-tag-input': 'node_modules/ng2-tag-input',
        'ng2-file-upload': 'node_modules/ng2-file-upload',
        '@angular/animations': 'node_modules/@angular/animations/bundles/animations.umd.min.js',
        '@angular/animations/browser': 'node_modules/@angular/animations/bundles/animations-browser.umd.js',
        '@angular/platform-browser/animations': 'node_modules/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
        'toastr': 'node_modules/toastr'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        'jquery': { main: 'dist/jquery.js', defaultExtension: 'js' },
        'jquery.browser': { main: 'dist/jquery.browser.js', defaultExtension: 'js' },
        'component-loader.factory': { main: 'component-loader.factory.js', defaultExtension: 'js' },
        'positioning': { main: 'index.js', defaultExtension: 'js' },
        "@progress/kendo-angular-buttons": { "main": "dist/cdn/js/kendo-angular-buttons.js", "defaultExtension": "js" },
        "@progress/kendo-angular-dateinputs": { "main": "dist/cdn/js/kendo-angular-dateinputs.js", "defaultExtension": "js" },
        "@progress/kendo-angular-dialog": { "main": "dist/cdn/js/kendo-angular-dialog.js", "defaultExtension": "js" },
        "@progress/kendo-angular-inputs": { "main": "dist/cdn/js/kendo-angular-inputs.js", "defaultExtension": "js" },
        '@progress/kendo-angular-grid': { main: 'dist/cdn/js/kendo-angular-grid.js', defaultExtension: 'js' },
        '@progress/kendo-angular-intl': { main: 'dist/cdn/js/kendo-angular-intl.js', defaultExtension: 'js' },
        '@progress/kendo-data-query': { main: 'dist/cdn/js/kendo-data-query.js', defaultExtension: 'js' },
        '@progress/kendo-angular-l10n': { main: 'dist/cdn/js/kendo-angular-l10n.js', defaultExtension: 'js' },
        '@progress/kendo-angular-dropdowns': { main: 'dist/cdn/js/kendo-angular-dropdowns.js', defaultExtension: 'js' },
        'fullcalendar': { main: 'dist/fullcalendar.js', defaultExtension: 'js' },
        'ng2-bootstrap': { format: 'cjs', main: 'bundles/ng2-bootstrap.umd.js', defaultExtension: 'js' },
        'ng2-toastr': { main: 'bundles/ng2-toastr.js', defaultExtension: 'js' },
        'moment': { main: 'moment.js', defaultExtension: 'js' },
        'ng2-tag-input': { main: 'dist/ng2-tag-input.bundle.js', defaultExtension: 'js' },
        'ng2-file-upload': { main: 'ng2-file-upload.js', defaultExtension: 'js' },
        'toastr': { main: 'build/toastr.min.js', defaultExtension: 'js' },
        angular: { defaultExtension: false }
    };

    var ngPackageNames = [
      'common',
      'compiler',
      'core',
      'forms',
      'http',
      'platform-browser',
      'platform-browser-dynamic',
      'router',
      'upgrade'
    ];

    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }

    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/' + pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    }

    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);

    var config = {
        meta: {
            '*': {
                authorization: true
            }
        },
        map: map,
        packages: packages,
        defaultJSExtensions: false
    };

    System.config(config);

})(this);