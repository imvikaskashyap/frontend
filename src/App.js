import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import PaymentSuccess from "./PaymentSuccess";
import "./App.css";
import Signup from "./Signup";
import LoaderFile from "./Loader";
import Nav from "./Nav";

function App() {
	return (
		<Router>
			<Nav />
			<Routes>
				<Route path="/loader" element={<LoaderFile />} />
				<Route path="/" element={<Home />} />
				<Route path="/paymentsuccess" element={<PaymentSuccess />} />
			</Routes>
		</Router>
	);
}

export default App;
