import WWW from "../../../base/WWW.js";
import { Circle, Popup } from "react-leaflet";
import AbstractLayer from "../AbstractLayer.js";

const DEFAULT_CIRLE_RADIUS = 500;

export default class LKVaxCentersLayer extends AbstractLayer {
  static getLabel() {
    return "🦠 COVID19 Vaccination Centers";
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
      return (
        <Circle
          key={`layer-data-${iData}`}
          center={position}
          radius={DEFAULT_CIRLE_RADIUS}
          pathOptions={{ color: color }}
        >
          <Popup>
            <div className="div-layer-title">{LKVaxCentersLayer.getLabel()}</div>
            <h3>{data.center}</h3>
            <h3>{data.center_si}</h3>
            <h3>{data.center_ta}</h3>

            <address>{data.formatted_address}</address>
            <address>{data.formatted_address_si}</address>
            <address>{data.formatted_address_ta}</address>

            <hr />
            <div>
              {data.police} Police Area,
              {data.district} District
            </div>
            <div>{data.tags}</div>
          </Popup>
        </Circle>
      );
    });
  }
}
