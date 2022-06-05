import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import React, {useReducer} from "react";
import {initialState, rootReducer} from "./UserStates/Reducer";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

export const UserContext = React.createContext();

function App() {
	const [state, dispatch] = useReducer(rootReducer, initialState);
	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<div className="App">
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Routes>
				</div>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
