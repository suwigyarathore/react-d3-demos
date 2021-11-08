import { max } from "d3-array";
import { scaleSqrt } from "d3-scale";
import React, { useMemo } from "react";
import { Marks } from "./Marks";
const sizeValue = (d) => d["Total Dead and Missing"];
const maxRadius = 15;

export const BubbleMap = ({ worldAtlasData, data, filteredData }) => {
  const sizeScale = useMemo(
    () =>
      scaleSqrt()
        .domain([0, max(data, sizeValue)])
        .range([0, maxRadius]),
    [data, sizeValue, maxRadius]
  );

  return (
    <Marks
      worldAtlas={worldAtlasData}
      data={filteredData}
      sizeScale={sizeScale}
      sizeValue={sizeValue}
    />
  );
};
