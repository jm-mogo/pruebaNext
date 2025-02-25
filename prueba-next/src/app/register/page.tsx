"use client";
import React, { useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const RegisterPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const registerUser = async () => {
			try {
				const response = await fetch(apiUrl + "/api/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				});

				console.log(response);

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const data = await response.json();
				console.log("User registered successfully:", data);
				alert("User create");
				window.location.replace("/login");
			} catch (error) {
				console.error(
					"There was a problem with the registration:",
					error
				);
			}
		};

		registerUser();
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
				<h2 className="text-2xl font-bold text-center">Register</h2>
				<form className="space-y-4" onSubmit={handleSubmit}>
					<div>
						<label
							htmlFor="username"
							className="block text-sm font-medium text-gray-700"
						>
							Username
						</label>
						<input
							type="text"
							name="name"
							id="name"
							value={formData.name}
							onChange={handleChange}
							required
							className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							type="email"
							name="email"
							id="email"
							value={formData.email}
							onChange={handleChange}
							required
							className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							minLength={8}
							value={formData.password}
							onChange={handleChange}
							required
							className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					<button
						type="submit"
						className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Register
					</button>
				</form>
				<div className="text-center">
					<p className="text-sm text-gray-600">
						Already have an account?{" "}
						<a
							href="/login"
							className="text-indigo-600 hover:text-indigo-500"
						>
							Log in
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
