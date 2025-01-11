import { useState } from "react";
import { MapPin } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const hotspots = [
	{
		id: 1,
		name: "Hauz Khas",
		reports: 45,
		severity: "high",
		lat: 28.5479,
		lng: -74.006,
	},
	{
		id: 2,
		name: "Kaushilya Marg",
		reports: 32,
		severity: "medium",
		lat: 28.6163,
		lng: 77.314,
	},
	{
		id: 3,
		name: "Yamuna expressway",
		reports: 10,
		severity: "low",
		lat: 28.5672,
		lng: 77.21,
	},
];

const severityColors = {
	high: "#EF4444",
	medium: "#F59E0B",
	low: "#10B981",
};

const customIcon = (severity) =>
	new L.Icon({
		iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${severityColors}" width="32" height="32">
      <circle cx="12" cy="12" r="10" fill-opacity="0.6" />
      <circle cx="12" cy="12" r="6" fill-opacity="1" />
    </svg>
  `)}`,
		iconSize: [32, 32],
		iconAnchor: [16, 32],
		popupAnchor: [0, -32],
	});

export default function HotspotsView() {
	const [activeHotspot, setActiveHotspot] = useState(null);

	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold md:text-2xl">Issue Hotspots</h2>
			<div className="bg-[#1E293B] rounded-xl overflow-hidden shadow-lg shadow-[#06B6D4]/5">
				<MapContainer
					center={[28.5479, 77.2031]}
					zoom={12}
					style={{ height: "400px", width: "100%" }}
					className="z-0"
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					{hotspots.map((hotspot) => (
						<Marker
							key={hotspot.id}
							position={[hotspot.lat, hotspot.lng]}
							icon={customIcon(hotspot.severity)}
							eventHandlers={{
								click: () => setActiveHotspot(hotspot.id),
							}}
						>
							<Popup>
								<div className="text-[#0F172A]">
									<h3 className="font-semibold">{hotspot.name}</h3>
									<p>Reports: {hotspot.reports}</p>
									<p className="capitalize">Severity: {hotspot.severity}</p>
								</div>
							</Popup>
						</Marker>
					))}
				</MapContainer>
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{hotspots.map((hotspot) => (
					<div
						key={hotspot.id}
						className={`bg-[#1E293B] rounded-xl p-4 md:p-6 shadow-lg transition-all ${
							activeHotspot === hotspot.id
								? "ring-2 ring-[#06B6D4] shadow-[#06B6D4]/20"
								: "shadow-[#06B6D4]/5 hover:shadow-[#06B6D4]/10"
						}`}
					>
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold md:text-xl">
								{hotspot.name}
							</h3>
							<MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#06B6D4]" />
						</div>
						<p className="mb-2 text-2xl font-bold md:text-3xl">
							{hotspot.reports}
						</p>
						<p className="mb-3 text-sm text-gray-400 md:mb-4">Total Reports</p>
						<div
							className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
								hotspot.severity === "high"
									? "bg-red-900/50 text-red-400"
									: hotspot.severity === "medium"
										? "bg-yellow-900/50 text-yellow-400"
										: "bg-green-900/50 text-green-400"
							}`}
						>
							{hotspot.severity.charAt(0).toUpperCase() +
								hotspot.severity.slice(1)}{" "}
							Severity
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
