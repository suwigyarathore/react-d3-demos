import React, { useState } from "react";
import { scaleLinear, scaleOrdinal, scaleTime } from "d3-scale";
import { useData } from "./useData";
import { bin, extent, max, sum } from "d3-array";
import "./tick.css";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { Marks } from "./Marks";
import "react-dropdown/style.css";
import { timeFormat } from "d3-time-format";
import { timeMonths } from "d3-time";

const width = 960;
const menuHeight = 75;
const height = 500 - menuHeight;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const xTickFormat = timeFormat("%m/%d/%Y");

export const MissingMigrantsChart = () => {
  const migrantsData = useData();
  const xValue = (d) => d["Reported Date"];
  const xAxisLabel = "Total Dead and Missing";

  const yValue = (d) => d["Total Dead and Missing"];
  const yAxisLabel = "Time";

  if (!migrantsData) return <h3>Loading...</h3>;

  const xScale = scaleTime()
    .domain(extent(migrantsData, xValue))
    .range([0, innerWidth])
    .nice();

  const [start, stop] = xScale.domain();

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(migrantsData)
    .map((array) => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1,
    }));

  const yScale = scaleLinear()
    .domain([0, max(binnedData, (d) => d.y)])
    .range([innerHeight, 0]);

  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xTickFormat}
            tickOffset={5}
          />
          <text
            className="axis-label"
            textAnchor="middle"
            transform={`translate(${-yAxisLabelOffset},${
              innerHeight / 2
            }) rotate(-90)`}
          >
            {xAxisLabel}
          </text>
          <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            {yAxisLabel}
          </text>
          <Marks
            binnedData={binnedData}
            yScale={yScale}
            xScale={xScale}
            tooltipFormat={xTickFormat}
            innerheight={innerHeight}
          />
        </g>
      </svg>
    </>
  );
};
