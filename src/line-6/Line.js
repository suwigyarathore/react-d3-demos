import React from "react";
import { scaleTime, scaleLinear } from "d3-scale";
import { timeFormat } from "d3-time-format";
import { useData } from "./data";
import { extent } from "d3-array";
import "./tick.css";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { Marks } from "./Marks";

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const xTickFormat = timeFormat("%a");

const xValue = (d) => d.timestamp;
const xAxisLabel = "Time";

const yValue = (d) => d.temperature;
const yAxisLabel = "Temperature";

export const StyledLine = () => {
  const lineData = useData();

  const xScale =
    lineData &&
    scaleTime().domain(extent(lineData, xValue)).range([0, innerWidth]).nice();

  const yScale =
    lineData &&
    scaleLinear()
      .domain(extent(lineData, yValue))
      .range([innerHeight, 0])
      .nice();

  const dataAvailable = lineData && yScale && xScale;
  if (!dataAvailable) return <h3>Loading...</h3>;

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xTickFormat}
          tickOffset={7}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={7} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <Marks
          data={lineData}
          yScale={yScale}
          xScale={xScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xTickFormat}
          circleRadius={3}
        />
      </g>
    </svg>
  );
};
