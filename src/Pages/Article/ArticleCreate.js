import React, {useState, useContext} from 'react';
import {UserContext} from "../../App";
import PageNotFound from "../PageNotFound/PageNotFound";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import API from "../../Utils/API";
import Swal from "sweetalert2";
import {getErrorMessage} from "../../Utils/Common";
import {useNavigate} from "react-router-dom";
import ArticleEditor from "../../Components/ArticleEdit/ArticleEditor";

function ArticleCreate() {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [creating, setCreating] = useState(false);

	const navigate = useNavigate();
	const userContext = useContext(UserContext);
	const userState = userContext.state;

	const handleCreateArticle = async (e) => {
	  	e.preventDefault();
		setCreating(true);
		try {
			const res = await API.post('api/article/create', {
				body,
				title
			});
			navigate(`/article/view/${res.data.data.id}`);
		} catch (e) {
			const errors = e.response ? e.response.data.message : undefined;
			Swal.fire({
					title: getErrorMessage(errors),
					icon: "error"
				}
			);
		} finally {
			setCreating(false);
		}
	}

	if (userState.fetchingData) {
		return <LoadingComponent />
	}

	if (!userState.isLoggedIn || userState.userData.role === 'user') {
		return <PageNotFound />
	}

	return (
		<div className="p-4">
			<ArticleEditor
				headingText="Create an article"
				title={title}
				setTitle={setTitle}
				body={body}
				setBody={setBody}
				inProgress={creating}
				btnText="Create Article"
				progressBtnText="Creating..."
				handleCreateArticle={handleCreateArticle}
			/>
		</div>
	);
}

export default ArticleCreate;
