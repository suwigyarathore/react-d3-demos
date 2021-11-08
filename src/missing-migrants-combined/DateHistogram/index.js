import React, { useRef, useEffect, useMemo } from "react";
import { bin, extent, max, sum } from "d3-array";
import { brushX } from "d3-brush";
import { scaleLinear, scaleTime } from "d3-scale";
import { select } from "d3-selection";
import { timeMonths } from "d3-time";
import { timeFormat } from "d3-time-format";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import "./tick.css";

const margin = { top: 0, right: 30, bottom: 30, left: 45 };
const xAxisLabelOffset = 30;
const yAxisLabelOffset = 30;
const xTickFormat = timeFormat("%m/%d/%Y");
const yValue = (d) => d["Total Dead and Missing"];
export const DateHistogram = ({
  data,
  height,
  width,
  xValue,
  setBrushExtent,
}) => {
  const brushRef = useRef();
  const xAxisLabel = "Total Dead and Missing";

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yAxisLabel = "Time";

  const xScale = useMemo(
    () =>
      scaleTime().domain(extent(data, xValue)).range([0, innerWidth]).nice(),
    [data, xValue, innerWidth]
  );

  const binnedData = useMemo(() => {
    const [start, stop] = xScale.domain();
    return bin()
      .value(xValue)
      .domain(xScale.domain())
      .thresholds(timeMonths(start, stop))(data)
      .map((array) => ({
        y: sum(array, yValue),
        x0: array.x0,
        x1: array.x1,
      }));
  }, [xValue, xScale, data, xValue]);

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([0, max(binnedData, (d) => d.y)])
        .range([innerHeight, 0]),
    [binnedData, innerHeight]
  );

  useEffect(() => {
    const brush = brushX().extent([
      [0, 0],
      [innerWidth, innerHeight],
    ]);
    brush(select(brushRef.current));
    brush.on("brush end", (event) =>
      setBrushExtent(
        event.selection ? event.selection.map(xScale.invert) : null
      )
    );
  }, [innerHeight, innerWidth]);

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
        <g ref={brushRef}></g>
      </g>
    </>
  );
};
