import { FaLanguage } from "react-icons/fa";
import { useAirContext } from "../../context";
function Header() {
	const { pageTitle, handleLanguageControl, setRenderSuggestion } =
		useAirContext();

	return (
		<div onClick={() => setRenderSuggestion(false)} className='screen_header'>
			<h1>{pageTitle}</h1>
			<div className='language_choice'>
				<FaLanguage className='language_icon' />
				<div className='language_options'>
					<select
						onChange={(e) => handleLanguageControl(Number(e.target.value))}
						name='languages'
						id='languages'
					>
						<option value='1'>India</option>
						<option value='0'>Hindi</option>
					</select>
				</div>
			</div>
		</div>
	);
}

export default Header;
