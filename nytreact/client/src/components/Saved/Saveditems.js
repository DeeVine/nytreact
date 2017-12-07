import React from "react";
import "./Saved.css";

export const Saveditems = ({children}) => (
  <li>
  	<p className='inline'>Title</p>
  	<span>Date</span>
  	<button>Remove</button>
  </li>
);