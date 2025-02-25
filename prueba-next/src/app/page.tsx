"use client";
import LogoutButton from "@/Components/LogoutButton";
import { useEffect, useState } from "react";

type User = { name: string };

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
	const [user, setUser] = useState<User | undefined>();

	useEffect(() => {
		const fetchUser = async () => {
			const jwtToken = localStorage.getItem("jwtToken");
			if (jwtToken) {
				console.log(jwtToken);
				const response = await fetch(apiUrl + "/api/user", {
					headers: {
						Authorization: jwtToken,
					},
				});
				console.log(response);
				if (response.ok) {
					const data = await response.json();
					setUser(data);
				}
			} else {
				window.location.replace("/login");
			}
		};
		fetchUser();
	}, []);
	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
			<div className="bg-white p-10 rounded-lg shadow-lg text-center">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">
					Welcome, {user?.name}!
				</h1>
				<p className="text-lg text-gray-700">
					We are glad to have you here. Explore and enjoy your stay!
				</p>
				<LogoutButton />
			</div>
		</div>
	);
}
