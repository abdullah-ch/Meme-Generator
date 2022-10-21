import React from "react";
import "./Components/App.css";
import { Header } from "./Components/Header";
import { MemeGenerator } from "./Components/MemeGenerator";

function App() {
  return (
    <div>
      <Header />
      <MemeGenerator />
    </div>
  );
}

export default App;
