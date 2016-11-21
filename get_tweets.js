const https = require('https');
const querystring = require('querystring');
const fs = require('fs');

const bearer_token = process.env.TWITTER_BEARER_TOKEN;

const account_handle = 'realDonaldTrump';
const date_cutoff = Date.parse(new Date(Date.UTC(2016, 6, 1)));
let tweets_gotten = [];

function getTweets(handle) {
  let path_endpoint = '/1.1/statuses/user_timeline.json';
  let path_query = querystring.stringify({
    screen_name: handle.trim(),
    count: 200,
    exclude_replies: 'true',
    include_rts: 'false'
  });
  let path_str = `${path_endpoint}?${path_query}`;

  return new Promise(function(resolve, reject) {
    reqTweets(handle, path_str, resolve);
  });
}

function reqTweets(handle, path, cb) {
  let link = {
    hostname: 'api.twitter.com',
    path: path,
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': `Bearer ${bearer_token}`
    }
  };

  https.request(link, function(res) {
    if(res.statusCode !== 200) {
      return console.log('Error ' + res.statusCode);
    }

    let data = new Buffer(0);

    res.on('data', function(chunk) {
      data += chunk;
    });

    res.on('end', function() {
      let info = JSON.parse(data.toString());
      let tweets = processTweets(info);
      tweets_gotten = tweets_gotten.concat(tweets);
      let oldest_date = Date.parse(new Date(tweets[tweets.length-1].timestamp));

      if (date_cutoff < oldest_date) {
        let max_id = tweets[tweets.length-1].id;
        tweets_gotten.pop();

        console.log(`Tweets gotten: ${tweets_gotten.length}`);
        console.log(`Oldest timestamp so far: ${(new Date(oldest_date)).toDateString()}`);

        let path_endpoint = '/1.1/statuses/user_timeline.json';
        let path_query = querystring.stringify({
          screen_name: handle.trim(),
          count: 200,
          exclude_replies: 'true',
          include_rts: 'false',
          max_id: max_id
        });
        let path_str = `${path_endpoint}?${path_query}`;

        reqTweets(handle, path_str, cb);
      } else {
        cb(tweets_gotten);
      }
    });
  }).end();
}

function processTweets(tweets) {
  let processed_tweets = [];
  tweets.forEach(function itemizeTweet(tweet) {
    let itemized_tweet = {
      id: tweet.id,
      account: tweet.user.screen_name,
      timestamp: tweet.created_at,
      text: tweet.text,
      retweets: tweet.retweet_count,
      favorites: tweet.favorite_count,
      urls: checkURLs(tweet.entities)
    };
    processed_tweets.push(itemized_tweet);
  });
  return processed_tweets;
}

function checkURLs(entities) {
  if (entities.urls.length > 0) {
    return entities.urls;
  } else {
    return 0;
  }
}

getTweets(account_handle).then(function(res) {
  console.log(`Tweets processed: ${res.length}`);
  let tweet_data = res.filter(function checkDates(tweet) {
    return Date.parse(tweet.timestamp) > date_cutoff;
  });
  fs.writeFile(`./data/${account_handle}-processed_tweets.txt`, JSON.stringify(tweet_data, null, 2), function(err) {
    if (err) throw err;
    console.log(`Tweets saved: ${tweet_data.length}`);
  });
});
