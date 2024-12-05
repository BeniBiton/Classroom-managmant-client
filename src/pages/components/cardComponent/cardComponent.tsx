import {
  redTheme,
  blueTheme,
  useThemeContext,
} from "../../../themes/ThemeContext";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { RootState } from "../../../redux/store";
import Typography from "@mui/material/Typography";
import { useStyles } from "./cardComponent.styles";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { ClassItem } from "../../../interfaces/class.interface";
import { useDeleteClass } from "../../../hooks/useClassMutation";
import { removeStudentInClass } from "../../../redux/studentsSlice";
import { ClassCardProps } from "../../../interfaces/student.interface";
import StudentsListInClass from "../studentsInClassList/studentsInClassList";

const ClassCard: React.FC<ClassCardProps> = ({
  className,
  classId,
  totalPlaces,
  students,
}) => {
  const classes = useStyles();
  const { isBlueTheme } = useThemeContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [seatsLeft, setSeatsLeft] = useState(totalPlaces);
  const dispatch = useDispatch();

  const { mutate: deleteClass } = useDeleteClass();

  const currentTheme = isBlueTheme ? blueTheme : redTheme;
  const iconColor = currentTheme.palette.primary.main;

  const classrooms: ClassItem[] = useSelector(
    (state: RootState) => state.classrooms.classesData
  );

  useEffect(() => {
    const numStudentsInClass =
      classrooms.find((classItem) => classItem.id === classId)?.students
        .length || 0;
    setSeatsLeft(totalPlaces - numStudentsInClass);
  }, [classrooms, classId, totalPlaces]);

  const handleDeleteClass = (classId: string) => {
    // Find the class to delete
    const classToDelete = classrooms.find(
      (classItem) => classItem.id === classId
    );

    if (classToDelete) {
      // Remove all students in the class
      classToDelete.students.forEach((studentItem) => {
        dispatch(removeStudentInClass(studentItem.id)); // Unassign student
      });
    }

    deleteClass(classId);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Card className={classes.card_style}>
        <CardContent>
          <Typography className={classes.title} variant="h6" component="div">
            {className}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className={classes.content}
          >
            {`There are ${seatsLeft} seats left`}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {`out of ${totalPlaces}`}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            className={classes.button}
            onClick={handleOpenDialog}
          >
            Students List
          </Button>
          <DeleteIcon
            onClick={() => handleDeleteClass(classId)}
            sx={{
              color: iconColor,
              cursor: "pointer",
            }}
          />
        </CardActions>
      </Card>

      <StudentsListInClass
        open={openDialog}
        onClose={handleCloseDialog}
        classId={classId}
        students={students}
      />
    </>
  );
};

export default ClassCard;
