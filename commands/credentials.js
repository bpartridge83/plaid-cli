/*global program, config, options */

module.exports = function () {
  
  program
    .command('login')
    .action(function () {

      var requests = [];

      if (options.client) {
        config.set('client_id', options.client);
      } else {
        requests.push('API Client ID');
      }

      if (options.secret) {
        config.set('secret', options.secret);
      } else {
        requests.push('API Secret');
      }

      if (requests.length) {

        prompt.get(requests, function (err, result) {

          config.set('client_id', result['API Client ID']);
          config.set('secret', result['API Secret']);

          config.save(function (err) {
            console.log('API Credentials Saved');
          });

        });

      }

    });

  program
    .command('logout')
    .action(function () {

      config.set('client_id', '');
      config.set('secret', '');

      config.save(function (err) {
        console.log('Successfully Logged Out');
      });

    });

}