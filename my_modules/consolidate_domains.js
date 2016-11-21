module.exports = consolidateDomains;

function consolidateDomains(domains) {
  let consolidated_domains = [];

  domains.forEach(function checkForDomain(domain) {
    let no_has_domain = (consolidated_domains.findIndex((item) => item === domain)) === -1;
    if (no_has_domain) {
      consolidated_domains.push(domain);
    }
  });

  return consolidated_domains;
}

if (!module.parent) {
  const top_domains = [
    'mklnd.com',
    'mklnd.com',
    'qz.com',
    'stratechery.com',
    'nzzl.us',
    'twitter.com',
    'mklnd.com',
    'twitter.com',
    'nyti.ms',
    'twitter.com',
    'gizmodo.com',
    'twitter.com',
    'mklnd.com',
    'twitter.com',
    'twitter.com',
    'nyti.ms',
    'nzzl.us',
    'twitter.com',
    'twitter.com',
    'theverge.com',
    'twitter.com',
    'latimes.com',
    'twitter.com',
    'marketingland.com',
    'mklnd.com',
    'twitter.com',
    'twitter.com',
    'twitter.com',
    'buzzfeed.com',
    'twitter.com',
    'twitter.com',
    'twitter.com',
    'vox.com',
    'twitter.com',
    'marketingland.com',
    'theverge.com',
    'twitter.com',
    'adweek.com',
    'twitter.com',
    'twitter.com',
    'buzzfeed.com',
    'es.pn',
    'marketingland.com',
    'mklnd.com',
    'scientificamerican.com',
    'marketingland.com',
    'twitter.com',
    'twitter.com',
    'twitter.com',
    'medium.com',
    'medium.com',
    'twitter.com',
    'cosmopolitan.com',
    'twitter.com',
    'google.com',
    'facebook.com',
    'twitter.com',
    'twitter.com',
    'twitter.com'
  ];

  console.log(consolidateDomains(top_domains));
}
