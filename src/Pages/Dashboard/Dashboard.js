import React, {useContext} from 'react';
import {UserContext} from "../../App";
import {Navigate} from "react-router-dom";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";

function Dashboard() {
	const userContext = useContext(UserContext);
	const userState = userContext.state;

	if (userState.fetchingData) {
		return <LoadingComponent />
	}

	if (!userState.isLoggedIn) {
		return <Navigate replace to="/login"/>
	}

	return (
		<div>Dashboard</div>
	);
}

export default Dashboard;