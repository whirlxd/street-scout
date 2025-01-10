import React from "react";

const HotspotMap = () => {
	return (
		<div className="bg-[#1E293B] p-4 rounded-lg">
			<h2 className="mb-4 text-xl font-semibold">Issue Hotspots</h2>
			<div className="aspect-w-16 aspect-h-9 bg-[#0F172A] rounded-lg flex items-center justify-center">
				<p className="text-gray-400">Map visualization would go here</p>
			</div>
			<div className="mt-4 space-y-2">
				<div className="flex items-center justify-between">
					<span>Downtown</span>
					<span className="px-2 py-1 text-xs text-red-400 rounded-full bg-red-900/80">
						High Activity
					</span>
				</div>
				<div className="flex items-center justify-between">
					<span>Suburb A</span>
					<span className="px-2 py-1 text-xs text-yellow-400 rounded-full bg-yellow-900/80">
						Medium Activity
					</span>
				</div>
				<div className="flex items-center justify-between">
					<span>Suburb B</span>
					<span className="px-2 py-1 text-xs text-green-400 rounded-full bg-green-900/80">
						Low Activity
					</span>
				</div>
			</div>
		</div>
	);
};

export default HotspotMap;
