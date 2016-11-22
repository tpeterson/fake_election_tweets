'use strict';

const crypto = require('crypto');
const http = require('http');

// Set your expires times for several minutes into the future.
// An expires time excessively far in the future will not be honored by the Mozscape API.
// Divide the result of Date.now() by 1000 to make sure your result is in seconds.
const expires = Math.floor((Date.now() / 1000)) + 300;
const accessId = process.env.MOZ_ACCESS_ID;
const secretKey = process.env.MOZ_SECRET_KEY;

// 'cols' is the sum of the bit flags representing each field you want returned.
// Learn more here: https://moz.com/help/guides/moz-api/mozscape/api-reference/url-metrics
const cols = '16384';

// Put each parameter on a new line.
const stringToSign = `${accessId}\n${expires}`;

//create the hmac hash and Base64-encode it.
let signature = crypto.createHmac('sha1', secretKey).update(stringToSign).digest('base64');
//URL-encode the result of the above.
let encoded_signature = encodeURIComponent(signature);

let postData = JSON.stringify([
  'https://www.lifezette.com/polizette/trump-time-drain-swamp-washington/',
  'http://www.breitbart.com/wikileaks/2016/10/23/wikileaks-hillary-gun-control-supporters-planted-town-hall-audience/',
  'http://newsninja2012.com/wikileaks-hillarys-aides-urged-her-to-take-foreign-lobbyist-donation-and-deal-with-attacks/?utm_content=buffer5d6bb&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer'
]);

let options = {
  hostname: 'lsapi.seomoz.com',
  path: `/linkscape/url-metrics/?Cols=${cols}&AccessID=${accessId}&Expires=${expires}&Signature=${encoded_signature}`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

let req = http.request(options, function(response) {
  response.setEncoding('utf8');
  let responseData = '';
  response.on('data', function(chunk) {
    responseData += chunk;
  });
  response.on('end', function() {
    console.log(responseData);
  });
});

//Make the request.
req.write(postData);
req.end();
