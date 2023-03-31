import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateNewPass from "../pages/Auth/CreateNewPass";
import LoginPage from "../pages/Auth/LoginPage";
import RecoveryPassPage from "../pages/Auth/RecoveryPassPage";
import RegistrPage from "../pages/Auth/RegistrPage";
import RegistrMentor from "../pages/AuthMentor/RegistrMentor";
import RegistrMentorStage from "../pages/AuthMentor/RegistrMentorStage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

const MainRoutes = () => {
  const PUBLIC_ROUTES = [
    {
      link: "/registr",
      element: <RegistrPage />,
      id: 1,
    },
    {
      link: "/registrMentor",
      element: <RegistrMentor />,
      id: 2,
    },
    {
      link: "/registrMentorStage",
      element: <RegistrMentorStage />,
      id: 3,
    },
    {
      link: "login",
      element: <LoginPage />,
      id: 4,
    },
    {
      link: "/recoveryPass",
      element: <RecoveryPassPage />,
      id: 5,
    },
    {
      link: "/account/login",
      element: <CreateNewPass />,
      id: 6,
    },
    {
      link: "/",
      element: <HomePage />,
      id: 7,
    },
    {
      link: "*",
      element: <NotFoundPage />,
      id: 7,
    },
  ];

  return (
    <Routes>
      {PUBLIC_ROUTES.map((item) => (
        <Route path={item.link} element={item.element} key={item.id} />
      ))}
    </Routes>
  );
};

export default MainRoutes;
