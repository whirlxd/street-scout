"use client";

import { useState } from "react";
import {
	Search,
	Filter,
	MapPin,
	Clock,
	Activity,
	ChevronDown,
} from "lucide-react";

const reports = [
	{
		id: 1,
		title: "Damaged Pavement",
		description: "Crack in pavement with a missing step",
		location: "Sector 127 , Noida , Uttar Pradesh , India",
		severity: "medium",
		status: "resolved",
		timestamp: "2d ago",
		reporter: "Medhansh K",
		votes: 12,
		image:
			"https://eghzkztgluecimrghgih.supabase.co/storage/v1/object/public/cdn/115851800.png",
	},
	{
		id: 2,
		title: "Falling Tree",
		description: "A hazardous tree is blocking commuters",
		location: "Near ALC Sector 125",
		severity: "high",
		status: "in-progress",
		timestamp: "5h ago",
		reporter: "Medhansh K",
		votes: 8,
		image:
			"https://eghzkztgluecimrghgih.supabase.co/storage/v1/object/public/cdn/brokentree.webp",
	},
	{
		id: 3,
		title: "Broken Streetlight",
		description:
			"A dangling streetlight is posing danger to vehicles on highway",
		location: "Sector 126,Noida",
		severity: "high",
		status: "pending",
		timestamp: "30m ago",
		reporter: "Aaradhya C",
		votes: 15,
		image:
			"https://eghzkztgluecimrghgih.supabase.co/storage/v1/object/public/cdn/brokenstreetlight.png",
	},
];

export default function ReportsView() {
	const [filter, setFilter] = useState("all");
	const [search, setSearch] = useState("");
	const [showFilters, setShowFilters] = useState(false);

	return (
		<div className="space-y-4 md:space-y-6">
			{/* Filters */}
			<div className="flex flex-col gap-4 md:flex-row">
				<div className="relative flex-1">
					<input
						placeholder="Search reports..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full bg-[#1E293B] border border-[#06B6D4]/30 rounded-xl px-4 py-2 md:py-3 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] transition-all"
					/>
					<Search className="w-4 h-4 md:w-5 md:h-5 text-[#06B6D4] absolute left-3 top-1/2 -translate-y-1/2" />
				</div>
				<div className="relative">
					<button
						onClick={() => setShowFilters(!showFilters)}
						className="w-full md:w-auto bg-[#1E293B] border border-[#06B6D4]/30 rounded-xl px-4 py-2 md:py-3 text-white flex items-center justify-between md:justify-start gap-2 hover:bg-[#1E293B]/80 transition-all shadow-md shadow-[#06B6D4]/5 hover:shadow-lg hover:shadow-[#06B6D4]/10"
					>
						<Filter className="w-4 h-4 md:w-5 md:h-5 text-[#06B6D4]" />
						Filter
						<ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-[#06B6D4] ml-auto md:ml-2" />
					</button>
					{showFilters && (
						<div className="absolute right-0 mt-2 w-full md:w-48 bg-[#1E293B] border border-[#06B6D4]/30 rounded-xl shadow-lg py-2 z-10">
							{["All Reports", "Pending", "In Progress", "Resolved"].map(
								(item) => (
									<button
										key={item}
										onClick={() => {
											setFilter(item.toLowerCase());
											setShowFilters(false);
										}}
										className="w-full px-4 py-2 text-left text-white hover:bg-[#0F172A] transition-colors"
									>
										{item}
									</button>
								),
							)}
						</div>
					)}
				</div>
			</div>

			{/* Reports Grid */}
			<div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
				{reports.map((report) => (
					<div
						key={report.id}
						className="bg-[#1E293B] rounded-xl overflow-hidden shadow-lg shadow-[#06B6D4]/5 hover:shadow-xl hover:shadow-[#06B6D4]/10 transition-all"
					>
						<div className="relative aspect-video">
							<img
								src={report.image}
								alt={report.title}
								className="object-cover w-full h-full"
							/>
							<div className="absolute top-2 right-2 md:top-3 md:right-3">
								<span
									className={`px-2 py-1 text-xs font-semibold rounded-full ${
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
							</div>
						</div>
						<div className="p-4 md:p-6">
							<h3 className="mb-2 text-lg font-semibold md:text-xl">
								{report.title}
							</h3>
							<p className="mb-3 text-sm text-gray-400 md:mb-4">
								{report.description}
							</p>
							<div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
								<MapPin className="w-4 h-4 text-[#06B6D4]" />
								{report.location}
							</div>
							<div className="flex items-center gap-2 mb-3 text-sm text-gray-500 md:mb-4">
								<Clock className="w-4 h-4 text-[#06B6D4]" />
								{report.timestamp}
							</div>
							<div className="flex items-center justify-between">
								<span
									className={`px-2 py-1 text-xs font-semibold rounded-full ${
										report.status === "pending"
											? "bg-yellow-900/50 text-yellow-400"
											: report.status === "in-progress"
												? "bg-blue-900/50 text-blue-400"
												: "bg-green-900/50 text-green-400"
									}`}
								>
									{report.status.charAt(0).toUpperCase() +
										report.status.slice(1)}
								</span>
								<div className="flex items-center gap-1 text-sm text-gray-400">
									<Activity className="w-4 h-4 text-[#06B6D4]" />
									{report.votes} similar reports
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
