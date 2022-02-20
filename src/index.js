import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AirProvider from "./context";

ReactDOM.render(
	<React.StrictMode>
		<AirProvider>
			<App />
		</AirProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
