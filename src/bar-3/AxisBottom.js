import React from "react";
export const AxisBottom = ({ xScale, innerHeight }) =>
  xScale.ticks().map((tickValue) => (
    <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
      <line y2={innerHeight} stroke="black" />
      <text style={{ textAnchor: "middle" }} dy=".71em" y={innerHeight + 3}>
        {tickValue}
      </text>
    </g>
  ));
