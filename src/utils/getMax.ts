export const getMax = (obj: { [key: string]: number }) =>
  Object.keys(obj).reduce(function (m, k) {
    return obj[k] > m ? obj[k] : m;
  }, -Infinity);
