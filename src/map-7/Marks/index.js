import { geoNaturalEarth1, geoPath, geoGraticule } from "d3-geo";
import React from "react";
import "./Marks.css";

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({ data: { land, interiors } }) => (
  <g className="marks">
    <path className="sphere" d={path({ type: "Sphere" })} />
    <path className="graticule" d={path(graticule())} />
    {land.features.map((feature, index) => (
      <path className="country" key={index} d={path(feature)} />
    ))}
    <path className="interiors" d={path(interiors)} />
  </g>
);
