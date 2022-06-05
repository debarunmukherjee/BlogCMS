import React from 'react';
import {Link} from "react-router-dom";
import LogoSymbol from '../../Assets/Logo/png/color-logo-no-background-just-symbol.png';

function Register() {
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
					<input
						type="text"
						className="block border focus-visible:outline-none focus-visible:ring-indigo-500 focus-visible:border-indigo-500 focus:z-10 sm:text-sm w-full p-3 rounded mb-4"
						name="fullname"
						placeholder="Full Name"
					/>

					<input
						type="text"
						className="block border focus-visible:outline-none focus-visible:ring-indigo-500 focus-visible:border-indigo-500 focus:z-10 sm:text-sm w-full p-3 rounded mb-4"
						name="email"
						placeholder="Email"
					/>

					<input
						type="password"
						className="block border focus-visible:outline-none focus-visible:ring-indigo-500 focus-visible:border-indigo-500 focus:z-10 sm:text-sm w-full p-3 rounded mb-4"
						name="password"
						placeholder="Password"
					/>

					<input
						type="password"
						className="block border focus-visible:outline-none focus-visible:ring-indigo-500 focus-visible:border-indigo-500 focus:z-10 sm:text-sm w-full p-3 rounded mb-4"
						name="confirm_password"
						placeholder="Confirm Password"
					/>

					<button
						type="submit"
						className="w-full text-center py-3 rounded bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none my-1"
					>
						Create Account
					</button>
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
