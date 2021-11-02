import React from 'react';
export const Marks = ({ data, yScale, xScale, xValue, yValue }) => data.map(d => <rect
    key={yValue(d)} 
    x={0} 
    y={yScale(yValue(d))} 
    width={xScale(xValue(d))} 
    height={yScale.bandwidth()}/>)