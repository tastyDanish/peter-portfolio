import React from "react";
import logo from "./logo.svg";
import Player from "./player";
import Monitor from "./terminal-demo/monitor";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="dashboard">
        <Monitor />
      </div>
    </div>
  );
}

export default App;
