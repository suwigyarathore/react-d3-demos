import React from "react";
import { useWorldAtlas } from "./useWorldAtlas";
import { useData } from "./useData";
import "./tick.css";
import { Marks } from "./Marks";
import { scaleSqrt } from "d3-scale";
import { max } from "d3-array";

const width = 960;
const height = 500;

export const MissingMigrantsMap = () => {
  const worldAtlasData = useWorldAtlas();
  const data = useData();

  const dataAvailable = worldAtlasData && data;

  if (!dataAvailable) return <h3>Loading...</h3>;

  const sizeValue = (d) => d["Total Dead and Missing"];
  const maxRadius = 15;

  const sizeScale = scaleSqrt()
    .domain([0, max(data, sizeValue)])
    .range([0, maxRadius]);

  return (
    <svg width={width} height={height}>
      <Marks
        worldAtlas={worldAtlasData}
        data={data}
        sizeScale={sizeScale}
        sizeValue={sizeValue}
      />
    </svg>
  );
};
