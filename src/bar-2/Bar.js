import React from "react";
import { scaleBand, scaleLinear } from "d3-scale";
import { useData } from "./data";
import { max } from "d3-array";

export const Bar = () => {
  const barData = useData();
  const width = 960;
  const height = 500;
  const margin = { top: 20, right: 20, bottom: 20, left: 200 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const yScale =
    barData &&
    scaleBand()
      .domain(barData.map((d) => d.Country))
      .range([0, innerHeight]);
  const xScale =
    barData &&
    scaleLinear()
      .domain([0, max(barData, (d) => d.Population)])
      .range([0, innerWidth]);

  const dataAvailable = barData && yScale && xScale;

  if (!dataAvailable) return <h3>Loading...</h3>;

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {xScale.ticks().map((tickValue) => (
          <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
            <line y2={innerHeight} stroke="black" />
            <text
              style={{ textAnchor: "middle" }}
              dy=".71em"
              y={innerHeight + 3}
            >
              {tickValue}
            </text>
          </g>
        ))}
        {yScale.domain().map((tickValue) => (
          <text
            key={tickValue}
            style={{ textAnchor: "end" }}
            x={-3}
            dy=".32em"
            y={yScale(tickValue) + yScale.bandwidth() / 2}
          >
            {tickValue}
          </text>
        ))}
        {barData.map((d) => (
          <rect
            key={d.Country}
            x={0}
            y={yScale(d.Country)}
            width={xScale(d.Population)}
            height={yScale.bandwidth()}
          />
        ))}
      </g>
    </svg>
  );
};
