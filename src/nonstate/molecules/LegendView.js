import StringX from "../../base/StringX.js";
import GIG2 from "../../base/GIG2.js";
import { METADATA_MAP } from "../../constants/GIG2Constants.js";
import "./LegendView.css";

const LEGEND_SIZE = 7;
const LEGEND_RANK_PS = [...Array(LEGEND_SIZE).keys()].map(
  (i) => i / (LEGEND_SIZE - 1)
);

export default function LegendView(props) {
  const { dataList, displayMode, tableName } = props;
  let legendInfoList;
  if (displayMode === "max") {
    const metadata = METADATA_MAP[tableName];
    const valueKeyList = metadata.value_key_list_str.split(";");
    legendInfoList = valueKeyList.map((valueKey) => ({
      label: StringX.toTitleCase(valueKey),
      color: GIG2.getValueKeyColor(valueKey),
      opacity: 1,
    }));
  } else {
    const sortedDataList = dataList.sort((a, b) => a.valueP - b.valueP);
    const nValues = sortedDataList.length;
    legendInfoList = LEGEND_RANK_PS.map(function (rankP) {
      const iValue = parseInt((nValues - 1) * rankP);
      const data = sortedDataList[iValue];
      return {
        label: StringX.formatPercent(data.valueP, 1),
        color: data.color,
        opacity: data.opacity,
      };
    });
  }

  return (
    <div className="div-legend-view">
      {" "}
      <table>
        <tbody>
          {legendInfoList.map(function (
            { label, color, opacity },
            iLegendInfo
          ) {
            const divColorStyle = {
              backgroundColor: color,
              opacity,
            };
            return (
              <tr key={`tr-legend-info-${iLegendInfo}`}>
                <td>
                  <div className="div-color" style={divColorStyle} />
                </td>
                <th className="th-label">{label}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
