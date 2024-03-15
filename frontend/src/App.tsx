import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Service from "./pages/Service";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/chatbot" element={<Service />} />
				<Route path="*" element={<NoMatch />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
