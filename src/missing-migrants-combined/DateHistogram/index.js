import { bin, extent, max, sum } from "d3-array";
import { scaleLinear, scaleTime } from "d3-scale";
import { timeMonths } from "d3-time";
import { timeFormat } from "d3-time-format";
import React from "react";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import "./tick.css";

const margin = { top: 0, right: 30, bottom: 30, left: 45 };
const xAxisLabelOffset = 30;
const yAxisLabelOffset = 30;
const xTickFormat = timeFormat("%m/%d/%Y");
export const DateHistogram = ({ data, height, width }) => {
  const xValue = (d) => d["Reported Date"];
  const xAxisLabel = "Total Dead and Missing";

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yValue = (d) => d["Total Dead and Missing"];
  const yAxisLabel = "Time";

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const [start, stop] = xScale.domain();

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
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
      <rect width={width} height={height} fill="white" />
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
    </>
  );
};
