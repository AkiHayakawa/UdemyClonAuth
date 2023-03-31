import React from "react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/Modules/Navbar";
import MainRoutes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <MainRoutes />
    </BrowserRouter>
  );
}

export default App;
