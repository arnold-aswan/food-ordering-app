import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AuthCallback from "./pages/AuthCallback";

const AppRoutes = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<Layout>
						<HomePage />
					</Layout>
				}
			/>
			<Route
				path="/auth-callback"
				element={<AuthCallback />}
			/>
			<Route
				path="/user-profile"
				element={<span>user profile</span>}
			/>
			<Route
				path="*"
				element={<Navigate to="/" />}
			/>
		</Routes>
	);
};

export default AppRoutes;
