import WWW from "../../base/WWW.js";

const REMOTE_URL =
  "https://raw.githubusercontent.com" +
  "/nuuuwan/covid19/data" +
  "/covid19.lk_vax_centers.latest.tsv";

export default class LKVaxCenters {
  static async get() {
    return await WWW.tsv(REMOTE_URL);
  }
}
