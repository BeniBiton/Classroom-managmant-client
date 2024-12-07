import React from "react";
import Classes from "../pages/classes/Classes";
import Students from "../pages/students/students";
import CreateNewStudentsAndClasses from "../pages/createNewStudetnsAndClasses/createNewStudentsAndClasses";
import { Route, Routes } from "react-router-dom"; // Removed BrowserRouter

const routes = [
  { path: "/", element: <Classes /> },
  { path: "/students", element: <Students /> },
  { path: "/create", element: <CreateNewStudentsAndClasses /> },
];

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default AppRouter;
