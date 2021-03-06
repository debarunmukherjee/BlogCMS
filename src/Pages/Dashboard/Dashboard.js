import React, {useContext, useState, useEffect} from 'react';
import {UserContext} from "../../App";
import {Navigate, useNavigate} from "react-router-dom";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import ArticleList from "../../Components/ArticleList/ArticleList";
import API from "../../Utils/API";
import Swal from "sweetalert2";
import {getErrorMessage} from "../../Utils/Common";

function Dashboard() {
	const userContext = useContext(UserContext);
	const userState = userContext.state;

	const navigate = useNavigate();

	const [fetchingArticles, setFetchingArticles] = useState(true);
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		const fetchPublicArticles = async () => {
			try {
				const res = await API.get('api/article/get/public');
				setArticles(res.data.data);
			} catch (e) {
				if (e.response && (Number(e.response.status) === 403)) {
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
				setFetchingArticles(false);
			}
		}
		fetchPublicArticles();
	}, []);

	if (userState.fetchingData || fetchingArticles) {
		return <LoadingComponent />
	}

	if (!userState.isLoggedIn) {
		return <Navigate replace to="/login"/>
	}

	return (
		<div>
			<h1 className="text-3xl mb-6">Public Articles</h1>
			<ArticleList
				articles={articles}
				noArticleTitle="No public article available"
				noArticleMessage="The articles that are approved by admin will be displayed here"
			/>
		</div>
	);
}

export default Dashboard;
