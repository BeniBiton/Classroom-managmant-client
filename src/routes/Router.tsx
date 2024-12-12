import React from "react";
import Classes from "../pages/classes/Classes";
import { Route, Routes } from "react-router-dom";
import Students from "../pages/students/students";
import CreateNewStudentsAndClasses from "../pages/createNewStudetnsAndClasses/createNewStudentsAndClasses";

const routes = [
  { path: "/", element: <Classes /> },
  { path: "/classes", element: <Classes /> },
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
