
'use strict';

_spBodyOnLoadFunctionNames.push("load_example_app");

function load_example_app() {
    var appPath = _spPageContextInfo.webAbsoluteUrl + '/SiteAssets/scripts/example';
    var createElementScript = document.createElement('script');

    createElementScript.setAttribute('type', 'text/javascript');
    createElementScript.setAttribute('data-main', appPath + '/amd_modules/main');
    createElementScript.setAttribute('src', appPath + '/dependencies/require.min.js');

    document.body.appendChild(createElementScript);
}
