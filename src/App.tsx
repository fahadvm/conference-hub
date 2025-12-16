import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import { ScrollToTop } from "@/lib/scroll-to-top";

import HomePage from "@/components/pages/HomePage";
import MeetingsPage from "@/components/pages/MeetingsPage";
import SchedulePage from "@/components/pages/SchedulePage";
import MeetingRoomPage from "@/components/pages/MeetingRoomPage";
import ProfilePage from "@/components/pages/ProfilePage";


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
          path: "meetings",
          element: <MeetingsPage />,
        },
        {
          path: "schedule",
          element: <SchedulePage />,
        },
        {
          path: "meeting/:meetingId",
          element: <MeetingRoomPage />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
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
      <RouterProvider router={router} />
  );
}
