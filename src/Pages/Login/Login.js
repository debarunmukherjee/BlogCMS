import React, {useContext, useState} from 'react';
import LogoSymbol from '../../Assets/Logo/png/color-logo-no-background-just-symbol.png';
import {LockClosedIcon} from "@heroicons/react/solid";
import {UserContext} from "../../App";
import {Navigate} from "react-router-dom";
import API from "../../Utils/API";
import Swal from "sweetalert2";
import {getErrorMessage} from "../../Utils/Common";
import {UpdateUserData} from "../../UserStates/Actions";

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [dob, setDob] = useState('');
	const [isSecondFactorStep, setIsSecondFactorStep] = useState(false);
	const [sendingData, setSendingData] = useState(false);

	const userContext = useContext(UserContext);
	const userState = userContext.state;
	const userDispatch = userContext.dispatch;

	const handleUserLoginFirstStep = async (e) => {
	  	e.preventDefault();
		setSendingData(true);
		try {
			await API.post("api/users/login", {
				email,
				password
			})
			setIsSecondFactorStep(true);
		} catch (e) {
			const errors = e.response ? e.response.data.message : undefined;
			Swal.fire({
					title: getErrorMessage(errors),
					icon: "error"
				}
			);
		} finally {
			setSendingData(false);
		}
	}

	const handleUserLoginSecondStep = async (e) => {
	  	e.preventDefault();
		setSendingData(true);
		try {
			const res = await API.post("api/users/login-2fa", {
				email,
				password,
				dob
			})
			await userDispatch(UpdateUserData({
				isLoggedIn: true,
				data: res.data.data,
			}));
		} catch (e) {
			const errors = e.response ? e.response.data.message : undefined;
			Swal.fire({
					title: getErrorMessage(errors),
					icon: "error"
				}
			);
		} finally {
			setSendingData(false);
		}
	}
	if (userState.isLoggedIn) {
		return <Navigate replace to="/dashboard"/>
	}

	return (
		<>
			<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<img
							className="mx-auto h-12 w-auto"
							src={LogoSymbol}
							alt="BlogLib"
						/>
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
					</div>
					{isSecondFactorStep ? (
						<form className="mt-8 space-y-6" onSubmit={handleUserLoginSecondStep}>
							<div>
								<label htmlFor="dob" className="sr-only">
									Enter your date of birth as second factor authentication
								</label>
								<input
									id="dob"
									name="dob"
									type="date"
									autoComplete="bday"
									value={dob}
									onChange={(e) => setDob(e.target.value)}
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								/>
								<p className="text-xs text-left mb-4">Please enter your date of birth for 2FA</p>
							</div>
							<button
								type="submit"
								disabled={sendingData}
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								{sendingData ? 'Signing In...' : 'Sign In'}
							</button>
						</form>
					) : (
						<form className="mt-8 space-y-6" onSubmit={handleUserLoginFirstStep}>
							<div className="rounded-md shadow-sm -space-y-px">
								<div>
									<label htmlFor="email-address" className="sr-only">
										Email address
									</label>
									<input
										id="email-address"
										name="email"
										type="email"
										autoComplete="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
										className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder="Email address"
									/>
								</div>
								<div>
									<label htmlFor="password" className="sr-only">
										Password
									</label>
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="current-password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder="Password"
									/>
								</div>
							</div>
							<div>
								<button
									type="submit"
									disabled={sendingData}
									className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
								<span className="absolute left-0 inset-y-0 flex items-center pl-3">
									<LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
													aria-hidden="true"/>
								</span>
									{sendingData ? 'Proceeding...' : 'Proceed'}
								</button>
							</div>
						</form>
					)}
				</div>
			</div>
		</>
	)
}

export default Login;
