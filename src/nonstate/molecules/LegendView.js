import StringX from "../../base/StringX.js";
import GIG2 from "../../base/GIG2.js";
import {METADATA_MAP} from '../../constants/GIG2Constants.js';
import "./LegendView.css";
export default function LegendView(props) {
  const {displayMode, tableName} = props;
  let legendInfoList;
  if (displayMode === 'max') {
    const metadata = METADATA_MAP[tableName];
    const valueKeyList = metadata.value_key_list_str.split(';');
    legendInfoList = valueKeyList.map(
        (valueKey) => ({label: valueKey, color: GIG2.getValueKeyColor(valueKey)})
    );
  } else {
    legendInfoList = [{label: displayMode, color: 'green'}];
  }

  return (<div className="div-legend-view">  <table>
      <tbody>
        {legendInfoList.map(function (
          {label, color},
          iLegendInfo,
        ) {
          const divColorStyle = {
            backgroundColor: color,
          }
          return (
            <tr key={`tr-legend-info-${iLegendInfo}`}>
              <td>
                <div className="div-color" style={divColorStyle} />
              </td>
              <th>{StringX.toTitleCase(label)}</th>
            </tr>
          );
        })}
      </tbody>
    </table></div>);
}
