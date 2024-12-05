import { useState } from "react";
import Box from "@mui/material/Box";
import { useStyles } from "./createNewStudentsAndClasses.styles";
import Navbar from "../components/navbarComponent/navbarComponent";
import { Sidebar } from "../components/sideMenuComponent/sideMenuComponent";
import AddStudentForm from "../components/addNewStudentComponent/addNewStudentComponent";
import CreateClassForm from "../components/createNewClassComponent/createNewClassComponent";

const CreateNewStudentsAndClasses = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const classes = useStyles();

  const handleMenuClick = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  return (
    <Box>
      <Sidebar open={isSideBarOpen} onClose={handleMenuClick} />
      <Box
        className={classes.box}
      >
        <Navbar onMenuClick={handleMenuClick} />
        <Box
          className={classes.formsContainer}
        >
          <h2 className={classes.headline}>Create new class</h2>
          <CreateClassForm />
        </Box>

        <Box
          className={classes.formsContainer}
        >
          <h2 className={classes.headline}>Add new student</h2>
          <AddStudentForm />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateNewStudentsAndClasses;
