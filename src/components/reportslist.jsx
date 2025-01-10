import React from "react";
import { MapPin, Clock } from "lucide-react";

const mockReports = [
	{
		id: 1,
		title: "Broken Sidewalk",
		location: "123 Main St",
		timestamp: "2h ago",
		severity: "high",
		status: "pending",
	},
	{
		id: 2,
		title: "Graffiti",
		location: "456 Elm St",
		timestamp: "4h ago",
		severity: "low",
		status: "in-progress",
	},
	{
		id: 3,
		title: "Fallen Tree",
		location: "789 Oak St",
		timestamp: "1d ago",
		severity: "medium",
		status: "resolved",
	},
	{
		id: 4,
		title: "Pothole",
		location: "321 Pine St",
		timestamp: "2d ago",
		severity: "high",
		status: "pending",
	},
];

const ReportsList = () => {
	return (
		<div className="space-y-4">
			{mockReports.map((report) => (
				<div
					key={report.id}
					className="bg-[#1E293B] p-4 rounded-lg flex justify-between items-center"
				>
					<div>
						<h3 className="text-lg font-semibold">{report.title}</h3>
						<div className="flex items-center mt-1 text-sm text-gray-400">
							<MapPin className="w-4 h-4 mr-1" />
							{report.location}
						</div>
						<div className="flex items-center mt-1 text-sm text-gray-400">
							<Clock className="w-4 h-4 mr-1" />
							{report.timestamp}
						</div>
					</div>
					<div className="flex flex-col items-end">
						<span
							className={`px-2 py-1 rounded-full text-xs ${
								report.severity === "high"
									? "bg-red-900/80 text-red-400"
									: report.severity === "medium"
										? "bg-yellow-900/80 text-yellow-400"
										: "bg-green-900/80 text-green-400"
							}`}
						>
							{report.severity.charAt(0).toUpperCase() +
								report.severity.slice(1)}
						</span>
						<span
							className={`mt-2 px-2 py-1 rounded-full text-xs ${
								report.status === "pending"
									? "bg-gray-900/80 text-gray-400"
									: report.status === "in-progress"
										? "bg-blue-900/80 text-blue-400"
										: "bg-green-900/80 text-green-400"
							}`}
						>
							{report.status.charAt(0).toUpperCase() + report.status.slice(1)}
						</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default ReportsList;
