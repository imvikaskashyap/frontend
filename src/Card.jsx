import React, { useState } from "react";
import "./App.css";

const Card = ({ amount, checkoutHandler }) => {
	return (
		<div className="enroll">
			<div>
				<h1>Click below to Enroll !</h1>
			</div>
			<button
				id="button"
				className="btn_enroll"
				onClick={() => checkoutHandler(amount)}>
				Enroll Now
			</button>
		</div>
	);
};

export default Card;
