import React from "react";
import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useStyles } from "./Classes.style";
import { RootState } from "../../redux/store";
import ClassCard from "../components/cardComponent/cardComponent";

const Classes: React.FC = () => {
  const classesStyle = useStyles();

  const classrooms = useSelector(
    (state: RootState) => state.classrooms.classesData
  );

  return (
    <Box className={classesStyle.box}>
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
  );
};

export default Classes;
