import Random from "./Random.js";

export default class Color {
  static hsla(h, s, l, a) {
    return `hsla(${h},${s}%,${l}%,${h})`;
  }
  static getRandomHSLA() {
    const h = Random.randomInt(0, 360);
    const s = 100;
    const l = 80;
    const a = 1;
    return Color.hsla(h, s, l, a);
  }
}
