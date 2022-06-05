import React, {useEffect, useContext, useState} from 'react';
import {UserContext} from "../../App";
import {useNavigate, useParams} from "react-router-dom";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import PageNotFound from "../PageNotFound/PageNotFound";
import API from "../../Utils/API";
import Swal from "sweetalert2";
import {getErrorMessage} from "../../Utils/Common";
import ArticleEditor from "../../Components/ArticleEdit/ArticleEditor";

function ArticleEdit() {
	const userContext = useContext(UserContext);
	const userState = userContext.state;

	const { id } = useParams();
	const navigate = useNavigate();

	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [updating, setUpdating] = useState(false);
	const [fetchingArticle, setFetchingArticle] = useState(true);

	useEffect(() => {
		const fetchArticleDetails = async () => {
			try {
				const res = await API.get(`api/article/get-details?id=${id}`);
				if (Number(res.data.data.authorId) !== Number(userState.userData.id)) {
					navigate('/page-404');
				}
				const article = res.data.data;
				setTitle(article.title);
				setBody(article.body);
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
				setFetchingArticle(false);
			}
		}
		if (userState.isLoggedIn) {
			fetchArticleDetails();
		}
	}, [userState.isLoggedIn, id]);

	const handleUpdateArticle = async (e) => {
	  	e.preventDefault();
		setUpdating(true);
		try {
			await API.put('api/article/update/details', {
				body,
				title,
				id
			});
			navigate(`/article/view/${id}`);
		} catch (e) {
			const errors = e.response ? e.response.data.message : undefined;
			Swal.fire({
					title: getErrorMessage(errors),
					icon: "error"
				}
			);
		} finally {
			setUpdating(false);
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
			<ArticleEditor
				headingText="Update article"
				title={title}
				setTitle={setTitle}
				body={body}
				setBody={setBody}
				inProgress={updating}
				btnText="Update Article"
				progressBtnText="Updating..."
				handleCreateArticle={handleUpdateArticle}
			/>
		</div>
	);
}

export default ArticleEdit;
