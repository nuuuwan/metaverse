import WWW from "../../../base/WWW.js";
import { Circle, Popup } from "react-leaflet";
import AbstractLayer from "../AbstractLayer.js";

const DEFAULT_CIRLE_RADIUS = 1000;

export default class LKVaxCentersLayer extends AbstractLayer {
  static getLabel() {
    return "COVID19 🦠 Vaccination Centers";
  }

  static isMatch(text) {
    return LKVaxCentersLayer.getLabel()
      .toLowerCase()
      .includes(text.toLowerCase());
  }

  async getDataList() {
    const url = WWW.pathJoin([
      "https://raw.githubusercontent.com",
      "nuuuwan/covid19/data",
      "covid19.lk_vax_centers.latest.tsv",
    ]);
    return await WWW.tsv(url);
  }

  renderDataList() {
    const { dataList } = this.state;

    return dataList.map(function (data, iData) {
      if (!data.lat) {
        return null;
      }
      const position = [parseFloat(data.lat), parseFloat(data.lng)];

      let color = "green";
      if (data.tags) {
        color = "red";
      }

      let renderedDoseInfo = [];
      if (data.dose1) {
        renderedDoseInfo.push("💉 1st Dose");
      }
      if (data.dose2) {
        renderedDoseInfo.push("💉 2nd Dose");
      }

      const onMouseOver = function (e) {
        e.target.openPopup();
      };

      return (
        <Circle
          key={`layer-data-${iData}`}
          center={position}
          radius={DEFAULT_CIRLE_RADIUS}
          pathOptions={{ color: color }}
          eventHandlers={{ mouseover: onMouseOver }}
        >
          <Popup>
            <h3>{data.center}</h3>
            <address>{data.formatted_address}</address>
            {renderedDoseInfo}
            <hr />
            <div>
              <strong>{data.police}</strong> {"Police Area, "}{" "}
              <strong>{data.district}</strong> District
            </div>
            <div>{data.tags}</div>
            <div style={{ fontSize: "70%" }}>{data.fuzzy_key}</div>
          </Popup>
        </Circle>
      );
    });
  }
}
