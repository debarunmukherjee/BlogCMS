import React from 'react';

function ArticleEditor({
	handleCreateArticle,
	headingText,
	title,
	setTitle,
	body,
	setBody,
	inProgress,
	btnText,
	progressBtnText
}) {
	return (
		<div>
			<form onSubmit={handleCreateArticle}>
				<h1 className="text-3xl mt-4 mb-4">{headingText}</h1>
				<div>
					<h2 className="text-xl mt-8 text-left">Title</h2>
					<hr className="w-2/4 mb-4"/>
					<input
						type="text"
						className="block border focus-visible:outline-none focus-visible:ring-indigo-500 focus-visible:border-indigo-500 focus:z-10 sm:text-sm w-full p-3 rounded mb-4"
						placeholder="Title"
						required
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div>
					<h2 className="text-xl mt-8 text-left">Body</h2>
					<hr className="w-2/4 mb-4"/>
					<textarea
						className="
						form-control
						block
						w-full
						mb-2
						px-3
						py-1.5
						text-base
						font-normal
						text-gray-700
						bg-white bg-clip-padding
						border border-solid border-gray-300
						rounded
						transition
						ease-in-out
						m-0
						focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
					"
						id="exampleFormControlTextarea1"
						rows="5"
						required
						value={body}
						onChange={(e) => setBody(e.target.value)}
						placeholder="Article Body"
					></textarea>
				</div>
				<button
					type="submit"
					disabled={inProgress}
					className="w-1/4 text-center py-3 rounded bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none my-1 mr-auto block mt-6"
				>
					{inProgress ? progressBtnText : btnText}
				</button>
			</form>
		</div>
	);
}

export default ArticleEditor;
