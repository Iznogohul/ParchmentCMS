const packageJson = require('../../package.json');

const arrayIsEmpty = (array) => {
  if (!Array.isArray(array)) {
    return 0;
  }
  if (array.length === 0) {
    return 1;
  }
  return 0;
};
const packageVersion = () => packageJson.version;
const packageAuthor = () => packageJson.author;
module.exports = { arrayIsEmpty, packageVersion, packageAuthor };
