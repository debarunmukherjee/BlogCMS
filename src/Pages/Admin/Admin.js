import React, {useContext, useEffect, useState} from 'react';
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import {UserContext} from "../../App";
import PageNotFound from "../PageNotFound/PageNotFound";
import AdminUserGrant from "../../Components/AdminUserGrant/AdminUserGrant";
import API from "../../Utils/API";
import Swal from "sweetalert2";
import {getErrorMessage} from "../../Utils/Common";
import {Link, useNavigate} from "react-router-dom";
import {Table} from "flowbite-react";
import Alert from "../../Components/Alert/Alert";

function Admin() {
	const userContext = useContext(UserContext);
	const userState = userContext.state;

	const navigate = useNavigate();

	const [fetchingAdminData, setFetchingAdminData] = useState(true);
	const [articlesToBeApproved, setArticlesToBeApproved] = useState([]);
	const [adminUsers, setAdminUsers] = useState([]);

	const fetchAdminData = async () => {
		setFetchingAdminData(true);
	  	try {
		  	const res = await API.get('api/users/get-superadmin-data');
			setArticlesToBeApproved(res.data.data.articlesToBeApproved);
			setAdminUsers(res.data.data.adminUsers);
		} catch (e) {
			if (e.response && (Number(e.response.status) === 403 || Number(e.response.status) === 404)) {
				navigate('/page-404');
			} else {
				const errors = e.response ? e.response.data.message : undefined;
				Swal.fire({
						title: getErrorMessage(errors),
						icon: "error"
					}
				);
			}
		} finally {
			setFetchingAdminData(false);
		}
	}
	useEffect(() => {
		if (userState.isLoggedIn && userState.userData.role === 'super-admin') {
			fetchAdminData();
		}
	}, [userState.isLoggedIn])

	if (userState.fetchingData) {
		return <LoadingComponent />
	}

	if (!userState.isLoggedIn || userState.userData.role !== 'super-admin') {
		return <PageNotFound/>
	}

	if (fetchingAdminData) {
		return <LoadingComponent />
	}

	return (
		<div className="p-4">
			<h1 className="text-3xl mb-6">Super Admin Operations</h1>
			<h2 className="text-left text-xl mt-6">Articles pending approval</h2>
			<hr className="w-2/4 mb-4"/>
			{articlesToBeApproved.length > 0 ? (
				<Table striped={true}>
					<Table.Head>
						<Table.HeadCell>
							Title
						</Table.HeadCell>
						<Table.HeadCell>
							View
						</Table.HeadCell>
					</Table.Head>
					<Table.Body className="divide-y">
						{articlesToBeApproved.map((article) => (
							<Table.Row key={article.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
								<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
									{article.title}
								</Table.Cell>
								<Table.Cell>
									<Link to={`/article/view/${article.id}`}>
										<span className="text-blue-500 hover:text-blue-700">
											<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
												<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
												<path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
											</svg>
										</span>
									</Link>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			) : (
				<Alert title="No article pending approval" message="Articles that are yet to be approved will be listed here." />
			)}
			<AdminUserGrant onSuccessCallback={fetchAdminData} />
			<h2 className="text-left text-xl mt-6">Users with admin access</h2>
			<hr className="w-2/4 mb-4"/>
			{adminUsers.length > 0 ? (
				<Table striped={true}>
					<Table.Head>
						<Table.HeadCell>
							Full Name
						</Table.HeadCell>
						<Table.HeadCell>
							Email
						</Table.HeadCell>
						<Table.HeadCell>
							Revoke Admin
						</Table.HeadCell>
					</Table.Head>
					<Table.Body className="divide-y">
						{adminUsers.map((user) => (
							<Table.Row key={user.email} className="bg-white dark:border-gray-700 dark:bg-gray-800">
								<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
									{user.fullname}
								</Table.Cell>
								<Table.Cell>
									{user.email}
								</Table.Cell>
								<Table.Cell>
								<span className="text-red-500 hover:text-red-700 cursor-pointer">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
									</svg>
								</span>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			) : (
				<Alert title="No admin user created" message="Users with admin permission will be listed here." />
			)}
		</div>
	);
}

export default Admin;
