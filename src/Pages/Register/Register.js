import React, {useState, useContext} from 'react';
import {Link, Navigate} from "react-router-dom";
import Swal from 'sweetalert2'
import LogoSymbol from '../../Assets/Logo/png/color-logo-no-background-just-symbol.png';
import API from "../../Utils/API";
import {UserContext} from "../../App";
import {UpdateUserData} from "../../UserStates/Actions";
import {formatDateYYYYMMDD, getErrorMessage} from "../../Utils/Common";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";

function Register() {
	const [fullname, setFullname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [dob, setDob] = useState(formatDateYYYYMMDD(new Date()));
	const [creatingUser, setCreatingUser] = useState(false);

	const userContext = useContext(UserContext);
	const userState = userContext.state;
	const userDispatch = userContext.dispatch;

	const handleRegistration = async (e) => {
	  	e.preventDefault();
		setCreatingUser(true);
		try {
			const res = await API.post('api/users/register', {
				fullname,
				password,
				confirmPassword,
				email,
				dob,
			});
			await userDispatch(UpdateUserData({
				isLoggedIn: true,
				data: res.data.data,
			}));
		} catch (e) {
			const errors = e.response ? e.response.data.errors : undefined;
			Swal.fire({
					title: "Error registering user",
					html: getErrorMessage(errors),
					icon: "error"
				}
			);
		} finally {
			setCreatingUser(false);
		}
	}

	if (userState.fetchingData) {
		return <LoadingComponent />
	}

	if (userState.isLoggedIn) {
		return <Navigate replace to="/dashboard"/>
	}

	return (
		<div className="bg-grey-lighter min-h-screen flex flex-col">
			<div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
				<div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
					<h1 className="mb-8 text-3xl text-center">
						<img
							className="mx-auto h-12 w-auto inline-block	mr-4"
							src={LogoSymbol}
							alt="BlogLib"
						/>
						Sign up
					</h1>
					<form onSubmit={handleRegistration}>
						<input
							type="text"
							className="block border focus-visible:outline-none focus-visible:ring-indigo-500 focus-visible:border-indigo-500 focus:z-10 sm:text-sm w-full p-3 rounded mb-4"
							name="fullname"
							placeholder="Full Name"
							autoComplete="name"
							value={fullname}
							onChange={(e) => setFullname(e.target.value)}
							required
						/>

						<input
							type="email"
							className="block border focus-visible:outline-none focus-visible:ring-indigo-500 focus-visible:border-indigo-500 focus:z-10 sm:text-sm w-full p-3 rounded mb-4"
							name="email"
							placeholder="Email"
							autoComplete={email}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>

						<input
							type="password"
							className="block border focus-visible:outline-none focus-visible:ring-indigo-500 focus-visible:border-indigo-500 focus:z-10 sm:text-sm w-full p-3 rounded mb-4"
							name="password"
							autoComplete="new-password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>

						<input
							type="password"
							className="block border focus-visible:outline-none focus-visible:ring-indigo-500 focus-visible:border-indigo-500 focus:z-10 sm:text-sm w-full p-3 rounded mb-4"
							name="confirm_password"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>

						<input
							type="date"
							className="block border focus-visible:outline-none focus-visible:ring-indigo-500 focus-visible:border-indigo-500 focus:z-10 sm:text-sm w-full p-3 rounded mb-1"
							name="dob"
							placeholder="Date of birth"
							value={dob}
							onChange={(e) => setDob(e.target.value)}
							required
						/>
						<p className="text-xs text-left mb-4">Date of birth - this will be used for 2 FA while logging in.</p>

						<button
							type="submit"
							disabled={creatingUser}
							className="w-full text-center py-3 rounded bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none my-1"
						>
							{creatingUser ? 'Creating...' : 'Create Account'}
						</button>
					</form>
				</div>

				<div className="text-grey-dark mt-6">
					Already have an account?
					{' '}
					<Link className="no-underline border-b border-blue text-blue" to="/login">
						Log in
					</Link>.
				</div>
			</div>
		</div>
	);
}

export default Register;
