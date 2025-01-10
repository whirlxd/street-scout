import { AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react";

const StatsOverview = () => {
	const stats = [
		{
			title: "Total Reports",
			value: 1234,
			icon: AlertTriangle,
			color: "text-yellow-500",
		},
		{
			title: "Resolved Issues",
			value: 987,
			icon: CheckCircle,
			color: "text-green-500",
		},
		{
			title: "Pending Reports",
			value: 247,
			icon: Clock,
			color: "text-orange-500",
		},
		{
			title: "Trending Issues",
			value: 15,
			icon: TrendingUp,
			color: "text-blue-500",
		},
	];

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			{stats.map((stat, index) => (
				<div key={index} className="bg-[#1E293B] p-4 rounded-lg">
					<div className="flex items-center justify-between mb-2">
						<h3 className="text-lg font-semibold">{stat.title}</h3>
						<stat.icon className={`w-6 h-6 ${stat.color}`} />
					</div>
					<p className="text-3xl font-bold">{stat.value}</p>
				</div>
			))}
		</div>
	);
};

export default StatsOverview;
