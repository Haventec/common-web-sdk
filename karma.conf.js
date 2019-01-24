// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '.',
        plugins: [
            require('karma-es6-shim'),
            require('karma-jasmine'),
            require('karma-browserify'),
            require('karma-chrome-launcher'),
            require('karma-phantomjs-launcher')
        ],
        frameworks: ['browserify', 'jasmine', 'es6-shim'],
        files: [
            './ts/**/*.ts',
            './test/jasmine/*.ts'
        ],

        preprocessors: {
            '**/*.ts': ['browserify']
        },

        // configure browserify to transpile typescript
        browserify: {
            debug: true,
            allowJs: true,
            plugin: [
                ['tsify', { target: 'es5' }]
            ]
        },

        mime: {
            'text/x-typescript': ['ts','tsx']
        },

        customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    '--no-sandbox',
                    // See https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
                    '--headless',
                    '--disable-gpu',
                    // Without a remote debugging port, Google Chrome exits immediately.
                    ' --remote-debugging-port=9227'
                ]
            }
        },

        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
};
