import { useEffect, useState } from "react";
import Home from "./components/Home";
import LoginPage from "./components/Login";
import NewReport from "./components/createReport";
import { BrowserRouter, Routes, Route } from "react-router";
import NearMap from "./components/map-page";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	// biome-ignore lint/correctness/useExhaustiveDependencies: uh
	useEffect(() => {
		const isLoggedIn = sessionStorage.getItem("isLoggedIn");
		if (isLoggedIn) {
			setIsLoggedIn(true);
		}
	}, [setIsLoggedIn]);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={isLoggedIn ? <Home /> : <LoginPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/reports/new" element={<NewReport />} />
					<Route path="/map" element={<NearMap />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
