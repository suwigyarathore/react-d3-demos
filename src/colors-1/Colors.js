import React, { useEffect, useState } from "react";
import { getData } from "./data";

export const Colors = () => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setPieData(data);
    }
    fetchData();
  }, []);
  getData();
  return <div>{JSON.stringify(pieData)}</div>;
};
