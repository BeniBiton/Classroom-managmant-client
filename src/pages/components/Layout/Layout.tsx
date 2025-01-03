import { Box } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../navbarComponent/navbarComponent";
import useFetchClasses from "../../../hooks/useFetchClasses";
import useFetchStudents from "../../../hooks/useFetchStudents";
import { Sidebar } from "../sideMenuComponent/sideMenuComponent";
import { LayoutProps } from "../../../interfaces/layout.interface";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useFetchClasses();
  useFetchStudents();

  const handleMenuClick = () => {
    setIsSideBarOpen((prevState) => !prevState);
  };

  return (
    <Box>
      <Navbar onMenuClick={handleMenuClick} />
      <Sidebar open={isSideBarOpen} onClose={handleMenuClick} />
      <Box mt={8}>{children}</Box>
    </Box>
  );
};

export default Layout;
