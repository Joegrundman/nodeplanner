// karma configuration

module.exports = function(config) {
    'use strict';
    
    config.set({
        
        // toggle watching and executing after change
        autoWatch: true,
        
        // base path to resolve files
        basePath: '../',
        
        //testing framework to be used (jasmine/mocha)
        // as well as additional frameworks like require js, sinon)
        frameworks: [
            "jasmine"
        ],
        
        //list of files / patterns to load in the browser
        files: [
            "javascripts/vendor/jquery.min.js",
            "javascripts/vendor/jquery-ui.min.js",
            "javascripts/Globals/globals.js",
            "javascripts/**/*.js",
            "test/spec/Globals/globals.test.js",
            "test/spec/**/*.test.js"
        ],
        
        // list of files/patterns to exclude
        exclude: [
            
        ],
        
        //web server port
        port: 8080,
        
            // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "Chrome"
    ],
    
       // Which plugins to enable
    plugins: [
      "karma-chrome-launcher",
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,
    
    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
        
    })
}