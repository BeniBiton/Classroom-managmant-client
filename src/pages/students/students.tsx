import { Box } from "@mui/material";
import { useStyles } from "./students.styles";
import ListOfStudentsTable from "../components/listOfStudentsComponent/listOfStudentsComponent";

const Students = () => {
  const studentsStyles = useStyles();

  return (
    <Box>
      <Box className={studentsStyles.table_container}>
        <ListOfStudentsTable />
      </Box>
    </Box>
  );
};

export default Students;
