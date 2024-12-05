import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useStyles } from "./cardComponent.styles";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useThemeContext,
  redTheme,
  blueTheme,
} from "../../../themes/ThemeContext";
import { StudentCardProps } from "../../../interfaces/student.interface";
import StudentsListInClass from "../studentsInClassList/studentsInClassList";
import { useDeleteClass } from "../../../hooks/useClassMutation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ClassItem } from "../../../interfaces/class.interface";
import { removeStudentInClass } from "../../../redux/studentsSlice";

const StudentCard: React.FC<StudentCardProps> = ({
  className,
  classId,
  totalPlaces,
  students,
}) => {
  const classes = useStyles();
  const { isBlueTheme } = useThemeContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [seatsLeft, setSeatsLeft] = useState(totalPlaces); 
  const dispatch = useDispatch()

  const { mutate: deleteClass } = useDeleteClass();

  const currentTheme = isBlueTheme ? blueTheme : redTheme;
  const iconColor = currentTheme.palette.primary.main;

  const classrooms: ClassItem[] = useSelector(
    (state: RootState) => state.classrooms.classesData
  );

  useEffect(() => {
    const numStudentsInClass =
      classrooms.find((classItem) => classItem.id === classId)?.students.length ||
      0;
    setSeatsLeft(totalPlaces - numStudentsInClass);
  }, [classrooms, classId, totalPlaces]);

  const handleDeleteClass = (classId: string) => {
    classrooms.map((classItem) => {
      if(classItem.id === classId) {
        classItem.students.map((studentItem) => {
          dispatch(removeStudentInClass(studentItem.id))
        })
      }
    })
    deleteClass(classId)
  }
  
  


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

export default StudentCard;
