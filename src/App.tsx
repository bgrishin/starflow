import React from "react";
import "./App.css";
import Starflow from "./components/starflow/Starflow";

function App() {
  return (
    <div>
      <h1>
        STARFLOW
        <a href={"https://bgrishin.me"} target={"_blank"}>
          Made with ❤️
        </a>
      </h1>
      <Starflow />
    </div>
  );
}

export default App;
