import React, { useState } from "react";
import { scaleLinear } from "d3-scale";
import { format } from "d3-format";
import { useData } from "./data";
import { extent } from "d3-array";
import "./tick.css";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { Marks } from "./Marks";
import { Dropdown } from "./Dropdown";

const width = 960;
const menuHeight = 75;
const height = 500 - menuHeight;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const xTickFormat = (n) => format("0.2s")(n).replace("G", "B");

const initialXAttribute = "petal_length";

const attributes = [
  { value: "sepal_width", label: "Sepal Width" },
  { value: "sepal_length", label: "Sepal Length" },
  { value: "petal_length", label: "Petal Length" },
  { value: "petal_width", label: "Petal Width" },
  { value: "species", label: "species" },
];

const getLabel = (attribute) =>
  attributes.find((a) => a.value === attribute).label;

export const StyledScatterMenu = () => {
  const scatterMenuData = useData();
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = (d) => d[xAttribute];

  const initialYAttribute = "sepal_width";
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = (d) => d[yAttribute];

  if (!scatterMenuData) return <h3>Loading...</h3>;

  const xScale = scaleLinear()
    .domain(extent(scatterMenuData, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(scatterMenuData, yValue))
    .range([0, innerHeight]);

  return (
    <>
      <label htmlFor="x-select">X:</label>
      <Dropdown
        id="x-select"
        options={attributes}
        selectedValue={xAttribute}
        onSelectedValueChange={setXAttribute}
      ></Dropdown>
      <label htmlFor="y-select">Y:</label>
      <Dropdown
        id="y-select"
        options={attributes}
        selectedValue={yAttribute}
        onSelectedValueChange={setYAttribute}
      ></Dropdown>
      <br />
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
            {getLabel(yAttribute)}
          </text>
          <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            {getLabel(xAttribute)}
          </text>
          <Marks
            data={scatterMenuData}
            yScale={yScale}
            xScale={xScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={xTickFormat}
            circleRadius={7}
          />
        </g>
      </svg>
    </>
  );
};
