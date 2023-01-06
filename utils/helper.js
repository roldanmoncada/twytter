// PLACEHOLDER FOR ANY HELPERS WE CREATE
module.exports = {
  ifEquals: (a, b, options) => {
    if (a == b) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
};
