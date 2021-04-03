const { withPrefix: gatsbyWithPrefix } = require("gatsby");
const _ = require('lodash');

export default function withPrefix(url) {
    if (_.startsWith(url, '#') || _.startsWith(url, 'http://') || _.startsWith(url, 'https://') ||
        _.startsWith(url, 'mailto')) {
        return url;
    }
    return gatsbyWithPrefix(url);
}
