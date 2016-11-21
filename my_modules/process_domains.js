module.exports = processDomain;

const url = require('url');

function processDomain(domain) {
  let url_obj = url.parse(domain);
  let top_domain = url_obj.host;
  if (top_domain.startsWith('www.')) {
    return top_domain.replace(/^www./, '');
  } else if (top_domain.startsWith('m.')) {
    return top_domain.replace(/^m./, '');
  } else {
    return top_domain;
  }
}

if (!module.parent) {
  const link = 'http://www.twitter.com/MichaelNagrant/status/796208921862094852';
  let top_domain = processDomain(link);
  console.log(top_domain);
}
