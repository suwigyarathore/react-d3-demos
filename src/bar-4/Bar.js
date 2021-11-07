import React from "react";
import { scaleBand, scaleLinear } from "d3-scale";
import { format } from "d3-format";
import { useData } from "./useData";
import { max } from "d3-array";
import "./tick.css";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { Marks } from "./Marks";

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 220 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const xLabelOffest = 60;
const xTickFormat = (n) => format("0.2s")(n).replace("G", "B");

const yValue = (d) => d.Country;
const xValue = (d) => d.Population;

export const StyledBar = () => {
  const barData = useData();

  if (!barData) return <h3>Loading...</h3>;

  const yScale = scaleBand()
    .domain(barData.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.5);

  const xScale = scaleLinear()
    .domain([0, max(barData, xValue)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xTickFormat}
        />
        <AxisLeft yScale={yScale} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xLabelOffest}
          textAnchor="middle"
          fontSize="20"
          fill="black"
        >
          Population
        </text>
        <Marks
          data={barData}
          yScale={yScale}
          xScale={xScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xTickFormat}
        />
      </g>
    </svg>
  );
};
