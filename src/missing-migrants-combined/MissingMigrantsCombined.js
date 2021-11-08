import React from "react";
import { useData } from "./useData";
import { BubbleMap } from "./BubbleMap";
import { DateHistogram } from "./DateHistogram";

const width = 960;
const height = 500;
const dateHistogramSize = 0.2;

export const MissingMigrantsCombined = () => {
  const data = useData();

  if (!data) return <h3>Loading...</h3>;

  return (
    <svg width={width} height={height}>
      <BubbleMap data={data} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram
          data={data}
          width={width}
          height={dateHistogramSize * height}
        />
      </g>
    </svg>
  );
};
