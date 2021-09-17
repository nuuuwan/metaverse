import MathX from "../../base/MathX.js";
import StringX from "../../base/StringX.js";
import GIG2 from "../../base/GIG2.js";

const MIN_DISPLAY_VALUE = 0.01;

export default function TableView(props) {
  const { data } = props;
  const tableRow = data.censusData;
  const valueCellKeys = GIG2.filterValueCellKeys(tableRow);
  const values = valueCellKeys.map((valueCellKey) => tableRow[valueCellKey]);
  const sumValues = MathX.sum(values);

  let cellEntries = valueCellKeys
    .map((valueCellKey) => [valueCellKey, tableRow[valueCellKey]])
    .filter((d) => d[1] >= sumValues * MIN_DISPLAY_VALUE)
    .sort((a, b) => b[1] - a[1]);

  const othersValues = valueCellKeys
    .map((valueCellKey) => tableRow[valueCellKey])
    .filter((v) => v < sumValues * MIN_DISPLAY_VALUE);
  if (othersValues.length > 0) {
    console.debug(othersValues);
    const othersValueSum = MathX.sum(othersValues);
    cellEntries.push(["others", othersValueSum]);
  }

  return (
    <table>
      <tbody>
        {cellEntries.map(function (
          [valueCellKey, valueCellValue],
          iValueCellKey
        ) {
          const tdColorStyle = {
            background: GIG2.getValueKeyColor(valueCellKey),
          };
          return (
            <tr key={`${iValueCellKey}-${valueCellKey}`}>
              <td className="td-color" style={tdColorStyle}></td>
              <th>{StringX.toTitleCase(valueCellKey)}</th>
              <td className="td-number">{StringX.formatInt(valueCellValue)}</td>
              <td className="td-number">
                {StringX.formatPercent(valueCellValue, sumValues)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
