import { createContext, useContext, useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";

export const AirContext = createContext();
export const useAirContext = () => useContext(AirContext);

export default function AirProvider({ children }) {
	const [pageTitle, setPageTitle] = useState("Delhi smog");
	const [languageData, setLanguageData] = useState();
	const [languageControl, setLaguageControl] = useState(1);
	const [renderSuggestion, setRenderSuggestion] = useState(false);
	const [currentCity, setCurrenCity] = useState();
	const [city, setCity] = useState([]);
	const [search, setSearch] = useState("");
	const [somgDetails, setSmogeDetails] = useState([]);
	const [showSmoke, stShowSmoke] = useState(false);
	const dataRetrieve = (dataSource, value) =>
		Object.keys(dataSource).filter((key) => key.indexOf(value) >= 0);
	useEffect(() => {
		if (languageData) {
			setPageTitle(languageData?.hero_1_title.split(":")[0]);
		}
	}, [languageData]);

	useEffect(() => {
		document.title = pageTitle;
	}, [pageTitle]);

	useEffect(() => {
		setSmogeDetails([]);
		if (languageData) {
			if (currentCity) {
				const id = `${currentCity?.id?.split("_").slice(0, 4).join("_")}_`;
				for (let item of dataRetrieve(languageData, id)) {
					setSmogeDetails((data) => [...data, languageData[item]]);
				}
				stShowSmoke(true);
			}
		}
	}, [languageData, currentCity]);

	useEffect(() => {
		async function fetchLocalData() {
			const { hindi, india } = requests;
			if (languageControl === 1) {
				const request = await axios.get(india);
				setLanguageData(request.data);
				return request;
			} else {
				const request = await axios.get(hindi);
				setLanguageData(request.data);
				return request;
			}
		}
		fetchLocalData();
	}, [languageControl]);

	const handleLanguageControl = (value) => {
		setCurrenCity();
		setLaguageControl(value);
	};

	const values = {
		pageTitle,
		languageData,
		handleLanguageControl,
		renderSuggestion,
		setRenderSuggestion,
		currentCity,
		setCurrenCity,
		city,
		setCity,
		search,
		setSearch,
		somgDetails,
		dataRetrieve,
		showSmoke,
		stShowSmoke,
	};
	return <AirContext.Provider value={values}>{children}</AirContext.Provider>;
}
