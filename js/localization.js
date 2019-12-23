'use strict';

$(document).ready(function ($) {
    var options = {
        "debug": true,
        "lng": 'hu',
        "fallbackLng": 'hu',
        //"keySeparator": false,
        //"nsSeparator": false,

        "backend": {
            "loadPath": "locales/{{lng}}/{{ns}}.json"
        },
        "detection" : {
            // order and from where user language should be detected
            order: ['querystring', 'cookie', 'localStorage', 'navigator'],

            // keys or params to lookup language from
            lookupQuerystring: 'lng',
            lookupCookie: 'i18next',
            lookupLocalStorage: 'i18nextLng',

            // cache user language on
            caches: ['localStorage', 'cookie'],

            // optional expire and domain for set cookie
            cookieMinutes: 10,
            cookieDomain: 'kiszelynyaralo.hu'
        }
    };

    window.jqueryI18next.init(window.i18next, $, {
        tName: 't', // --> appends $.t = i18next.t
        i18nName: 'i18n', // --> appends $.i18n = i18next
        handleName: 'localize', // --> appends $(selector).localize(opts);
        selectorAttr: 'data-i18n', // selector for translating elements
        targetAttr: 'data-i18n-target', // element attribute to grab target element to translate (if diffrent then itself)
        optionsAttr: 'data-i18n-options', // element attribute that contains options, will load/set if useOptionsAttr = true
        useOptionsAttr: false, // see optionsAttr
        parseDefaultValueFromContent: true // parses default values from content ele.val or ele.text
    });

    window.i18next
        .use(window.i18nextXHRBackend)
        .use(window.i18nextBrowserLanguageDetector)
        .init(options, function(err, t) {
            $('body').localize();
            //$('.nav').localize();
        });
});
