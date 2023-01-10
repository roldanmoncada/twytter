// PLACEHOLDER FOR ANY HELPERS WE CREATE
module.exports = {
  ifEquals: (a, b, options) => {
    if (a == b) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  },
};
