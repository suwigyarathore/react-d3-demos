import React from 'react'
import { scaleBand, scaleLinear } from 'd3-scale';
import { useData } from './data'
import { max } from 'd3-array';
import { AxisLeft } from './AxisLeft';
import { AxisBottom } from './AxisBottom';
import { Marks } from './Marks';

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 20, left: 200 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const yValue = d => d.Country;
const xValue = d => d.Population


export const BetterBar = () =>  {
    const barData = useData();
    const yScale = barData && scaleBand().domain(barData.map(d => d.Country)).range([0, innerHeight]);
    const xScale = barData && scaleLinear().domain([0, max(barData,  d=>d.Population)]).range([0, innerWidth]);

    const dataAvailable = barData && yScale && xScale;
    return (
       (dataAvailable) ? <svg width={width} height={height}>
           <g  transform={`translate(${margin.left}, ${margin.top})`}>
              <AxisBottom xScale={xScale} innerHeight={innerHeight} />
              <AxisLeft yScale={yScale}  />
              <Marks 
                data={barData} 
                yScale={yScale} 
                xScale={xScale} 
                xValue={xValue}
                yValue={yValue}
              />    
            </g>
        </svg> : <h3>Loading...</h3>
    )
};
