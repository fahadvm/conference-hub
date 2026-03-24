import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import { ScrollToTop } from "@/lib/scroll-to-top";
import { AuthProvider } from "@/contexts/AuthContext";

import HomePage from "@/components/pages/HomePage";
import MeetingsPage from "@/components/pages/MeetingsPage";
import SchedulePage from "@/components/pages/SchedulePage";
import MeetingRoomPage from "@/components/pages/MeetingRoomPage";
import ProfilePage from "@/components/pages/ProfilePage";
import LoginPage from "@/components/pages/LoginPage";
import SignUpPage from "@/components/pages/SignUpPage";
import ProtectedRoute from "@/components/ProtectedRoute";


function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "signup",
          element: <SignUpPage />,
        },
        {
          path: "meeting/:meetingId",
          element: <MeetingRoomPage />,
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "meetings",
              element: <MeetingsPage />,
            },
            {
              path: "schedule",
              element: <SchedulePage />,
            },
            {
              path: "profile",
              element: <ProfilePage />,
            },
          ]
        },
        {
          path: "*",
          element: <Navigate to="/" replace />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_NAME,
  }
);


export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
