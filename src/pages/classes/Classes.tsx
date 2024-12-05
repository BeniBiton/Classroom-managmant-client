import { useState } from "react";
import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useStyles } from "./Classes.style";
import { RootState } from "../../redux/store";
import Navbar from "../components/navbarComponent/navbarComponent";
import ClassCard from "../components/cardComponent/cardComponent";
import { Sidebar } from "../components/sideMenuComponent/sideMenuComponent";

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
              <ClassCard
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
