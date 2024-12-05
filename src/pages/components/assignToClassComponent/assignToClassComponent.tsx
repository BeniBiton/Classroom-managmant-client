import React from "react";
import {
  Dialog,
  List,
  DialogTitle,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
} from "@mui/material";
import { School as SchoolIcon, Add as AddIcon } from "@mui/icons-material";
import {
  IStudent,
  SutdentsForClassProps,
} from "../../../interfaces/student.interface";
import { assignStudentToClass } from "../../../services/students.service";
import { useDispatch, useSelector } from "react-redux";
import { updateStudentClass } from "../../../redux/studentsSlice";
import useFetchStudents from "../../../hooks/useFetchStudents";
import { updateStudentByClass } from "../../../redux/classesSlice";
import { ClassItem } from "../../../interfaces/class.interface";
import { RootState } from "../../../redux/store";
import { useStyles } from "./assignToClassComponent.styles";

export const AssignToClass: React.FC<SutdentsForClassProps> = ({
  onClose,
  open,
  student,
}) => {
  const classrooms: ClassItem[] = useSelector(
    (state: RootState) => state.classrooms.classesData
  );
  const students = useFetchStudents();
  const dispatch = useDispatch();
  const classes = useStyles()

  const calculateStudentsInClass = (classId: string) => {
    return (
      students?.filter((student) => student.classId === classId).length ?? 0
    );
  };

  const handleClose = () => {
    onClose();
  };

  const handleAssignStudentToClass = async (
    student: IStudent,
    classId: string
  ) => {
    try {
      await assignStudentToClass(student.id, classId);

      dispatch(updateStudentClass({ studentId: student.id, classId }));
      dispatch(updateStudentByClass({ student: student, classId }));

      onClose();
    } catch (error) {
      console.error("Error assigning student to class:", error);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle className={classes.dialog_text}>Available Classes</DialogTitle>
      <List>
        {classrooms?.map((classItem) => (
          <ListItem key={classItem.id} className={classes.class_item} disableGutters>
            <ListItemAvatar className={classes.list_item_avatar}>
              <Avatar>
                <SchoolIcon className={classes.schoolIcon}/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={classItem.className}  />
            <IconButton
              onClick={() => handleAssignStudentToClass(student, classItem.id)}
              color="primary"
              title="Assign student to class"
              disabled={
                classItem.totalPlaces - calculateStudentsInClass(classItem.id)
                  ? false
                  : true
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
