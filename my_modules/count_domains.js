module.exports = countDomains;

function countDomains(domains) {
  let counted_domains = [];

  domains.forEach(function checkForDomain(domain) {
    let no_has_domain = (counted_domains.findIndex((item) => item.domain === domain)) === -1;
    if (no_has_domain) {
      let new_domain = {
        domain: domain,
        count: 1
      };
      counted_domains.push(new_domain);
    } else {
      let existing_domain_index = counted_domains.findIndex((item)=>item.domain === domain);
      counted_domains[existing_domain_index].count += 1;
    }
  });

  return counted_domains;
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

  console.log(countDomains(top_domains));
}
