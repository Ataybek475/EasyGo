import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Измените эту строку!
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App /> {/* Рендерим App, а не TestApp */}
  </React.StrictMode>
);