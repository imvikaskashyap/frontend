import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import Card from "./Card";
import axios from "axios";

const Home = () => {
	const checkoutHandler = async (amount) => {
		const {
			data: { key },
		} = await axios.get("https://server-payment.onrender.com/api/getkey");

		const {
			data: { order },
		} = await axios.post("https://server-payment.onrender.com/api/checkout", {
			amount,
		});

		const options = {
			key,
			amount: order.amount,
			currency: "INR",
			name: "Mr. Surendra Pratap Singh",
			description: "Learn about Stock Brokerage with Stock Zilla",
			// image: "https://avatars.githubusercontent.com/u/25058652?v=4",
			order_id: order.id,
			callback_url:
				"https://server-payment.onrender.com/api/paymentverification",
			prefill: {
				name: "Gaurav Kumar",
				email: "gaurav.kumar@example.com",
				contact: "9999999999",
			},
			notes: {
				address: "Razorpay Corporate Office",
			},
			theme: {
				color: "#121212",
			},
		};
		const razor = new window.Razorpay(options);
		razor.open();
	};

	return (
		<div>
			<div
				h={"100vh"}
				alignItems="center"
				justifyContent="center"
				direction={["column", "row"]}>
				<Card
					amount={50}
					img={
						"https://cdn.shopify.com/s/files/1/1684/4603/products/MacBookPro13_Mid2012_NonRetina_Silver.png"
					}
					checkoutHandler={checkoutHandler}
				/>
			</div>
		</div>
	);
};

export default Home;
