import { useState } from "react";
import { Box } from "@mui/material";
import { useStyles } from "./students.styles";
import Navbar from "../components/navbarComponent/navbarComponent";
import { Sidebar } from "../components/sideMenuComponent/sideMenuComponent";
import ListOfStudentsTable from "../components/listOfStudentsComponent/listOfStudentsComponent";

const Students = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const studentsStyles = useStyles();

  const handleMenuClick = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  return (
    <Box>
      <Sidebar open={isSideBarOpen} onClose={handleMenuClick} />
      <Box>
        <Navbar onMenuClick={handleMenuClick} />
      </Box>
      <Box className={studentsStyles.table_container}>
        <ListOfStudentsTable />
      </Box>
    </Box>
  );
};

export default Students;
