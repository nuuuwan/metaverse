import MathX from "../../base/MathX.js";
import StringX from "../../base/StringX.js";
import GIG2 from "../../base/GIG2.js";

export default function TableView(props) {
  const { data } = props;
  const tableRow = data.censusData;
  const valueCellKeys = GIG2.filterValueCellKeys(tableRow);
  const values = valueCellKeys.map((valueCellKey) => tableRow[valueCellKey]);
  const sumValues = MathX.sum(values);

  const sortedValueCellEntries = valueCellKeys
    .map((valueCellKey) => [valueCellKey, tableRow[valueCellKey]])
    .sort((a, b) => b[1] - a[1]);

  return (
    <table>
      <tbody>
        {sortedValueCellEntries.map(function (
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
