import React from "react";
import Classes from "../pages/classes/Classes";
import Students from "../pages/students/students";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateNewStudentsAndClasses from "../pages/createNewStudetnsAndClasses/createNewStudentsAndClasses";

const routes = [
  { path: "/", element: <Classes /> },
  { path: "/students", element: <Students /> },
  { path: "/create", element: <CreateNewStudentsAndClasses /> },
];

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Router>
  );
};

export default AppRouter;
