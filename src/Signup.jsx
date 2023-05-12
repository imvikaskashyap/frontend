import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

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
			<div id="loginform">
				<h1 id="headerTitle">Log in</h1>
				<form onSubmit={handleSubmit}>
					<label className="label">Username</label>
					<input
						className="input_row"
						description="Username"
						placeholder="Enter your username"
						type="text"
						onChange={(event) => setName(event.target.value)}
						value={name}
					/>
					<label className="label">Email</label>
					<input
						className="input_row"
						description="Email"
						placeholder="Enter your email"
						type="text"
						onChange={(event) => setEmail(event.target.value)}
						value={email}
					/>
					<label className="label">Phone</label>
					<input
						className="input_row"
						description="Phone"
						placeholder="Enter your phone"
						type="number"
						onChange={(event) => setPhone(event.target.value)}
						value={phone}
					/>
					<button id="button" className="btn" type="submit">
						Login
					</button>
				</form>
			</div>
		</>
	);
};

export default Signup;
