import Ents, { ENT } from "../../base/Ents.js";

import "./RegionTypePicker.css";

export default function RegionTypePicker(props) {
  const { selectedRegionType, onSelectRegionType, regionTypes } = props;

  const renderedItems = regionTypes.map(function (regionType) {
    const regionName = Ents.getRegionName(regionType);
    const onClick = function (e) {
      onSelectRegionType(regionType);
    };

    const className =
      "span-region-type-picker-item" +
      (regionType === selectedRegionType
        ? " span-region-type-picker-item-selected"
        : "");
    return (
      <span
        key={`region-type-picker-item-${regionType}`}
        className={className}
        onClick={onClick}
      >
        {`${regionName}`}
      </span>
    );
  });
  return (
    <div className="div-region-type-picker">
      <span className="div-region-type-picker-desc"> By</span>
      {renderedItems}
    </div>
  );
}
