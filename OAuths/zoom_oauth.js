var request = require("request");
var your_app_client_id = 'dbFTPDORTj2KGXV7RXU0Vw'
var your_app_client_secret = 'yLS72icKGb1vqlbvs2onefB8JrWkO6Mw'
var options = {
  method: 'POST',
  url: 'https://zoom.us/oauth/token?grant_type=client_credentials',
  headers: {
    /**The credential below is a sample base64 encoded credential. Replace it with "Authorization: 'Basic ' + Buffer.from(your_app_client_id + ':' + your_app_client_secret).toString('base64')"
    **/
   Authorization: 'Basic ' + Buffer.from(your_app_client_id + ':' + your_app_client_secret).toString('base64')
  }
  };

  request(options, function(error, response, body) {
   if (error) throw new Error(error);

   console.log(body);
  });