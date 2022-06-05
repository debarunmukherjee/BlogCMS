import React, {useState} from 'react';
import API from "../../Utils/API";
import Swal from "sweetalert2";
import {getErrorMessage} from "../../Utils/Common";

function AdminUserGrant({ onSuccessCallback }) {
	const [grantingAccess, setGrantingAccess] = useState(false);
	const [email, setEmail] = useState('');

	const handleGrantAdminAccess = async (e) => {
	  	e.preventDefault();
		setGrantingAccess(true);
		try {
			const res = await API.post('api/users/grant-admin-access', {email});
			Swal.fire({
				title: res.data.message,
				icon: "success"
			})
			if (onSuccessCallback) {
				onSuccessCallback();
			}
			setEmail('');
		} catch (e) {
			const errors = e.response ? (e.response.data.errors ? e.response.data.errors : e.response.data.message) : undefined;
			Swal.fire({
					title: getErrorMessage(errors),
					icon: "error"
				}
			);
		} finally {
			setGrantingAccess(false);
		}
	}

	return (
		<div className="mt-8">
			<h2 className="text-left text-xl">Grant Admin Access To Users</h2>
			<hr className="w-2/4 mb-4"/>
			<form onSubmit={handleGrantAdminAccess}>
				<input
					type="email"
					className="block border focus-visible:outline-none focus-visible:ring-indigo-500 focus-visible:border-indigo-500 focus:z-10 sm:text-sm w-3/4 p-3 rounded mb-4"
					placeholder="Email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<p className="text-xs text-left mb-4">Email address of the user you want to grant admin access to</p>
				<button
					type="submit"
					disabled={grantingAccess}
					className="p-4 text-center py-3 rounded bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none my-1 block mr-auto"
				>
					{grantingAccess ? 'Granting...' : 'Grant Access'}
				</button>
			</form>
		</div>
	);
}

export default AdminUserGrant;
