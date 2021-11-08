import { geoNaturalEarth1, geoPath, geoGraticule } from "d3-geo";
import React from "react";
import "./Marks.css";

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({
  worldAtlas: { land, interiors },
  data,
  sizeScale,
  sizeValue,
}) => (
  <g className="marks">
    <path className="sphere" d={path({ type: "Sphere" })} />
    <path className="graticules" d={path(graticule())} />
    {land.features.map((feature, index) => (
      <path className="land" key={index} d={path(feature)} />
    ))}
    <path className="interiors" d={path(interiors)} />
    {data.map((d, index) => {
      const [x, y] = projection(d.coords);
      return <circle key={index} cx={x} cy={y} r={sizeScale(sizeValue(d))} />;
    })}
  </g>
);
