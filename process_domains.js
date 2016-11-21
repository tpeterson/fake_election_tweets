module.exports = processDomain;

function processDomain(domain) {
  let top_level_domain = getTopLevelDomain(domain);
  let cleaned_top_level_domain = cleanTopLevelDomain(top_level_domain);
  return cleaned_top_level_domain;
}

function getTopLevelDomain(domain) {
  let regex_http = /^http:\/\/[\w.]+\//;
  let regex_https =  /^https:\/\/[\w.]+\//;

  let processed_domain = [];
  if (domain.startsWith('https')) {
    processed_domain = domain.match(regex_https);
  } else if (domain.startsWith('http')) {
    processed_domain = domain.match(regex_http);
  }
  return processed_domain[0];
}

function cleanTopLevelDomain(domain) {
  let top_domain = domain;

  if (top_domain.includes('https://')) {
    if (top_domain.includes('www')) {
      top_domain = top_domain.replace('https://www.', '');
      top_domain = top_domain.replace('/', '');
    } else {
      top_domain = top_domain.replace('https://', '');
      top_domain = top_domain.replace('/', '');
    }
  } else if (top_domain.includes('http://')) {
    if (top_domain.includes('www')) {
      top_domain = top_domain.replace('http://www.', '');
      top_domain = top_domain.replace('/', '');
    } else {
      top_domain = top_domain.replace('http://', '');
      top_domain = top_domain.replace('/', '');
    }
  }

  return top_domain;
}

if (!module.parent) {
  const link = 'http://www.twitter.com/MichaelNagrant/status/796208921862094852';
  let top_domain = processDomain(link);
  console.log(top_domain);
}
