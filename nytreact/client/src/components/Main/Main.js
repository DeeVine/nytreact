import React from "react";
import "./Main.css";

const Main = props => (
	<div className='container'>	
		<div className="form-group">
			<label htmlFor="usr">Topic:</label>
			<input type="text" className="form-control" id="usr"/>
		</div>
		<div className="form-group">
			<label htmlFor="pwd">Start Year:</label>
			<input type="password" className="form-control" id="pwd"/>
		</div>
		<div className="form-group">
			<label htmlFor="pwd">End Year:</label>
			<input type="password" className="form-control" id="pwd"/>
		</div>
		<button className='submit'>Submit</button>
	</div>
);

export default Main;