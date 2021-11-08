import { max } from "d3-array";
import { scaleSqrt } from "d3-scale";
import React from "react";
import { Marks } from "./Marks";
import { useWorldAtlas } from "../useWorldAtlas";

export const BubbleMap = ({ data }) => {
  const worldAtlasData = useWorldAtlas();
  const sizeValue = (d) => d["Total Dead and Missing"];
  const maxRadius = 15;

  const dataAvailable = worldAtlasData && data;

  if (!dataAvailable) return <h3>Loading...</h3>;

  const sizeScale = scaleSqrt()
    .domain([0, max(data, sizeValue)])
    .range([0, maxRadius]);

  return (
    <Marks
      worldAtlas={worldAtlasData}
      data={data}
      sizeScale={sizeScale}
      sizeValue={sizeValue}
    />
  );
};
