import React from "react";
import { useWorldAtlas } from "./useWorldAtlas";
import { useCities } from "./useCities";
import "./tick.css";
import { Marks } from "./Marks";
import { scaleSqrt } from "d3-scale";
import { max } from "d3-array";

const width = 960;
const height = 500;

export const StyledMap = () => {
  const worldAtlasData = useWorldAtlas();
  const citiesData = useCities();

  const dataAvailable = worldAtlasData && citiesData;

  if (!dataAvailable) return <h3>Loading...</h3>;

  const sizeValue = (d) => d.population;
  const maxRadius = 15;

  const sizeScale = scaleSqrt()
    .domain([0, max(citiesData, sizeValue)])
    .range([0, maxRadius]);

  return (
    <svg width={width} height={height}>
      <Marks
        worldAtlas={worldAtlasData}
        cities={citiesData}
        sizeScale={sizeScale}
        sizeValue={sizeValue}
      />
    </svg>
  );
};
