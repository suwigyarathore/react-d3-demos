import React, { useState } from "react";
import { useData } from "./useData";
import { useWorldAtlas } from "./useWorldAtlas";
import { BubbleMap } from "./BubbleMap";
import { DateHistogram } from "./DateHistogram";

const width = 960;
const height = 500;
const dateHistogramSize = 0.2;
const xValue = (d) => d["Reported Date"];

export const MissingMigrantsCombined = () => {
  const data = useData();
  const worldAtlasData = useWorldAtlas();
  const [brushExtent, setBrushExtent] = useState();

  const dataAvailable = data && worldAtlasData;

  if (!dataAvailable) return <h3>Loading...</h3>;

  const filteredData = brushExtent
    ? data.filter((d) => {
        const date = xValue(d);
        return date > brushExtent[0] && date < brushExtent[1];
      })
    : data;

  return (
    <svg width={width} height={height}>
      <BubbleMap
        worldAtlasData={worldAtlasData}
        data={data}
        filteredData={filteredData}
      />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram
          data={data}
          width={width}
          xValue={xValue}
          height={dateHistogramSize * height}
          setBrushExtent={setBrushExtent}
        />
      </g>
    </svg>
  );
};
