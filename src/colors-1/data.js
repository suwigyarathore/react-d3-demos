import * as d3 from "d3";

export const getData = async () => {
  const csvUrl =
    "https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv";
  const data = await d3.csv(csvUrl);
  return data;
};
