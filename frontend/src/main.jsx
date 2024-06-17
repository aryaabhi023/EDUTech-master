import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./Store/store.js";
import {
  Home,
  Login,
  Signup,
  AuthLayout,
  ForgetPassword,
  Problems,
  Profile,
  EditAvatar,
  Leaderboard,
  UploadProblem,
  Courses,
  CreateCourse,
  UploadChapter,
  InsideProblem,
  InsideCourse,
  POTD
} from "./Component/index.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: (
          <AuthLayout>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "signup",
        element: (
          <AuthLayout>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "upload-problem",
        element: (
          <AuthLayout>
            <UploadProblem />
          </AuthLayout>
        ),
      },
      {
        path: "create-course",
        element: (
          <AuthLayout>
            <CreateCourse />
          </AuthLayout>
        ),
      },
      {
        path: "upload-chapter",
        element: (
          <AuthLayout>
            <UploadChapter />
          </AuthLayout>
        ),
      },
      {
        path: "profile/:username",
        element: (
          <AuthLayout>
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: "edit-avatar",
        element: (
          <AuthLayout>
            <EditAvatar />
          </AuthLayout>
        ),
      },
      {
        path: "inside-problem/:problemId",
        element: (
          <AuthLayout>
            <InsideProblem />
          </AuthLayout>
        ),
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "Leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "problems",
        element: <Problems />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "course/:courseId",
        element: <InsideCourse />,
      },
      {
        path: "potd",
        element: <POTD />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);