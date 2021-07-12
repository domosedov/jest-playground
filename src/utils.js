const sum = (x, y) => x + y;

const memo = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    } else {
      const value = fn(...args);
      cache.set(key, value);
      return value;
    }
  };
};

const sleep = async (t) =>
  new Promise((resolve, _reject) => setTimeout(resolve, t));

module.exports = { sum, memo, sleep };
