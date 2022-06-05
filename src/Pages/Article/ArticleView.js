import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {UserContext} from "../../App";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import PageNotFound from "../PageNotFound/PageNotFound";
import API from "../../Utils/API";
import Swal from "sweetalert2";
import {getErrorMessage} from "../../Utils/Common";

function ArticleView() {
	const userContext = useContext(UserContext);
	const userState = userContext.state;

	const { id } = useParams();
	const navigate = useNavigate();

	const [article, setArticle] = useState({});
	const [deleting, setDeleting] = useState(false);
	const [fetchingArticle, setFetchingArticle] = useState(true);
	const [updatingStatus, setUpdatingStatus] = useState(false);

	const updateArticleStatus = async (status) => {
		try {
			setUpdatingStatus(true);
			const res = await API.post('api/article/update-status', {
				id,
				status
			});
			setArticle(res.data.data);
		} catch (e) {
			const errors = e.response ? (e.response.data.errors ? e.response.data.errors : e.response.data.message) : undefined;
			Swal.fire({
					title: getErrorMessage(errors),
					icon: "error"
				}
			);
		} finally {
			setUpdatingStatus(false);
		}
	}
	useEffect( () => {
		const fetchArticleDetails = async () => {
			try {
				const res = await API.get(`api/article/get-details?id=${id}`);
				setArticle(res.data.data);
			} catch (e) {
				if (e.response && (Number(e.response.status) === 403 || Number(e.response.status) === 404)) {
					navigate('/page-404');
				} else {
					const errors = e.response ? (e.response.data.errors ? e.response.data.errors : e.response.data.message) : undefined;
					Swal.fire({
							title: getErrorMessage(errors),
							icon: "error"
						}
					);
				}
			} finally {
				setFetchingArticle(false);
			}
		}
		fetchArticleDetails();
	}, [id]);

	const handleArticleDelete = async () => {
	  	setDeleting(true);
		try {
			await API.delete('api/article/delete', {data: { id }});
			navigate('/article/mine');
		} catch (e) {
			const errors = e.response ? e.response.data.message : undefined;
			Swal.fire({
					title: getErrorMessage(errors),
					icon: "error"
				}
			);
		}
	}

	if (userState.fetchingData || fetchingArticle) {
		return <LoadingComponent />
	}

	if (!userState.isLoggedIn) {
		return <PageNotFound />
	}

	return (
		<div className="p-4">
			<h1 className="text-3xl mt-8">{article.title}</h1>
			<p className="mt-8 drop-shadow-md shadow-lg p-4 w-full text-justify shadow-slate-200">{article.body}</p>
			<div className="flex mt-6">
				{Number(article.authorId) === Number(userState.userData.id) ? (
					<>
						<Link to={`/article/edit/${id}`}>
							<button
								type="button"
								className="inline-block px-6 pt-2.5 pb-2 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
							>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
								</svg>
								<span className="inline-block ml-3 mt-0.5">Edit</span>
							</button>
						</Link>
						<button
							type="button"
							onClick={handleArticleDelete}
							disabled={deleting}
							className="ml-8 inline-block px-6 pt-2.5 pb-2 bg-red-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
							</svg>
							<span className="inline-block ml-3 mt-0.5">{deleting ? 'Deleting...' : 'Delete'}</span>
						</button>
					</>
				) : ''}
				{userState.userData.role === 'super-admin' ? (
					<>
						{article.status === 'review' ? (
							<button
								type="button"
								onClick={() => updateArticleStatus(1)}
								disabled={updatingStatus}
								className="ml-8 inline-block px-6 pt-2.5 pb-2 bg-green-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
							>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
								</svg>
								<span className="inline-block ml-3 mt-0.5">{updatingStatus ? 'Approving...' : 'Approve'}</span>
							</button>
						) : (
							<button
								type="button"
								onClick={() => updateArticleStatus(0)}
								disabled={updatingStatus}
								className="ml-8 inline-block px-6 pt-2.5 pb-2 bg-red-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
							>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
								</svg>
								<span className="inline-block ml-3 mt-0.5">{updatingStatus ? 'Revoking...' : 'Revoke'}</span>
							</button>
						)}
					</>
				) : ''}
				{(userState.userData.role === 'super-admin') || (Number(article.authorId) === Number(userState.userData.id) && userState.userData.role === 'admin') ? (
					<Link to={`/article/history/${id}`}>
						<button
							type="button"
							className="inline-block ml-8 px-6 pt-2.5 pb-2 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<span className="inline-block ml-3 mt-0.5">History</span>
						</button>
					</Link>
				) : ''}

			</div>
		</div>
	);
}

export default ArticleView;
