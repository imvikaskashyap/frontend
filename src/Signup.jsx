import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	console.log(phone);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = { name, email, phone };
		const url = "https://server-pay.onrender.com/data";

		try {
			const response = await axios.post(url, data);
			console.log(response.data);
			alert("Signup Successfully");
			navigate("/home");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className="heading">
				<h1>Learn about Stock Brokerage with Stock Zilla </h1>
				<h3>Sign up for Webinars by Mr. Surendra Pratap Singh</h3>
			</div>
			<div className="loginform">
				<h1 id="headerTitle">Sign Up</h1>
				<form onSubmit={handleSubmit}>
					<label className="label">Username</label>
					<input
						className="input_row"
						description="Username"
						placeholder="Enter your username"
						type="text"
						onChange={(event) => setName(event.target.value)}
						value={name}
						required
					/>
					<label className="label">Email</label>
					<input
						className="input_row"
						description="Email"
						placeholder="Enter your email"
						type="email"
						onChange={(event) => setEmail(event.target.value)}
						value={email}
						required
					/>
					<label className="label">Phone</label>
					<input
						className="input_row"
						description="Phone"
						placeholder="Enter your phone"
						required
						maxLength={10}
						minLength={10}
						value={phone}
						onChange={(event) => {
							const inputPhone = event.target.value.slice(0, 10); // Truncate the input value to 10 digits
							setPhone(inputPhone);
						}}
					/>
					<button id="button" className="btn" type="submit">
						Register
					</button>
				</form>
			</div>
		</>
	);
};

export default Signup;
