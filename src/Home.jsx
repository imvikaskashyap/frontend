import React, { useRef, useState } from "react";
import axios from "axios";
import LoaderFile from "./Loader";
import emailjs from "@emailjs/browser";

const Home = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [loading, setLoading] = useState(false);

	const form = useRef();

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		//
		// emailjs
		// 	.sendForm(
		// 		"service_c1n02uy",
		// 		"template_i9oe6ui",
		// 		form.current,
		// 		"yC7gTteHqtdHRHDu0"
		// 	)
		// 	.then(
		// 		(result) => {
		// 			console.log(result.text);
		// 		},
		// 		(error) => {
		// 			console.log(error.text);
		// 		}
		// 	);

		const data = [[name, email, phone]];

		console.log(data);
		await fetch(
			"https://v1.nocodeapi.com/vkashyap/google_sheets/xdanYuPBQkvrwCEl?tabId=sheet1",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		).then((result) => {
			result.json().then((res) => {
				console.log(res);
				setName("");
				setEmail("");
				setPhone("");
				checkoutHandler();
			});
		});
	};

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();

	// 	setLoading(true);

	// 	const data = { name, email, phone };
	// 	console.log(data);
	// 	const url = "https://server-payment.onrender.com/api/data";

	// 	try {
	// 		await axios.post(url, data);
	// 		console.log("Data saved successfully!");
	// 		setName("");
	// 		setEmail("");
	// 		setPhone("");

	// 		checkoutHandler(); // Call the payment function here
	// 		// Set loading state to false after successful signup
	// 	} catch (error) {
	// 		console.error(error);
	// 		setLoading(false); // Set loading state to false in case of an error
	// 	}
	// };

	const checkoutHandler = async () => {
		const amount = 79;

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
		setLoading(false);
	};

	return (
		<>
			{!loading && (
				<div>
					<div className="heading">
						<h1>Learn about Stock Brokerage with Stock Zilla </h1>
						<h3>
							Register for Decoding Options Webinar with Mr. Surender Pratap
							Singh
						</h3>
					</div>
					<div className="loginform">
						<h1 id="headerTitle">Register</h1>
						<form onSubmit={handleSubmit}>
							<label className="label">Full Name</label>
							<input
								className="input_row"
								description="Full Name"
								placeholder="Enter your full name"
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
				</div>
			)}

			{loading && <LoaderFile />}
		</>
	);
};

export default Home;
