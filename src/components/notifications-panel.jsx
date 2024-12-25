/* eslint-disable react/prop-types */
import { useState } from "react";
import { X, Bell, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function NotificationsPanel({ isOpen, onClose }) {
	// This would typically come from an API or state management
	const [notifications, setNotifications] = useState([
		{
			id: "1",
			type: "alert",
			message: "New high severity report in your area",
			time: "5 min ago",
		},
		{
			id: "2",
			type: "success",
			message: "Your last report was resolved",
			time: "1 hour ago",
		},
		{
			id: "3",
			type: "info",
			message: "Weekly community update available",
			time: "3 hours ago",
		},
	]);

	const getIcon = (type) => {
		switch (type) {
			case "alert":
				return <AlertTriangle className="w-5 h-5 text-red-400" />;
			case "success":
				return <CheckCircle className="w-5 h-5 text-green-400" />;
			case "info":
				return <Info className="w-5 h-5 text-blue-400" />;
		}
	};

	const removeNotification = (id) => {
		setNotifications(notifications.filter((n) => n.id !== id));
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.2 }}
					className="fixed inset-0 z-50 bg-black bg-opacity-50"
					onClick={onClose}
				>
					<motion.div
						initial={{ opacity: 0, y: "100%" }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: "100%" }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="absolute bottom-0 left-0 right-0 bg-[#1E293B] rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex items-center justify-between mb-4">
							<h2 className="flex items-center gap-2 text-xl font-semibold text-white">
								<Bell className="w-6 h-6" />
								Notifications
							</h2>
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								onClick={onClose}
								className="text-gray-400 transition-colors hover:text-white"
							>
								<X className="w-6 h-6" />
							</button>
						</div>
						{notifications.length === 0 ? (
							<p className="py-4 text-center text-gray-400">
								No new notifications
							</p>
						) : (
							<ul className="space-y-3">
								{notifications.map((notification) => (
									<motion.li
										key={notification.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										className="bg-[#0F172A] rounded-lg p-3 flex items-start gap-3"
									>
										{getIcon(notification.type)}
										<div className="flex-1">
											<p className="text-white">{notification.message}</p>
											<p className="text-sm text-gray-400">
												{notification.time}
											</p>
										</div>
										{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
										<button
											onClick={() => removeNotification(notification.id)}
											className="text-gray-500 transition-colors hover:text-white"
										>
											<X className="w-4 h-4" />
										</button>
									</motion.li>
								))}
							</ul>
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
