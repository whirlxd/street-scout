import { MapPin } from "lucide-react";

export function MapMarker({ severity, onClick }) {
	const getSeverityColor = () => {
		switch (severity) {
			case "high":
				return "text-red-400 bg-red-900/80";
			case "medium":
				return "text-yellow-400 bg-yellow-900/80";
			case "low":
				return "text-green-400 bg-green-900/80";
		}
	};

	return (
		<button
			onClick={onClick}
			className={`w-8 h-8 rounded-full flex items-center justify-center ${getSeverityColor()} hover:scale-110 transition-transform`}
		>
			<MapPin className="w-5 h-5" />
		</button>
	);
}
