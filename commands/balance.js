module.exports = function () {

  program
    .command('balance')
    .action(function () {

      if (!plaid) return;

      var accounts = config.get('accounts') || [],
        question;

      _.each(accounts, function (account, i) {
        console.log('%d : %s', i, account.key);
      });

      prompt.get(['Which account would you like to query? (Enter number)'], function (err, results) {

        var answer = results['Which account would you like to query? (Enter number)'];

        if (accounts[answer] !== null) {

          plaid.get(accounts[answer].access_token, function (err, response) {

            console.log(response);

          });

        }

      });

    });

}