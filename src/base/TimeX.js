export default class TimeX {
  static getUnixTime() {
    return Math.floor(Date.now() / 1000);
  }

  static getDate() {
    return new Date().toISOString().slice(0, 10);
  }

  static getDateID() {
    return TimeX.getDate().replaceAll("-", "");
  }
}
