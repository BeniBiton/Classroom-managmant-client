import {
  List,
  Avatar,
  Dialog,
  ListItem,
  IconButton,
  DialogTitle,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import {
  IStudent,
  SutdentsForClassProps,
} from "../../../interfaces/student.interface";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./assignToClassComponent.styles";
import { ClassItem } from "../../../interfaces/class.interface";
import { updateStudentClass } from "../../../redux/studentsSlice";
import { updateStudentByClass } from "../../../redux/classesSlice";
import { assignStudentToClass } from "../../../services/students.service";
import { School as SchoolIcon, Add as AddIcon } from "@mui/icons-material";

export const AssignToClass: React.FC<SutdentsForClassProps> = ({
  onClose,
  open,
  student,
}) => {
  const classrooms: ClassItem[] = useSelector(
    (state: RootState) => state.classrooms.classesData
  );
  const students = useSelector(
    (state: RootState) => state.students.studentsData
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  const calculateStudentsInClass = (classId: string) => {
    return (
      students?.filter((student) => student.classId === classId).length ?? 0
    );
  };

  const updateStudentInRedux = (student: IStudent, classId: string) => {
    dispatch(updateStudentClass({ studentId: student.id, classId }));
    dispatch(updateStudentByClass({ student: student, classId }));
  };

  const handleAssignStudentToClass = async (
    student: IStudent,
    classId: string
  ) => {
    try {
      await assignStudentToClass(student.id, classId);

      updateStudentInRedux(student, classId);

      onClose();
    } catch (error) {
      console.error("Error assigning student to class:", error);
    }
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle className={classes.dialog_text}>
        Available Classes
      </DialogTitle>
      <List>
        {classrooms?.map((classItem) => (
          <ListItem
            key={classItem.id}
            className={classes.class_item}
            disableGutters
          >
            <ListItemAvatar className={classes.list_item_avatar}>
              <Avatar>
                <SchoolIcon className={classes.schoolIcon} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={classItem.className} />
            <IconButton
              onClick={() => handleAssignStudentToClass(student, classItem.id)}
              color="primary"
              title="Assign student to class"
              disabled={
                classItem.totalPlaces -
                  calculateStudentsInClass(classItem.id) ===
                0
              }
            >
              <AddIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};
