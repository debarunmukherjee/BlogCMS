import React, {useContext} from 'react';
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import {UserContext} from "../../App";

function Admin() {
	const userContext = useContext(UserContext);
	const userState = userContext.state;

	if (userState.fetchingData) {
		return <LoadingComponent />
	}

	return (
		<div>Admin!</div>
	);
}

export default Admin;
