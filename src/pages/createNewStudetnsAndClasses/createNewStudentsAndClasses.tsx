import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";  // Import Typography
import { useStyles } from "./createNewStudentsAndClasses.styles";
import AddStudentForm from "../components/addNewStudentComponent/addNewStudentComponent";
import CreateClassForm from "../components/createNewClassComponent/createNewClassComponent";

const CreateNewStudentsAndClasses = () => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Box className={classes.formsContainer}>
        <Typography className={classes.headline}>Create new class</Typography> 
        <CreateClassForm />
      </Box>

      <Box className={classes.formsContainer}>
        <Typography className={classes.headline}>Add new student</Typography> 
        <AddStudentForm />
      </Box>
    </Box>
  );
};

export default CreateNewStudentsAndClasses;
