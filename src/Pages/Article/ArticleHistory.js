import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../../App";
import {useNavigate, useParams} from "react-router-dom";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import PageNotFound from "../PageNotFound/PageNotFound";
import API from "../../Utils/API";
import Swal from "sweetalert2";
import {getErrorMessage} from "../../Utils/Common";
import Alert from "../../Components/Alert/Alert";
import {Card, Pagination} from "flowbite-react";

function ArticleHistory() {
	const userContext = useContext(UserContext);
	const userState = userContext.state;

	const { id } = useParams();
	const navigate = useNavigate();

	const [fetchingArticleHistory, setFetchingArticleHistory] = useState(false);
	const [articleHistory, setArticleHistory] = useState([]);
	const [versionShowing, setVersionShowing] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	const fetchArticleHistory = async () => {
		setFetchingArticleHistory(true);
		try {
			const res = await API.get(`api/article/get-history?id=${id}`);
			const data = res.data.data
			setArticleHistory(data);
			if (data.length > 0) {
				setVersionShowing(data[0]);
			}
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
			setFetchingArticleHistory(false);
		}
	}

	const onPageChange = (pageNo) => {
		setVersionShowing(articleHistory[pageNo - 1]);
		setCurrentPage(pageNo);
	}

	useEffect(() => {
		if (userState.isLoggedIn) {
			fetchArticleHistory();
		}
	}, [userState.isLoggedIn]);

	if (userState.fetchingData || fetchingArticleHistory) {
		return <LoadingComponent />
	}

	if (!userState.isLoggedIn) {
		return <PageNotFound />
	}

	return articleHistory.length > 0 ? (
		<div className="p-6">
			<h1 className="text-3xl mt-8">Article History</h1>
			<Card>
				<h2 className="text-2xl text-left font-bold tracking-tight text-gray-900 dark:text-white">
					{versionShowing.article_title}
				</h2>
				<p className="font-normal text-left text-gray-700 dark:text-gray-400">
					{versionShowing.article_body}
				</p>
				<p className="mt-4 text-xs text-left">Published At: <span className="font-bold">{versionShowing.published_at}</span></p>
			</Card>
			<Pagination
				currentPage={currentPage}
				totalPages={articleHistory.length}
				onPageChange={onPageChange}
			/>
			<Alert
				message="A new version is created whenever the super admin hits the Approve button for the article."
				title="Tip!"
			/>
		</div>
	) : (
		<Alert
			message="All versions of the article that were published even once can be seen here."
			title="No version is published yet."
		/>
	);
}

export default ArticleHistory;
