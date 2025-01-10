/* eslint-disable react/prop-types */

import { WifiOff } from "lucide-react";

const OfflinePopup = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
			<div className="bg-[#1E293B] rounded-lg p-6 max-w-sm w-full mx-4">
				<div className="flex items-center justify-center mb-4">
					<div className="bg-[#0F172A] rounded-full p-3">
						<WifiOff className="w-8 h-8 text-[#06B6D4]" />
					</div>
				</div>
				<h2 className="mb-2 text-xl font-semibold text-center text-white">
					You&apos;re Offline
				</h2>
				<p className="mb-4 text-center text-gray-300">
					Don&apos;t worry! Your report will be submitted automatically when
					you&apos;re back online.
				</p>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button
					onClick={onClose}
					className="w-full bg-[#06B6D4] text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors"
				>
					Got it
				</button>
			</div>
		</div>
	);
};

export default OfflinePopup;
