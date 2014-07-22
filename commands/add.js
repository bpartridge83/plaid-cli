/*global program, plaid, config, options */

var request = require('request');

module.exports = function () {

  var callback = function (err, response, mfa) {

    console.log(response);
    console.log(mfa);

    if (mfa) {

      prompt.get(['MFA Answer'], function (err, results) {
        plaid.step(response.access_token, results['MFA Answer'], callback);
      });

    } else {

      var accounts = config.get('accounts') || [];

      accounts.push({
        key: response.accounts[0].institution_type,
        access_token: response.access_token
      });

      config.set('accounts', accounts);

      config.save();

    }

  }

  program
    .command('add')
    .action(function () {

      // request('https://api.plaid.com/institutions', function (err, response, body) {

      //   var institutions = JSON.parse(body);

      //   console.log(institutions[0])

      // });

      if (!plaid) return;

      prompt.get([
        {
          name: 'Institution Key',
          required: true,
          pattern: /^[a-zA-Z\s\-]+$/,
        },
        {
          name: 'Institution Username',
          required: true,
          pattern: /^[a-zA-Z0-9\s\-]+$/
        },
        {
          name: 'Institution Password',
          required: true,
          hidden: true
        },
        {
          name: 'Email Address',
          required: true
        }
      ], function (err, results) {

        console.log(results);

        die();

        plaid.connect({
          username: results['Institution Username'],
          password: results['Institution Password']
        }, results['Institution Key'], results['Email Address'], callback);

      });

    });

}