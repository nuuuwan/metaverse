export default class StringX {
  static toTitleCase(str) {
    str = str.replaceAll("_", " ");
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  static formatInt(x) {
    return Number(x).toLocaleString();
  }
  static formatPercent(numerator, denominator) {
    return Number(numerator / denominator).toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 1,
    });
  }
}
