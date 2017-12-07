import React from "react";
import "./Searched.css";

export const Searched = ({children}) => (
  <div className="list-overflow-container">
  <h1>Search Results</h1>
      <ul className="list-group">
        {children}
      </ul>
    </div>
);
