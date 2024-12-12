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
        {classrooms?.map(({ id, className, totalPlaces, students }) => (
          <ClassCard
            classId={id}
            className={className}
            totalPlaces={totalPlaces}
            students={students}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default Classes;
