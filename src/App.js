import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import PaymentSuccess from "./PaymentSuccess";
import "./App.css";
import Signup from "./Signup";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Signup />} />
				<Route path="/home" element={<Home />} />
				<Route path="/paymentsuccess" element={<PaymentSuccess />} />
			</Routes>
		</Router>
	);
}

export default App;
