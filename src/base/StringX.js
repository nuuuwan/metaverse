const MAX_SIG_DIGITS = 2;

export default class StringX {
  static toTitleCase(str) {
    str = str.replaceAll("_", " ");
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  static formatInt(x) {
    const logBase1000 = Math.log(x) / Math.log(1000);

    let numPart, multPart, color;
    if (x > 1_000_000) {
      numPart = Number(x / 1_000_000).toLocaleString(undefined, {
        maximumSignificantDigits: MAX_SIG_DIGITS,
      });
      multPart = 'M'
      color = 'black';
    }
    else if (x > 1_000) {
      numPart = Number(x / 1_000).toLocaleString(undefined, {
        maximumSignificantDigits: MAX_SIG_DIGITS,
      });
      multPart = 'K'
      color = 'gray';
    } else {
      numPart = x;
      multPart = ''
      color = 'lightgray';
    }

    const style = {
      fontSize: parseInt(logBase1000 * 100) + '%',
      color,
    }


    return (
      <span style={style}>{numPart}{multPart}</span>
    )
  }


  static formatPercent(numerator, denominator) {
    const p = numerator / denominator;
    const pFontSize = Math.pow(p, 0.06);

    const color = p >= 0.01 ? 'black' : 'lightgray';

    const style = {
      fontSize: parseInt(pFontSize * 100) + '%',
      color: color,
    }

    const numPart = Number(p).toLocaleString(undefined, {
      style: "percent",
      maximumSignificantDigits: MAX_SIG_DIGITS,
    });

    return (
      <span style={style}>{numPart}</span>
    )
  }
}
