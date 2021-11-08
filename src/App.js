import "./App.css";

import { MissingMigrantsChart } from "./missing-migrants-bar";
import { MissingMigrantsMap } from "./missing-migrants-map";

function App() {
  return (
    <div className="App">
      {/* <ColoredScatterMenu /> */}
      {/* <StyledScatterMenu /> */}
      <MissingMigrantsChart />
      <MissingMigrantsMap />
    </div>
  );
}

export default App;
