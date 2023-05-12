import React, { useState } from "react";
import axios from "axios";

const Home = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = { name, email, phone };
		console.log(data);
		const url = "https://cpdbackend.onrender.com/data";

		try {
			await axios.post(url, data);
			console.log("Data saved successfully!");
			setName("");
			setEmail("");
			setPhone("");

			checkoutHandler(); // Call the payment function here
		} catch (error) {
			console.error(error);
		}
	};

	const checkoutHandler = async () => {
		const amount = 50;

		// Get the Razorpay key
		const {
			data: { key },
		} = await axios.get("https://server-payment.onrender.com/api/getkey");

		// Create a new order
		const {
			data: { order },
		} = await axios.post("https://server-payment.onrender.com/api/checkout", {
			amount,
		});

		// Set the payment options
		const options = {
			key,
			amount: order.amount,
			currency: "INR",
			name: "Mr. Surendra Pratap Singh",
			description: "Learn about Stock Brokerage with Stock Zilla",
			order_id: order.id,
			callback_url:
				"https://server-payment.onrender.com/api/paymentverification",
			prefill: {
				name,
				email,
				contact: phone,
			},
			notes: {
				address: "Razorpay Corporate Office",
			},
			theme: {
				color: "#121212",
			},
		};

		// Open the Razorpay payment window
		const razorpay = new window.Razorpay(options);
		razorpay.open();
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
						Enroll Now
					</button>
				</form>
			</div>
		</>
	);
};

export default Home;
