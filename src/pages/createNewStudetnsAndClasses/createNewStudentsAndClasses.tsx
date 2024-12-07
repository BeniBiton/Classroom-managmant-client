import Box from "@mui/material/Box";
import { useStyles } from "./createNewStudentsAndClasses.styles";
import AddStudentForm from "../components/addNewStudentComponent/addNewStudentComponent";
import CreateClassForm from "../components/createNewClassComponent/createNewClassComponent";

const CreateNewStudentsAndClasses = () => {
  const classes = useStyles();

  return (
    <Box>
      <Box
        className={classes.box}
      >
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
