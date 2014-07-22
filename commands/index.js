'use strict';

var fs  = require('fs');

module.exports = function () {

  fs.readdirSync(__dirname)
    .filter(function (e) {
      return !~e.indexOf('index.js');
    })
    .map(function (e) {
      return e.split('.')[0];
    })
    .forEach(function (command) {
      require('./' + command)();
    });

};
