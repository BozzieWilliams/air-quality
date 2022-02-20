/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAirContext } from "../../context";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function Search() {
	const {
		languageData,
		renderSuggestion,
		setRenderSuggestion,
		setCurrenCity,
		city,
		search,
		setSearch,
		dataRetrieve,
	} = useAirContext();
	const [placeholder, setPlaceholder] = useState();

	useEffect(() => {
		if (languageData) {
			const tabTitle = dataRetrieve(languageData, "tabs_1_title");
			setPlaceholder(languageData[tabTitle]);
		}
	}, [languageData]);

	return (
		<div className='search_container'>
			<p className='hero_title'>
				{languageData && languageData?.hero_1_title?.split(":")[1]}
			</p>
			<div className='search_input_container'>
				<input
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
						setRenderSuggestion(true);
					}}
					placeholder={placeholder}
					type='text'
				/>
				<div onClick={() => setRenderSuggestion(!renderSuggestion)}>
					{renderSuggestion ? (
						<FaChevronUp className='search_icon' />
					) : (
						<FaChevronDown className='search_icon' />
					)}
				</div>
			</div>
			{renderSuggestion && (
				<div className='suggestions_container'>
					{city?.length > 0 &&
						city
							?.filter(
								(city) =>
									city?.city_name
										?.toLowerCase()
										.indexOf(search?.toLowerCase()) >= 0
							)
							.map((item) => (
								<p
									onClick={() => {
										setCurrenCity({
											id: item?.city_ref,
											city: item?.city_name,
										});
										setRenderSuggestion(!renderSuggestion);
									}}
									key={item.city_ref}
								>
									{item.city_name}
								</p>
							))}
				</div>
			)}
		</div>
	);
}

export default Search;
