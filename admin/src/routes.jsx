import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//components
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import DashboardAppPage from "./pages/DashboardAppPage";
import PropertiesPage from "./pages/PropertiesPage";
import BrokerPage from "./pages/BrokerPage";
import ReviewsPage from "./pages/ReviewsPage";

// ----------------------------------------------------------------------

export const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <LoginPage />,
      index: true,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "users", element: <UserPage /> },
        { path: "brokers", element: <BrokerPage /> },
        { path: "properties", element: <PropertiesPage /> },
        { path: "reviews", element: <ReviewsPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
};
