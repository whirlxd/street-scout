"use client";

import { useState } from "react";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!email || !password) {
			alert("Please fill in all fields");
			return;
		}
		if (email === "test@mail.com" && password === "test") {
			alert("Logged in successfully");
			sessionStorage.setItem("isLoggedIn", true);
			window.location.reload();
		}
	};
	const isFormFilled = email !== "" && password !== "";
	return (
		<div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center px-4">
			<div className="w-full max-w-md space-y-8">
				{/* Logo and Title */}
				<div className="flex flex-col items-center space-y-4">
					<div className="flex items-center justify-center w-16 h-16">
						<img src="/streetscout.png" alt="Street Scout Logo" />
					</div>
					<div className="text-center">
						<h1 className="text-3xl font-bold text-white">Street Scout</h1>
						<p className="mt-2 text-gray-400">
							Report & Track Public Property Issues
						</p>
					</div>
				</div>

				{/* Login Form */}
				<form onSubmit={handleSubmit} className="mt-8 space-y-4">
					<div>
						<input
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email"
							className="w-full px-4 py-4 bg-[#1E293B] bg-opacity-40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:bg-opacity-50 transition-all"
						/>
					</div>
					<div>
						<input
							type="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							className="w-full px-4 py-4  bg-[#1E293B] bg-opacity-40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:bg-opacity-50 transition-all"
						/>
					</div>
					<button
						type="submit"
						className={`w-full py-4 rounded-lg font-medium transition-all ${
							isFormFilled
								? "bg-[#5985C2] text-white"
								: "bg-[#3B4354] text-white hover:bg-opacity-90"
						}`}
					>
						Sign In
					</button>
				</form>

				{/* Sign Up Link */}
				<p className="text-center text-gray-400 ">
					Don&apos;t have an account?{" "}
					{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
					<button
						onClick={() => alert("The app is in development")}
						className="text-[#06B6D4] hover:underline"
					>
						Sign up
					</button>
				</p>
			</div>
		</div>
	);
}
