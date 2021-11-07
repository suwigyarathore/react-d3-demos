import React, { useState } from "react";
import { scaleLinear, scaleOrdinal } from "d3-scale";
import { format } from "d3-format";
import { useData } from "./useData";
import { extent } from "d3-array";
import "./tick.css";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { Marks } from "./Marks";
import { Dropdown } from "./Dropdown";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";
import { ColorLegend } from "./ColorLegend";

const outerWidth = 1200;
const width = 960;
const menuHeight = 75;
const height = 500 - menuHeight;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const circleRadius = 7;
const xTickFormat = (n) => format("0.2s")(n).replace("G", "B");
const colorLegendLabel = "Species";
const fadeOpacity = 0.2;

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

export const ColoredScatterMenu = () => {
  const coloredScatterData = useData();
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = (d) => d[xAttribute];

  const initialYAttribute = "sepal_width";
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = (d) => d[yAttribute];

  const [hoveredValue, setHoveredValue] = useState(null);

  if (!coloredScatterData) return <h3>Loading...</h3>;

  const xScale = scaleLinear()
    .domain(extent(coloredScatterData, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(coloredScatterData, yValue))
    .range([0, innerHeight]);

  const colorValue = (d) => d.species;
  const colorScale = scaleOrdinal()
    .domain(coloredScatterData.map(colorValue))
    .range(["#E6842A", "#137B80", "#8E6C8A"]);

  const filteredData = coloredScatterData.filter(
    (d) => hoveredValue === colorValue(d)
  );

  return (
    <>
      <div className="menu-container">
        <span className="dropdown-label">X:</span>
        <ReactDropdown
          options={attributes}
          value={xAttribute}
          onChange={({ value }) => setYAttribute(value)}
        ></ReactDropdown>
        <span className="dropdown-label">Y:</span>
        <ReactDropdown
          options={attributes}
          value={yAttribute}
          onChange={({ value }) => setYAttribute(value)}
        ></ReactDropdown>
      </div>
      <svg width={outerWidth} height={height}>
        <svg width={width}>
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
            <g opacity={hoveredValue ? fadeOpacity : 1}>
              <Marks
                data={coloredScatterData}
                xScale={xScale}
                xValue={xValue}
                yScale={yScale}
                yValue={yValue}
                colorScale={colorScale}
                colorValue={colorValue}
                tooltipFormat={xTickFormat}
                circleRadius={circleRadius}
              />
            </g>
            <Marks
              data={filteredData}
              yScale={yScale}
              xScale={xScale}
              xValue={xValue}
              yValue={yValue}
              colorScale={colorScale}
              colorValue={colorValue}
              tooltipFormat={xTickFormat}
              circleRadius={7}
            />
          </g>
        </svg>
        <g transform={`translate(${width + 60}, 60)`}>
          <text x={35} y={-25} className="axis-label" textAnchor="middle">
            {colorLegendLabel}
          </text>
          <ColorLegend
            tickSpacing={22}
            tickTextOffset={12}
            tickSize={circleRadius}
            colorScale={colorScale}
            onHover={setHoveredValue}
            hoveredValue={hoveredValue}
            fadeOpacity={fadeOpacity}
          />
        </g>
      </svg>
    </>
  );
};
