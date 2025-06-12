import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

// Create a minimal Redux store. Replace reducers as the application grows.

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);


