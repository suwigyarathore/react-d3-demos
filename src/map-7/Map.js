import React from "react";
import { useData } from "./data";
import "./tick.css";
import { Marks } from "./Marks";

const width = 960;
const height = 500;

export const StyledMap = () => {
  const mapData = useData();

  const dataAvailable = mapData;
  if (!dataAvailable) return <h3>Loading...</h3>;

  return (
    <svg width={width} height={height}>
      <Marks data={mapData} />
    </svg>
  );
};
