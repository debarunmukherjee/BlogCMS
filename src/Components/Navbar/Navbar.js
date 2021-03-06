import LogoSymbol from '../../Assets/Logo/png/color-logo-no-background-just-symbol.png';
import LogoText from '../../Assets/Logo/png/color-logo-no-background-just-text.png';
import {Fragment, useContext, useEffect, useState} from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import API from "../../Utils/API";
import {UpdateUserData, UpdateFetchingDataState} from "../../UserStates/Actions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {getErrorMessage} from "../../Utils/Common";

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
	const userContext = useContext(UserContext);
	const userState = userContext.state;
	const userDispatch = userContext.dispatch;

	const [navigation, setNavigation] = useState([]);

	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserDetails = async () => {
			try {
				const res = await API.get("api/users/user-details");
				await userDispatch(UpdateUserData({
					isLoggedIn: true,
					data: res.data.data,
				}));
			} catch (e) {
				userDispatch(UpdateFetchingDataState(false));
			}
		}
		fetchUserDetails();
	}, []);

	useEffect(() => {
		if (!userState.isLoggedIn) {
			setNavigation([
				{ name: 'Login', href: 'login', current: location.pathname === '/login' },
				{ name: 'Register', href: 'register', current: location.pathname === '/register' },
			]);
		} else {
			const navItems = [
				{ name: 'Dashboard', href: '/dashboard', current: location.pathname === '/dashboard' },
				{name: 'My Articles', href: '/article/mine', current: location.pathname === '/article/mine'}
			];
			if (userState.userData.role !== 'user') {
				navItems.push({name: 'Create Article', href: '/article/add', current: location.pathname === '/article/add'})
			}
			if (userState.userData.role === 'super-admin') {
				navItems.push({name: 'Admin', href: '/admin', current: location.pathname === '/admin'})
			}
			setNavigation(navItems);
		}
	}, [userState.isLoggedIn, location.pathname]);

	const handleLogout = async () => {
	  	try {
			await API.post('api/users/logout');
			await userDispatch(UpdateUserData({
				isLoggedIn: false,
				userData: null,
			}));
			navigate('/');
		} catch (e) {
			const errors = e.response ? e.response.data.message : undefined;
			Swal.fire({
					title: getErrorMessage(errors),
					icon: "error"
				}
			);
		}
	}
	return (
		<Disclosure as="nav" className="bg-gray-800">
			{({ open }) => (
				<>
					<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
						<div className="relative flex items-center justify-between h-16">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<MenuIcon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
								<div className="flex-shrink-0 flex items-center">
									<img
										className="block lg:hidden h-12 w-auto"
										src={LogoSymbol}
										alt="BlogLib"
									/>
									<img
										className="hidden lg:block h-12 w-auto"
										src={LogoText}
										alt="BlogLib"
									/>
								</div>
								<div className="hidden sm:block sm:ml-6">
									<div className="flex space-x-4 mt-1.5">
										{navigation.map((item) => (
											<Link
												key={item.name}
												to={item.href}
												className={classNames(
													item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
													'px-3 py-2 rounded-md text-sm font-medium'
												)}
												aria-current={item.current ? 'page' : undefined}
											>
												{item.name}
											</Link>
										))}
									</div>
								</div>
							</div>
							{userState.isLoggedIn ? (
								<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
									{/* Profile dropdown */}
									<Menu as="div" className="ml-3 relative">
										<div>
											<Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
												<span className="sr-only">Open user menu</span>
												<img
													className="h-8 w-8 rounded-full"
													src={`https://ui-avatars.com/api/?name=${userState.userData.fullname}`}
													alt="Profile Image"
												/>
											</Menu.Button>
										</div>
										<Transition
											as={Fragment}
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
												<Menu.Item>
													{({ active }) => (
														<p
															onClick={handleLogout}
															className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
														>
															Sign out
														</p>
													)}
												</Menu.Item>
											</Menu.Items>
										</Transition>
									</Menu>
								</div>
							) : ''}
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as={Link}
									to={item.href}
									className={classNames(
										item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
										'block px-3 py-2 rounded-md text-base font-medium'
									)}
									aria-current={item.current ? 'page' : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}
