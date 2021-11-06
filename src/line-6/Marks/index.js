import React from "react";
import "./Marks.css";
import { curveNatural, line } from "d3-shape";

export const Marks = ({ data, xScale, yScale, xValue, yValue }) => (
  <g className="marks">
    <path
      fill="none"
      stroke="black"
      d={line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue(d)))
        .curve(curveNatural)(data)}
    />
  </g>
);
