/* eslint-disable react/prop-types */
// map-page.jsx
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { ArrowLeft } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./custom-marker.css"; // Optional: For additional custom styles
import { BottomNav } from "./bottom-navigation";

// Fix default icon path issues
L.Icon.Default.prototype._getIconUrl = undefined;

L.Icon.Default.mergeOptions({
	iconRetinaUrl: new URL(
		"leaflet/dist/images/marker-icon-2x.png",
		import.meta.url,
	).href,
	iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
	shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url)
		.href,
});

// Custom dark theme for OpenStreetMap
const DARK_THEME =
	"https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

// Hardcoded pins data
const PINS = [
	{
		id: 1,
		latitude: 28.54511796387612,
		longitude: 77.19317041696264,
		color: "#EF4444",
		desc: "Broken Street Light",
	},
	{
		id: 2,
		latitude: 28.544738102023942,
		longitude: 77.19254388659553,
		color: "#F59E0B",
		desc: "Damaged Pavement",
	},
	{
		id: 3,
		latitude: 28.545132829282217,
		longitude: 77.1918608264211,
		color: "#10B981",
		desc: "Fallen Tree Blocking Road",
	},
];

// Custom marker component to match our design
function CustomMarker({ color, position, popupText }) {
	const customIcon = new L.DivIcon({
		className: "custom-marker",
		html: `
      <div style="
        width: 32px; 
        height: 32px; 
        border-radius: 9999px; 
        background-color: ${color};
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
    `,
		iconSize: [32, 32],
		iconAnchor: [16, 32],
	});

	return (
		<Marker position={position} icon={customIcon}>
			<Popup>{popupText}</Popup>
		</Marker>
	);
}

export default function MapPage() {
	const [mapReady, setMapReady] = useState(false);
	const [viewState, setViewState] = useState({
		center: [28.54507575831948, 77.19268230066656],
		zoom: 20,
	});

	useEffect(() => {
		setMapReady(true);
	}, []);

	if (!mapReady) {
		return (
			<div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
				<div className="loader" />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#0F172A] flex flex-col">
			{/* Header */}
			<div className="bg-[#1E293B] p-4 flex items-center">
				<a href="/" className="mr-4 text-white">
					<ArrowLeft className="w-6 h-6" />
				</a>
				<h1 className="text-xl font-semibold text-white">Map View</h1>
			</div>

			{/* Map Container */}
			<div className="relative flex-1">
				<MapContainer
					center={viewState.center}
					zoom={viewState.zoom}
					style={{ width: "100%", height: "536px" }}
					scrollWheelZoom={true}
					zoomControl={false}
				>
					<TileLayer
						attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
						url={DARK_THEME}
					/>
					{PINS.map((pin) => (
						<CustomMarker
							key={pin.id}
							position={[pin.latitude, pin.longitude]}
							color={pin.color}
							popupText={`A report about ${pin.desc}`}
						/>
					))}
				</MapContainer>
			</div>

			{/* Bottom Navigation */}
			<BottomNav currentPath="/map" className="mt-10" />
		</div>
	);
}
