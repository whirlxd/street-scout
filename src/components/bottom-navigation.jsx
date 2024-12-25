/* eslint-disable react/prop-types */
import { Home, Map, Plus } from "lucide-react";

export function BottomNav({ currentPath }) {
	const navItems = [
		{ icon: Home, label: "Home", path: "/" },
		{ icon: Map, label: "Nearby Reports", path: "/map" },
	];

	return (
		<nav className="fixed bottom-0 left-0 right-0 bg-[#1E293B] border-t border-gray-800 px-4 pb-1 pt-8 -mt-6 rounded-t-2xl shadow-lg">
			<div className="relative flex items-center justify-around">
				{navItems.map((item, index) => {
					const isActive = currentPath === item.path;
					return (
						<a
							key={item.path}
							href={item.path}
							className={`flex flex-col items-center justify-center gap-0.5 min-w-[4rem] p-1.5 rounded-xl transition-all ${
								isActive
									? "text-[#06B6D4] bg-[#0F172A]/50 ring-1 ring-[#06B6D4]/20"
									: "text-gray-400 hover:text-gray-300"
							}`}
						>
							<item.icon className="w-6 h-6" />
							<span className="text-xs font-medium">{item.label}</span>
						</a>
					);
				})}
			</div>
			<a
				href="/reports/new"
				className="absolute -top-5 left-1/2 -translate-x-1/2 w-14 h-14 bg-[#06B6D4] rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-all border-4 border-[#1E293B]"
				aria-label="Create new report"
			>
				<Plus className="w-8 h-8 text-white" />
			</a>
		</nav>
	);
}
