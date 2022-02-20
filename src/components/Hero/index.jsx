import { useAirContext } from "../../context";

function Hero() {
	const { setRenderSuggestion } = useAirContext();
	return (
		<div
			onClick={() => setRenderSuggestion(false)}
			className='hero_content'
		></div>
	);
}

export default Hero;
