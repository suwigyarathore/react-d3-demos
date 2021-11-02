import React from "react";
import { scaleLinear } from "d3-scale";
import { format } from "d3-format";
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
const xTickFormat = (n) => format("0.2s")(n).replace("G", "B");

const xValue = (d) => d.petal_length;
const xAxisLabel = "Petal Length";

const yValue = (d) => d.sepal_width;
const yAxisLabel = "Sepal Width";

export const StyledScatter = () => {
  const scatterData = useData();

  console.log(scatterData);

  const xScale =
    scatterData &&
    scaleLinear()
      .domain(extent(scatterData, xValue))
      .range([0, innerWidth])
      .nice();

  const yScale =
    scatterData &&
    scaleLinear().domain(extent(scatterData, yValue)).range([0, innerHeight]);

  const dataAvailable = scatterData && yScale && xScale;
  if (!dataAvailable) return <h3>Loading...</h3>;

  return (
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
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <Marks
          data={scatterData}
          yScale={yScale}
          xScale={xScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xTickFormat}
          circleRadius={7}
        />
      </g>
    </svg>
  );
};
