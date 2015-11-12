
'use strict';

/**
 * Created by parthpatel1001 on 11/3/15.
 */


var app = require('app');
var BrowserWindow = require('browser-window');

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        frame: false,
        title: 'LensBin'
    });

    mainWindow.loadUrl('file://' + __dirname + '/index.html');
});