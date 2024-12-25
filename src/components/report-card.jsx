/* eslint-disable react/prop-types */
import { MapPin } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
export function ReportCard({
	title,
	image,
	location,
	severity,
	timestamp,
	status = "pending",
}) {
	// Map numeric severity to corresponding text
	const severityMap = {
		1: "low",
		2: "medium",
		3: "high",
	};

	const severityText = severityMap[severity] || "unknown";
	const formattedTimestamp = formatDistanceToNow(new Date(timestamp), {
		addSuffix: true,
	});
	return (
		<div className="bg-[#1F2937] bg-opacity-40 rounded-xl overflow-hidden hover:bg-opacity-50 transition-all">
			<div className="relative aspect-video">
				<img src={image} alt={title} className="object-cover w-full h-full" />
				<div className="absolute top-3 right-3">
					<span
						className={`
              px-3 py-1 rounded-full text-sm font-medium
              ${severityText === "high" ? "bg-red-900/80 text-red-400" : ""}
              ${severityText === "medium" ? "bg-yellow-900/80 text-yellow-400" : ""}
              ${severityText === "low" ? "bg-green-900/80 text-green-400" : ""}
            `}
					>
						{severityText.charAt(0).toUpperCase() + severityText.slice(1)}
					</span>
				</div>
			</div>
			<div className="flex items-center justify-between p-4">
				<h3 className="font-medium text-white">{title}</h3>
				<div
					className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${status === "Pending" ? "bg-gray-800/80 text-gray-400" : ""}
            ${status === "in-progress" ? "bg-blue-900/80 text-blue-400" : ""}
            ${status === "resolved" ? "bg-green-900/80 text-green-400" : ""}
          `}
				>
					{status.charAt(0).toUpperCase() + status.slice(1)}
				</div>
			</div>
			<div className="p-4 space-y-2">
				<div className="flex items-center gap-1 text-gray-400">
					<MapPin className="w-4 h-4" />
					<span className="text-sm">{location}</span>
				</div>
				<div className="text-xs text-gray-500">{formattedTimestamp}</div>
			</div>
		</div>
	);
}
