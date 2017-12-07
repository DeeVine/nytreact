import React from "react";
import "./Saved.css";

export const Saved = ({children}) => (
  <div className="list-overflow-container">
  <h1>Saved Articles</h1>
      <ul className="list-group">
        {children}
      </ul>
    </div>
);