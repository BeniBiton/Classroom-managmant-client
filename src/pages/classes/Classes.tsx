import {  useState } from "react";
import { Box, Grid } from "@mui/material";
import { useStyles } from "./Classes.style";
import { Sidebar } from "../components/sideMenuComponent/sideMenuComponent";
import Navbar from "../components/navbarComponent/navbarComponent";
import StudentCard from "../components/cardComponent/cardComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Classes: React.FC = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const classesStyle = useStyles();

  const classrooms = useSelector(
    (state: RootState) => state.classrooms.classesData
  );

  const handleMenuClick = (): void => {
    setIsSideBarOpen((prevState) => !prevState);
  };

  return (
    <Box>
      <Sidebar open={isSideBarOpen} onClose={handleMenuClick} />
      <Box className={classesStyle.box}>
        <Navbar onMenuClick={handleMenuClick} />
        <Grid className={classesStyle.gridContainer}>
          {classrooms?.map((classItem) => (
            <Grid item key={classItem.id}>
              <StudentCard
                classId={classItem.id}
                className={classItem.className}
                totalPlaces={classItem.totalPlaces}
                students={classItem.students}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Classes;
