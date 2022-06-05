import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../../App";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import PageNotFound from "../PageNotFound/PageNotFound";
import API from "../../Utils/API";
import Swal from "sweetalert2";
import {getErrorMessage} from "../../Utils/Common";
import {useNavigate} from "react-router-dom";
import ArticleList from "../../Components/ArticleList/ArticleList";

function MyArticles() {
	const userContext = useContext(UserContext);
	const userState = userContext.state;

	const navigate = useNavigate();

	const [fetchingArticles, setFetchingArticles] = useState(true);
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		const fetchMyArticles = async () => {
		  	try {
				const res = await API.get('api/article/get/mine');
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
		fetchMyArticles();
	}, []);

	if (userState.fetchingData || fetchingArticles) {
		return <LoadingComponent />
	}

	if (!userState.isLoggedIn) {
		return <PageNotFound />
	}

	return (
		<div>
			<h1 className="text-3xl mb-6">My Articles</h1>
			<ArticleList
				articles={articles}
				showStatus={true}
				noArticleTitle="You have not created any articles"
				noArticleMessage="The articles that you have created will be listed here."
			/>
		</div>
	);
}

export default MyArticles;
