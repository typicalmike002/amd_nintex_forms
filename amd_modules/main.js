requirejs.config({
    baseUrl: _spPageContextInfo.webAbsoluteUrl + '/SiteAssets/scripts/example/dependencies',
    paths: {
        modules: '../amd_modules'
    }
});

requirejs(['modules/exampleModule']);
