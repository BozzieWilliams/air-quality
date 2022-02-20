/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
	FaCalendarAlt,
	FaExternalLinkAlt,
	FaLanguage,
	FaUserAlt,
	FaTimes,
	FaPlus,
} from "react-icons/fa";
import { useAirContext } from "../../context";

function Article() {
	const {
		renderSuggestion,
		languageData,
		setCity,
		dataRetrieve,
	} = useAirContext();
	const [articleContent, setArticleContent] = useState([]);
	const [articleFooter, setArticleFooter] = useState([]);
	const [viewArticle, setViewArticle] = useState(false);

	useEffect(() => {
		setArticleContent([]);
		setArticleFooter([]);
		setCity([]);
		if (languageData) {
			for (let item of dataRetrieve(languageData, "info_1_")) {
				setArticleFooter((data) => [...data, languageData[item]]);
			}
			for (let item of dataRetrieve(languageData, "p_")) {
				setArticleContent((data) => [...data, languageData[item]]);
			}
			for (let item of dataRetrieve(languageData, "_name")) {
				setCity((data) => [
					...data,
					{
						city_ref: item,
						city_name: languageData[item],
					},
				]);
			}
		}
	}, [languageData]);

	const MinimizedArticle = () => {
		return (
			<div
				className={renderSuggestion ? "hide" : "minimize_article"}
				onClick={() => setViewArticle(!viewArticle)}
			>
				<p>Read More Here</p>
				<FaPlus />
			</div>
		);
	};

	const FooterContent = () => {
		if (articleFooter) {
			const [author, date, version, link] = articleFooter;
			return (
				<div className='article_footer_container'>
					<p>
						<FaUserAlt className='article_footer_icon' />
						{author}
					</p>
					<p>
						<FaCalendarAlt className='article_footer_icon' /> {date}
					</p>
					<p>
						<FaLanguage className='article_footer_icon' />
						{version}
					</p>
					<a
						className='article_footer_link '
						href={link}
						rel='noreferrer'
						target='_blank'
					>
						<FaExternalLinkAlt className='article_footer_icon' />
					</a>
				</div>
			);
		}
	};
	return (
		<>
			{viewArticle ? (
				<article className={renderSuggestion ? "hide" : "article_container"}>
					<div className='article_button_container'>
						<FaTimes
							onClick={() => setViewArticle(!viewArticle)}
							className='article_button'
						/>
					</div>
					<div>
						{articleContent?.map((articledetail, index) => (
							<p key={index} className='article_entry'>
								{articledetail}
							</p>
						))}
					</div>
					<FooterContent />
				</article>
			) : (
				<MinimizedArticle />
			)}
		</>
	);
}

export default Article;
