import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Import A-Frame and AR.js
import "aframe";
import "aframe-ar";

const MOCK_REPORTS = [
	{
		id: 1,
		title: "Broken Sidewalk",
		severity: "high",
		distance: 50,
		lat: 35.6895,
		lon: 139.6917,
	},
	{
		id: 2,
		title: "Graffiti",
		severity: "medium",
		distance: 100,
		lat: 35.6897,
		lon: 139.6922,
	},
	{
		id: 3,
		title: "Pothole",
		severity: "high",
		distance: 150,
		lat: 35.69,
		lon: 139.6925,
	},
	{
		id: 4,
		title: "Fallen Tree",
		severity: "medium",
		distance: 200,
		lat: 35.6892,
		lon: 139.693,
	},
];

const ARView = () => {
	const [reports] = useState(MOCK_REPORTS);
	const [aframeLoaded, setAframeLoaded] = useState(false);

	useEffect(() => {
		if (typeof AFRAME !== "undefined" && !AFRAME.components["text-geometry"]) {
			AFRAME.registerComponent("text-geometry", {
				schema: {
					value: { type: "string", default: "" },
				},
				init: function () {
					const text = document.createElement("a-text");
					text.setAttribute("value", this.data.value);
					text.setAttribute("align", "center");
					text.setAttribute("position", "0 -0.5 0");
					text.setAttribute("scale", "0.5 0.5 0.5");
					text.setAttribute("color", "#FFFFFF");
					this.el.appendChild(text);
				},
			});
		}
		setAframeLoaded(true);
	}, []);

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
			<div className="bg-[#1E293B] p-4 flex items-center justify-between z-10">
				<Link to="/" className="text-white">
					<ArrowLeft className="w-6 h-6" />
				</Link>
				<h1 className="text-xl font-semibold text-white">AR View</h1>
				<div className="w-6 h-6"></div>
			</div>

			{/* AR Scene */}
			<div className="relative flex-1">
				{aframeLoaded && (
					<a-scene
						embedded
						arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
						vr-mode-ui="enabled: false"
					>
						<a-camera gps-camera rotation-reader></a-camera>
						{reports.map((report) => (
							<a-entity
								key={report.id}
								gps-entity-place={`latitude: ${report.lat}; longitude: ${report.lon};`}
							>
								<a-sphere
									radius="0.5"
									material={`color: ${getSeverityColor(report.severity)}; opacity: 0.8;`}
								></a-sphere>
								<a-entity text-geometry={`value: ${report.title}`}></a-entity>
							</a-entity>
						))}
					</a-scene>
				)}
			</div>

			{/* Instructions */}
			<div className="bg-[#1E293B] p-4 text-white text-center z-10">
				<p>Move your device to look around and see nearby reports</p>
			</div>

			{/* Reports List */}
			<div className="bg-[#1E293B] p-4 space-y-2 max-h-48 overflow-y-auto z-10">
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
			<nav className="bg-[#1E293B] px-4 py-3 flex justify-around items-center z-10">
				<Link
					to="/"
					className="text-[#06B6D4] flex flex-col items-center gap-1"
				>
					<span className="text-sm">Home</span>
				</Link>
				<Link to="/ar" className="flex flex-col items-center gap-1 text-white">
					<span className="text-sm">AR View</span>
				</Link>
			</nav>
		</div>
	);
};

export default ARView;
