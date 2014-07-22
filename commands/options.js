module.exports = function () {
  
  if (options.info || options.i) {
    
    if (config.get('client_id')) {
      console.log('API Client ID:', config.get('client_id'))
    }

    if (config.get('secret')) {
      console.log('API Secret:', config.get('secret'))
    }

  }

}