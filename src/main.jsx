import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { forwardRef } from 'react';

import "./index.css";
import "leaflet/dist/leaflet.css";
import App from "./App.jsx";
import { SplashScreen } from "@capacitor/splash-screen";
SplashScreen.hide();

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
