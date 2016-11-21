const fs = require('fs');
const processDomain = require('./my_modules/process_domains');
const consolidateDomains = require('./my_modules/consolidate_domains');

module.exports = analyzeTweets;

const account_handle = 'realDonaldTrump';

function analyzeTweets(tweets) {
  let tweets_w_links = getTweetsWithLinks(tweets);
  let domains = getMultipleLinkDomains(tweets_w_links);
  let top_domains = getMultipleTopDomains(domains);
  let consolidated_domains = getConsolidatedDomains(top_domains);
  return consolidated_domains;
}

function getTweetsWithLinks(tweets) {
  let tweets_w_links = [];

  tweets.forEach(function checkForURLs(tweet) {
    if (tweet.urls !== 0) {
      tweets_w_links.push(tweet);
    }
  });

  return tweets_w_links;
}

function getMultipleLinkDomains(tweets) {
  let domains = [];
  tweets.forEach(function getSingleLinkDomain(tweet) {
    domains.push(tweet.urls[0].expanded_url);
  });
  return domains;
}

function getMultipleTopDomains(domains) {
  let top_domains = [];
  domains.forEach(function getSingleTopDomain(domain) {
    top_domains.push(processDomain(domain));
  });
  return top_domains
}

function getConsolidatedDomains(domains) {
  return consolidateDomains(domains);
}

function countLinks(tweets) {
  console.log(`Tweets to analyze: ${tweets.length} tweets`);
  let tweets_w_links_count = 0;
  let tweets_w_no_links_count = 0;
  let total_tweets_count = 0;

  tweets.forEach(function checkForURLs(tweet) {
    if (tweet.urls !== 0) {
      tweets_w_links_count++;
    } else {
      tweets_w_no_links_count++;
    }
    total_tweets_count++;
  });

  console.log(`Tweets with links: ${tweets_w_links_count} tweets`);;
  console.log(`Tweets with no links: ${tweets_w_no_links_count} tweets`);
  console.log(`Total tweets: ${total_tweets_count} tweets`);
}

if (!module.parent) {
  const raw_data = fs.readFileSync(`./data/${account_handle}-processed_tweets.txt`);
  const tweet_data = JSON.parse(raw_data);

  let tweeted_domains = analyzeTweets(tweet_data);
  console.log(`Tweeted domains:\n${tweeted_domains}`);
  fs.writeFile(`./data/${account_handle}-tweeted_domains.txt`, JSON.stringify(tweeted_domains, null, 2), function(err) {
    if (err) throw err;
    console.log(`Domains saved: ${tweeted_domains.length}`);
  });
}
