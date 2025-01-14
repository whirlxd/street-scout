/* eslint-disable react/prop-types */
import { Bell, Award } from "lucide-react";
import { NotificationsPanel } from "./notifications-panel";
import { useState } from "react";

export function UserHeader({ name, avatar, notifications = 0 }) {
	const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] =
		useState(false);
	const userReports = 10; // Hardcoded number of reports submitted by the user

	return (
		<>
			<div className="bg-[#1E293B] bg-opacity-40 rounded-xl p-4 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="w-12 h-12 bg-[#06B6D4] rounded-full flex items-center justify-center relative">
						{avatar ? (
							<img
								src={avatar}
								alt={name}
								className="object-cover w-full h-full rounded-full"
							/>
						) : (
							<span className="text-xl font-medium text-white">
								{name.charAt(0)}
							</span>
						)}
						{userReports > 0 && (
							<span className="absolute bottom-0 right-0 w-4 h-4 bg-[#F59E0B] rounded-full flex items-center justify-center">
								<Award className="w-3 h-3 text-white" />
							</span>
						)}
					</div>
					<div className="flex items-center gap-2">
						<h1 className="text-xl font-medium text-white">{name}</h1>
					</div>
				</div>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button
					className="relative p-2 transition-colors rounded-lg hover:bg-white/5"
					onClick={() => setIsNotificationsPanelOpen(true)}
				>
					<Bell className="w-6 h-6 text-gray-400" />
					{notifications > 0 && (
						<span className="absolute top-1 right-1 w-2 h-2 bg-[#06B6D4] rounded-full" />
					)}
				</button>
			</div>
			<NotificationsPanel
				isOpen={isNotificationsPanelOpen}
				onClose={() => setIsNotificationsPanelOpen(false)}
			/>
		</>
	);
}
