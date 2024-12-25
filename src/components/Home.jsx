import { useState, useEffect } from "react";
import { UserHeader } from "./user-header";
import { ReportCard } from "./report-card";
import { BottomNav } from "./bottom-navigation";
import { supabase } from "../clients/supabase"; // Adjust the path if necessary

export default function Home() {
	const [reports, setReports] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchReports = async () => {
			const { data, error } = await supabase
				.from("reports")
				.select("*")
				.order("created_at", { ascending: false });

			if (error) {
				setError(error.message);
			} else {
				setReports(data);
			}
			setLoading(false);
		};

		fetchReports();
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen bg-[#111827] items-center justify-center flex  ">
				<div className="loader" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-[#111827] pb-20 text-red-500 flex items-center justify-center">
				Error: {error}
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#111827] pb-20">
			{/* User Header */}
			<div className="p-4">
				<UserHeader name="Medhansh K" verified={true} />
			</div>

			{/* Recent Reports */}
			<div className="px-4 space-y-4">
				<h2 className="text-xl font-medium text-white">Recent Reports</h2>
				<div className="grid gap-4">
					{reports.map((report) => (
						<ReportCard
							key={report.id}
							{...report}
							image={report.image_url}
							timestamp={report.created_at}
						/>
					))}
				</div>
			</div>

			{/* Floating Action Button */}
			<BottomNav currentPath="/" />
		</div>
	);
}
