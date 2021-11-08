import React from "react";
import "./mark.css";

export const Marks = ({
  binnedData,
  xScale,
  yScale,
  tooltipFormat,
  innerheight,
}) =>
  binnedData.map((d) => (
    <rect
      key={d}
      className="mark"
      x={xScale(d.x0)}
      y={yScale(d.y)}
      width={xScale(d.x1) - xScale(d.x0)}
      height={innerheight - yScale(d.y)}
    >
      <title>{tooltipFormat(d.y)}</title>
    </rect>
  ));
