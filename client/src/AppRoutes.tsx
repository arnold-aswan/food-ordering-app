import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AuthCallback from "./pages/AuthCallback";
import UserProfile from "./pages/UserProfile";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";

const AppRoutes = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<Layout showHero>
						<HomePage />
					</Layout>
				}
			/>
			<Route
				path="/auth-callback"
				element={<AuthCallback />}
			/>

			<Route element={<ProtectedRoute />}>
				<Route
					path="/user-profile"
					element={
						<Layout>
							<UserProfile />
						</Layout>
					}
				/>
			</Route>

			<Route
				path="/manage-restaurant"
				element={
					<Layout>
						<ManageRestaurantPage />
					</Layout>
				}
			/>
			<Route
				path="*"
				element={<Navigate to="/" />}
			/>
		</Routes>
	);
};

export default AppRoutes;
