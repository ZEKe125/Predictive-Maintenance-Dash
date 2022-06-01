import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import TabControlledSingleUnit from "./pages/singleTabs/TabControlledSingleUnits";
import Register from "./pages/register/Register";
import { OffCanvasNavBar } from "./components";

export const ThemeContext = createContext(null);

function App() {
	const [theme, setTheme] = useState("light");
	const toggleTheme = () => {
		setTheme((curr) => (curr === "light" ? "dark" : "light"));
	};

	// IMPLEMENT LOCALSTORAGE Persistence
	// const [loggedIn, setLoggedIn] = useState(false);
	// const toggleLogin = () => {
	// 	setTheme((curr) => (curr === false ? true : false));
	// };

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<OffCanvasNavBar />
			<Routes>
				<Route exact path="/" element={<Login />} />
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/register" element={<Register />} />
				<Route exact path="/dashboard" element={<Dashboard />} />
				<Route exact path="/single" element={<TabControlledSingleUnit />} />
			</Routes>
		</ThemeContext.Provider>
	);
}

export default App;
