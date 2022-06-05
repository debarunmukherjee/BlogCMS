import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import React, {useReducer} from "react";
import {initialState, rootReducer} from "./UserStates/Reducer";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import ArticleCreate from "./Pages/Article/ArticleCreate";
import Admin from "./Pages/Admin/Admin";
import ArticleView from "./Pages/Article/ArticleView";
import ArticleEdit from "./Pages/Article/ArticleEdit";

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
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/article/add" element={<ArticleCreate />} />
						<Route path="/article/view/:id" element={<ArticleView />} />
						<Route path="/article/edit/:id" element={<ArticleEdit />} />
						<Route path="/admin" element={<Admin />} />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</div>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
