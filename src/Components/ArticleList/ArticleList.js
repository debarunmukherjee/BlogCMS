import React from 'react';
import {Link} from "react-router-dom";
import styles from './ArticleList.module.scss';
import Alert from "../Alert/Alert";

function ArticleList({ articles, showStatus = false, noArticleTitle, noArticleMessage }) {
	return (articles.length > 0) ? (
		<ul>
			{articles.map((article) => (
				<li key={article.id} className="shadow-lg p-4 m-4 border-slate-600 border rounded">
					<Link to={`/article/view/${article.id}`}>
						<div className="flex">
							<div>
								<h2 className="text-xl text-left">{article.title}</h2>
							</div>
							<div className="grow text-right">
								By - <b>{article.authorName}</b>
							</div>
						</div>
						<hr className="w-1/2 mb-2"/>
						<p className={`mb-2 text-left ${styles['text-ellipsis']}`}>{article.body}</p>

						{showStatus ? (
							<p className="text-left text-xs mt-2">
								<span
									className={article.status === 'review' ? "inline-block rounded-full uppercase bg-orange-300 p-2" : "inline-block rounded-full uppercase bg-green-300 p-2"}
								>
									{article.status}
								</span>
							</p>
						) : ''}
					</Link>
				</li>
			))}
		</ul>
	) : (
		<Alert title={noArticleTitle} message={noArticleMessage} />
	);
}

export default ArticleList;
