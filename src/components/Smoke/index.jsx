import { FaTimes } from "react-icons/fa";
import { useAirContext } from "../../context";

function Smoke() {
	const { somgDetails, showSmoke, stShowSmoke, renderSuggestion } =
		useAirContext();
	const PreviewInteractive = () => {
		return (
			<>
				{renderSuggestion ? null : (
					<div className={showSmoke ? "smoke_component" : "hide"}>
						<div className='article_button_container'>
							<FaTimes
								onClick={() => stShowSmoke(!showSmoke)}
								className='article_button'
							/>
						</div>
						<h5 style={{ textAlign: "center" }}>{somgDetails[0]}</h5>
						<div className='smoke_measurements'>
							<p>Ciggarates</p>
							<p>{somgDetails[2]}</p>
						</div>
						<div className='smoke_measurements'>
							<p>Particulate Matter</p>
							<p>{somgDetails[1]}</p>
						</div>
					</div>
				)}
			</>
		);
	};
	return <>{somgDetails?.length > 0 && <PreviewInteractive />}</>;
}

export default Smoke;
