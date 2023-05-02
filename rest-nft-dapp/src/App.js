import "./App.css";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import react, { useState, useEffect } from "react";
// import * as fcl from "@onflow/fcl";
// import { getData } from "./cadence/scripts/getData.js";
// import { setup } from "./cadence/transactions/setup.js";
// import { mint } from "./cadence/transactions/mint.js";
import Create from "./pages/create.js";
import Get from "./pages/Get.js";
import About from "./pages/About.js";
import Layout from "./pages/Layout";
import Home from "./pages/Home";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Create" element={<Create />} />
          <Route path="About" element={<About />} />
          <Route path="Get" element={<Get />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
