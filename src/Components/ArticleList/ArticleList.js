import React from 'react';
import {Link} from "react-router-dom";
import styles from './ArticleList.module.scss';

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
		<div className="bg-indigo-100 border-t-4 border-indigo-500 rounded-b text-indigo-900 px-4 py-3 shadow-md text-left m-4 mt-6 rounded"
			 role="alert">
			<div className="flex">
				<div className="py-1">
					<svg className="fill-current h-6 w-6 text-indigo-500 mr-4" xmlns="http://www.w3.org/2000/svg"
						 viewBox="0 0 20 20">
						<path
							d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
					</svg>
				</div>
				<div>
					<p className="font-bold">{noArticleTitle}</p>
					<p className="text-sm">{noArticleMessage}</p>
				</div>
			</div>
		</div>
	);
}

export default ArticleList;
