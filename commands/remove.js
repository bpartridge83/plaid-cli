/*global program, plaid, config, options */

module.exports = function () {

  program
    .command('remove')
    .action(function () {

      if (!plaid) return;

      var accounts = config.get('accounts') || [],
        question;

      _.each(accounts, function (account, i) {
        console.log('%d : %s', i, account.key);
      });

      prompt.get(['Which account would you like to remove? (Enter number)'], function (err, results) {

        var answer = results['Which account would you like to remove? (Enter number)'];

        if (accounts[answer]) {

          plaid.remove(accounts[answer].access_token, function (err, response) {

            accounts = _.reject(accounts, function (account, i) { return !!(i == answer); });
            config.set('accounts', accounts);
            config.save();

          });

        }

      });

    });

}