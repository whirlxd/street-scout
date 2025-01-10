import { useState, useEffect } from "react";
import { ArrowLeft, Camera, Maximize2 } from "lucide-react";
import "aframe";

// Mock data for reports
const MOCK_REPORTS = [
	{
		id: 1,
		title: "Broken Sidewalk",
		severity: "high",
		distance: 50,
		position: "-2 1.5 -5",
	},
	{
		id: 2,
		title: "Graffiti",
		severity: "medium",
		distance: 100,
		position: "0 1.5 -5",
	},
	{
		id: 3,
		title: "Pothole",
		severity: "high",
		distance: 150,
		position: "2 1.5 -5",
	},
	{
		id: 4,
		title: "Fallen Tree",
		severity: "medium",
		distance: 200,
		position: "4 1.5 -5",
	},
];

function ARView() {
	const [reports] = useState(MOCK_REPORTS);
	const [isFullscreen, setIsFullscreen] = useState(false);

	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};

		document.addEventListener("fullscreenchange", handleFullscreenChange);

		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
		};
	}, []);

	const toggleFullscreen = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	};

	const getSeverityColor = (severity) => {
		switch (severity) {
			case "high":
				return "#EF4444";
			case "medium":
				return "#F59E0B";
			default:
				return "#10B981";
		}
	};

	return (
		<div className="min-h-screen bg-[#0F172A] flex flex-col">
			{/* Header */}
			<div className="bg-[#1E293B] p-4 flex items-center justify-between">
				<a href="/" className="text-white">
					<ArrowLeft className="w-6 h-6" />
				</a>
				<h1 className="text-xl font-semibold text-white">AR View</h1>
				<button onClick={toggleFullscreen} className="text-white">
					<Maximize2 className="w-6 h-6" />
				</button>
			</div>

			{/* AR View */}
			<div
				className={`flex-1 relative ${isFullscreen ? "fixed inset-0 z-50" : ""}`}
			>
				<a-scene embedded vr-mode-ui="enabled: false">
					<a-camera position="0 1.6 0"></a-camera>
					<a-sky color="#0F172A"></a-sky>
					{reports.map((report) => (
						<a-entity key={report.id} position={report.position}>
							<a-sphere
								radius="0.2"
								color={getSeverityColor(report.severity)}
							></a-sphere>
							<a-text
								value={`${report.title}\n${report.distance}m`}
								align="center"
								color="#FFFFFF"
								position="0 0.5 0"
								scale="0.5 0.5 0.5"
							></a-text>
						</a-entity>
					))}
				</a-scene>
				{!isFullscreen && (
					<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
						<Camera className="w-16 h-16 text-white opacity-50" />
					</div>
				)}
			</div>

			{/* Instructions */}
			<div className="bg-[#1E293B] p-4 text-white text-center">
				<p>Move your device to look around and see nearby reports</p>
			</div>

			{/* Reports List */}
			<div className="bg-[#1E293B] p-4 space-y-2 max-h-48 overflow-y-auto">
				<h2 className="mb-2 font-semibold text-white">Nearby Reports</h2>
				{reports.map((report) => (
					<div
						key={report.id}
						className="bg-[#0F172A] rounded-lg p-3 flex justify-between items-center"
					>
						<div>
							<h3 className="font-medium text-white">{report.title}</h3>
							<p className="text-sm text-gray-400">{report.distance}m away</p>
						</div>
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
					</div>
				))}
			</div>

			{/* Bottom Navigation */}
			<nav className="bg-[#1E293B] px-4 py-3 flex justify-around items-center">
				<a href="/" className="text-[#06B6D4] flex flex-col items-center gap-1">
					<span className="text-sm">Home</span>
				</a>
				<a href="/ar" className="flex flex-col items-center gap-1 text-white">
					<span className="text-sm">AR View</span>
				</a>
			</nav>
		</div>
	);
}

export default ARView;
