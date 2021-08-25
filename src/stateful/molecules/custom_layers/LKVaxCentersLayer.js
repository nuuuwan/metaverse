import WWW from "../../../base/WWW.js";
import TimeX from "../../../base/TimeX.js";
import { Circle, Popup } from "react-leaflet";
import AbstractLayer from "../AbstractLayer.js";

const DEFAULT_CIRLE_RADIUS = 1000;

export default class LKVaxCentersLayer extends AbstractLayer {
  static getLayerClassID() {
    return "covid19_vax_centers";
  }

  static getLabel() {
    const date = TimeX.getDate();
    return `COVID19 🦠 Vaccination Centers (${date})`;
  }

  static getSource() {
    return "https://www.presidentsoffice.gov.lk/";
  }

  async getDataList() {
    const dateID = TimeX.getDateID();
    const url = WWW.pathJoin([
      "https://raw.githubusercontent.com",
      "nuuuwan/covid19/data",
      `covid19.lk_vax_centers.${dateID}.tsv`,
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

      const eventHandlers = {
        mouseover: function (e) {
          e.target.openPopup();
        },
      };

      return (
        <Circle
          key={`layer-data-${iData}`}
          center={position}
          radius={DEFAULT_CIRLE_RADIUS}
          pathOptions={{ color: color }}
          eventHandlers={eventHandlers}
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
