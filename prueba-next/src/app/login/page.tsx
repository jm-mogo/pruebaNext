"use client";
import { redirect } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	if (localStorage.getItem("jwtToken")) {
		redirect("/");
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch("http://127.0.0.1:8080/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({ email, password }),
			});
			if (response.status == 422) {
				alert("Invalid credentials. Please try again.");
				return;
			}

			if (!response.ok) return;

			const result = await response.json();

			// Handle successful login
			localStorage.setItem(
				"jwtToken",
				result.token_type + " " + result.access_token
			);

			console.log("Success:", result);
			window.location.reload();
			// Handle successful login here (e.g., redirect to another page)
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100 ">
			<div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
				<h2 className="text-2xl font-bold text-center">Login</h2>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm space-y-8">
						<div>
							<label htmlFor="email" className="sr-only">
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="relative block w-full px-3 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								placeholder="Email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="relative block w-full px-3 py-2 border border-gray-300 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Sign in
						</button>
					</div>
				</form>

				<div className="text-center">
					<p className="text-sm text-gray-600">
						Don&apos;t have an account?{" "}
						<a
							href="/register"
							className="font-medium text-indigo-600 hover:text-indigo-500"
						>
							Register
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
