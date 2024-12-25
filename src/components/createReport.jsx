import { useState, useRef } from "react";
import { supabase } from "../clients/supabase";
import { Camera, ArrowLeft, MapPin } from "lucide-react";

export default function NewReport() {
	const [severity, setSeverity] = useState(null);
	const [title, setTitle] = useState("");
	const [location, setLocation] = useState("");
	const [image, setImage] = useState(null);
	const fileInputRef = useRef(null);
	const [aimg, setAimg] = useState(null);

	const [loading, setLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission
	};

	const handlePhotoUpload = () => {
		fileInputRef.current.click();
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setImage(imageUrl);
			setAimg(file);
		}
	};
	const getCurrentLocation = () => {
		setLocation("Sector 126 , Noida , Uttar Pradesh , India");
	};
	const handleSend = async () => {
		if (!title || !location || !severity || !image) {
			alert("Please fill in all fields");
			return;
		}

		setLoading(true);

		// Upload image to Supabase Storage
		const fileName = `${Date.now()}_${aimg.name}`;
		const { data, error: uploadError } = await supabase.storage
			.from("report-images")
			.upload(fileName, aimg);

		if (uploadError) {
			alert("Image upload failed.");
			setLoading(false);
			console.error(uploadError);
			console.log(image);
			return;
		}

		// Get public URL of the uploaded image
		const { data: publicURLData, error: urlError } = supabase.storage
			.from("report-images")
			.getPublicUrl(fileName);

		if (urlError) {
			alert("Failed to get image URL.");
			setLoading(false);
			console.error(urlError);
			return;
		}

		const publicURL = publicURLData.publicUrl;

		// Insert report data into Supabase Database
		const { error: insertError } = await supabase.from("reports").insert([
			{
				title,
				location,
				severity: severity === "low" ? 1 : severity === "medium" ? 2 : 3,
				image_url: publicURL,
			},
		]);

		if (insertError) {
			alert("Failed to submit report.");
			setLoading(false);
			console.error(insertError);
			return;
		}

		alert("Report submitted successfully!");
		// Reset form
		setTitle("");
		setLocation("");
		setSeverity(null);
		setImage();
		setLoading(false);
	};
	return (
		<div className="min-h-screen bg-[#0F172A] text-white px-4 overflow-y-auto">
			{/* Header */}
			<div className="flex items-center pt-6 pb-8">
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<a href="/" className="mr-4 text-white">
					<ArrowLeft className="w-6 h-6" />
				</a>
				<h1 className="flex-1 -ml-8 text-2xl font-semibold text-center">
					New Report
				</h1>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Photo Upload */}
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<div
					onClick={handlePhotoUpload}
					className="border-2 border-dashed border-gray-600 rounded-xl aspect-[4/3] flex flex-col items-center justify-center bg-[#1E293B] bg-opacity-40 cursor-pointer"
					style={{
						backgroundImage: image ? `url(${image})` : "none",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					{!image && (
						<>
							<Camera className="w-12 h-12 mb-2 text-gray-500" />
							<p className="text-lg text-gray-400">
								Tap to take photo or upload
							</p>
						</>
					)}
					<input
						type="file"
						accept="image/*"
						className="hidden"
						ref={fileInputRef}
						onChange={handleImageChange}
						aria-label="Upload photo"
					/>
				</div>

				{/* Report Title */}
				<div>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Report Title"
						className="w-full px-4 py-4 bg-[#1E293B] bg-opacity-40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
					/>
				</div>

				{/* Location */}
				<div className="flex gap-3">
					<input
						type="text"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						placeholder="Current Location"
						className="flex-1 px-4 py-4 bg-[#1E293B] bg-opacity-40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
					/>
					<button
						type="button"
						className="w-14 h-14 flex items-center justify-center bg-[#1E293B] bg-opacity-40 rounded-lg"
						onClick={() => getCurrentLocation()}
					>
						<MapPin className="w-6 h-6 text-[#06B6D4]" />
					</button>
				</div>

				{/* Severity */}
				<div className="space-y-3">
					{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
					<label className="text-xl">Severity</label>
					<div className="grid grid-cols-3 gap-3">
						<button
							type="button"
							onClick={() => setSeverity("low")}
							className={`py-3 rounded-lg text-center transition-colors ${
								severity === "low"
									? "bg-[#22c55e33] text-green-400"
									: "bg-[#1E293B] bg-opacity-40 text-green-500"
							}`}
						>
							Low
						</button>
						<button
							type="button"
							onClick={() => setSeverity("medium")}
							className={`py-3 rounded-lg text-center transition-colors ${
								severity === "medium"
									? "bg-[#eab30833] text-yellow-400"
									: "bg-[#1E293B] bg-opacity-40 text-yellow-500"
							}`}
						>
							Medium
						</button>
						<button
							type="button"
							onClick={() => setSeverity("high")}
							className={`py-3 rounded-lg text-center transition-colors ${
								severity === "high"
									? "bg-[#ef444433] text-red-400"
									: "bg-[#1E293B] bg-opacity-40 text-red-500"
							}`}
						>
							High
						</button>
					</div>
				</div>

				{/* Submit Button */}
				<div className="">
					<button
						type="submit"
						onClick={handleSend}
						className="w-full bg-[#06B6D4] rounded-md  text-lg font-medium py-2.5  hover:bg-opacity-90 transition-all mb-1 mt-2 text-[#E5F0FF]"
					>
						{loading ? "Submitting..." : "Submit Report"}
					</button>
				</div>
			</form>
		</div>
	);
}
