import React from "react";
import "./Components/App.css";
import { Header } from "./Components/Header";
import { MemeGenerator } from "./Components/MemeGenerator";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <Header />
      <MemeGenerator />
    </div>
  );
}

export default App;
