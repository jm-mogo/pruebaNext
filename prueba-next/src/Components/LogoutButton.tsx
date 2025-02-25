// import { useRouter } from "next/router";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const LogoutButton = () => {
	// const router = useRouter();

	const handleLogout = async () => {
		const jwtToken = localStorage.getItem("jwtToken");
		if (jwtToken) {
			try {
				const response = await fetch(apiUrl + "/api/logout", {
					method: "POST",
					headers: {
						Authorization: jwtToken,
					},
				});
				console.log(response);
				if (response.ok) {
					localStorage.removeItem("jwtToken");
					window.location.replace("/login");
					// router.push("/login");
				} else {
					console.error("Logout failed");
				}
			} catch (error) {
				console.error("Network error during logout", error);
			}
		} else {
			// If no token found, redirect to login page
			// router.push("/login");
			window.location.reload();
		}
	};

	return (
		<button
			onClick={handleLogout}
			className="bg-red-600 text-red px-4 py-2 rounded shadow-md hover:bg-red-700 transition duration-300"
		>
			Logout
		</button>
	);
};

export default LogoutButton;
