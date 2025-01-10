import { useState } from "react";
import {
	BarChartIcon,
	MapPin,
	AlertTriangle,
	CheckCircle,
	Clock,
	TrendingUp,
	Users,
	Activity,
} from "lucide-react";
import {
	BarChart,
	Bar,
	LineChart,
	Line,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Tooltip,
	CartesianGrid,
} from "recharts";
import ReportsView from "../components/reportslist";
import HotspotsView from "../components/hotspotmap";

// Mock data for charts
const activityData = [
	{ name: "Mon", total: 12 },
	{ name: "Tue", total: 15 },
	{ name: "Wed", total: 23 },
	{ name: "Thu", total: 18 },
	{ name: "Fri", total: 25 },
	{ name: "Sat", total: 13 },
	{ name: "Sun", total: 10 },
];

const severityData = [
	{ name: "High", value: 35 },
	{ name: "Medium", value: 45 },
	{ name: "Low", value: 20 },
];

const reports = [
	{
		id: 1,
		title: "Broken Sidewalk",
		location: "123 Main St",
		severity: "high",
		status: "pending",
		timestamp: "2h ago",
		reporter: "John Doe",
		votes: 12,
	},
	{
		id: 2,
		title: "Street Light Out",
		location: "456 Park Ave",
		severity: "medium",
		status: "in-progress",
		timestamp: "4h ago",
		reporter: "Jane Smith",
		votes: 8,
	},
	{
		id: 3,
		title: "Graffiti",
		location: "789 Oak St",
		severity: "low",
		status: "resolved",
		timestamp: "1d ago",
		reporter: "Mike Johnson",
		votes: 5,
	},
];

const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-[#1E293B] p-3 rounded-2xl border border-[#06B6D4] shadow-lg shadow-[#06B6D4]/20">
				<p className="text-[#06B6D4] font-semibold">{`${label}`}</p>
				<p className="text-white">{`${payload[0].value}`}</p>
			</div>
		);
	}
	return null;
};

export default function DashboardPage() {
	const [activeTab, setActiveTab] = useState("overview");

	return (
		<div className="min-h-screen bg-[#0F172A] text-white">
			<div className="flex flex-col gap-8 p-8">
				<div className="flex flex-col gap-2">
					<h1 className="text-3xl font-bold bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-transparent bg-clip-text">
						Street Scout Dashboard
					</h1>
					<p className="text-gray-400">Monitor and manage community reports</p>
				</div>

				{/* Tabs */}
				<div className="flex gap-4 bg-[#1E293B] p-2 rounded-2xl">
					{[
						{ id: "overview", icon: BarChartIcon, label: "Overview" },
						{ id: "reports", icon: AlertTriangle, label: "Reports" },
						{ id: "hotspots", icon: MapPin, label: "Hotspots" },
					].map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center gap-2 py-2 px-4 rounded-xl transition-all ${
								activeTab === tab.id
									? "bg-[#06B6D4] text-white shadow-lg shadow-[#06B6D4]/20"
									: "text-gray-400 hover:text-white hover:bg-[#0F172A]/50"
							}`}
						>
							<tab.icon className="w-5 h-5" />
							{tab.label}
						</button>
					))}
				</div>

				{activeTab === "overview" && (
					<div className="space-y-8">
						{/* Stats Overview */}
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
							{[
								{
									title: "Total Reports",
									value: "2,345",
									trend: "+12%",
									icon: AlertTriangle,
									color: "text-yellow-500",
									trendColor: "text-green-500",
								},
								{
									title: "Resolved Issues",
									value: "1,987",
									trend: "85%",
									icon: CheckCircle,
									color: "text-green-500",
									trendColor: "text-green-500",
								},
								{
									title: "Active Users",
									value: "12.5k",
									trend: "+18%",
									icon: Users,
									color: "text-[#06B6D4]",
									trendColor: "text-green-500",
								},
								{
									title: "Response Time",
									value: "4.2h",
									trend: "+0.8h",
									icon: Clock,
									color: "text-orange-500",
									trendColor: "text-red-500",
								},
							].map((stat, i) => (
								<div
									key={i}
									className="bg-[#1E293B] rounded-2xl p-6 shadow-lg shadow-[#06B6D4]/5 hover:shadow-[#06B6D4]/10 transition-shadow"
								>
									<div className="flex items-center justify-between mb-4">
										<p className="text-sm text-gray-400">{stat.title}</p>
										<div
											className={`p-2 rounded-full ${stat.color} bg-opacity-20`}
										>
											<stat.icon className={`w-5 h-5 ${stat.color}`} />
										</div>
									</div>
									<div className="text-3xl font-bold">{stat.value}</div>
									<p className={`text-sm mt-2 ${stat.trendColor}`}>
										{stat.trend}
									</p>
								</div>
							))}
						</div>

						{/* Charts */}
						<div className="grid gap-6 md:grid-cols-2">
							<div className="bg-[#1E293B] rounded-2xl p-6 shadow-lg shadow-[#06B6D4]/5">
								<h3 className="mb-1 text-xl font-semibold">Weekly Activity</h3>
								<p className="mb-6 text-sm text-gray-400">
									Number of reports per day
								</p>
								<div className="h-[250px]">
									<ResponsiveContainer width="100%" height="100%">
										<LineChart data={activityData}>
											<CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
											<XAxis
												dataKey="name"
												stroke="#64748B"
												tick={{ fill: "#64748B" }}
											/>
											<YAxis stroke="#64748B" tick={{ fill: "#64748B" }} />
											<Tooltip content={<CustomTooltip />} />
											<Line
												type="monotone"
												dataKey="total"
												stroke="#06B6D4"
												strokeWidth={3}
												dot={{ fill: "#06B6D4", strokeWidth: 2, r: 6 }}
												activeDot={{ r: 8, fill: "#3B82F6" }}
											/>
										</LineChart>
									</ResponsiveContainer>
								</div>
							</div>

							<div className="bg-[#1E293B] rounded-2xl p-6 shadow-lg shadow-[#06B6D4]/5">
								<h3 className="mb-1 text-xl font-semibold">Issue Severity</h3>
								<p className="mb-6 text-sm text-gray-400">
									Distribution by severity level
								</p>
								<div className="h-[250px]">
									<ResponsiveContainer width="100%" height="100%">
										<BarChart data={severityData}>
											<CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
											<XAxis
												dataKey="name"
												stroke="#64748B"
												tick={{ fill: "#64748B" }}
											/>
											<YAxis stroke="#64748B" tick={{ fill: "#64748B" }} />
											<Tooltip content={<CustomTooltip />} />
											<Bar
												dataKey="value"
												fill="#06B6D4"
												radius={[8, 8, 0, 0]}
											/>
										</BarChart>
									</ResponsiveContainer>
								</div>
							</div>
						</div>

						{/* Recent Reports */}
						<div className="bg-[#1E293B] rounded-2xl p-6 shadow-lg shadow-[#06B6D4]/5">
							<h3 className="mb-1 text-xl font-semibold">Recent Reports</h3>
							<p className="mb-6 text-sm text-gray-400">
								Latest community submissions
							</p>
							<div className="space-y-4">
								{reports.map((report) => (
									<div
										key={report.id}
										className="flex items-center justify-between p-4 bg-[#0F172A] rounded-xl hover:shadow-md hover:shadow-[#06B6D4]/10 transition-shadow"
									>
										<div className="flex items-start gap-4">
											<div
												className={`w-3 h-3 mt-2 rounded-full ${
													report.severity === "high"
														? "bg-red-500"
														: report.severity === "medium"
															? "bg-yellow-500"
															: "bg-green-500"
												}`}
											/>
											<div>
												<h3 className="font-medium">{report.title}</h3>
												<div className="flex items-center gap-2 text-sm text-gray-400">
													<MapPin className="w-4 h-4" />
													{report.location}
												</div>
												<div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
													<Clock className="w-3 h-3" />
													{report.timestamp}
												</div>
											</div>
										</div>
										<div className="flex flex-col items-end gap-2">
											<span
												className={`px-3 py-1 text-xs rounded-full ${
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
												<Activity className="w-4 h-4" />
												{report.votes} votes
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				{activeTab === "reports" && <ReportsView />}
				{activeTab === "hotspots" && <HotspotsView />}
			</div>
		</div>
	);
}
