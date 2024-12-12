import React from "react";
import List from "@mui/material/List";
import Dialog from "@mui/material/Dialog";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import ListItemText from "@mui/material/ListItemText";
import { useStyles } from "./studentsInClassList.styles";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { blueTheme, redTheme, useThemeContext } from "../../../themes/ThemeContext";
import { useUnassignStudent } from "../../../hooks/useClassMutation";
import { StudentsListInClassProps } from "../../../interfaces/class.interface";


const StudentsListInClass: React.FC<StudentsListInClassProps> = ({
  open,
  onClose,
  students,
}) => {
  const { isBlueTheme } = useThemeContext();
  const classes = useStyles();

  const currentTheme = isBlueTheme ? blueTheme : redTheme;
  const iconColor = currentTheme.palette.primary.main;

  const { mutate: unassignStudent } = useUnassignStudent();

  const handleUnassignStudent = (studentId: string) => {
    unassignStudent(studentId);
    console.log("Unassigned student, current state:", students);
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        className: classes.dialog,
      }}
    >
      <DialogTitle className={classes.dialogTitle}>Class Students</DialogTitle>
      <List>
        {students? (
          students.map((student) => (
            <ListItem className={classes.listItem} key={student.id}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${student.firstName} ${student.lastName}`}
                primaryTypographyProps={{ className: classes.listItemText }}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleUnassignStudent(student.id)}
                sx={{
                  color: iconColor
                }}
              >
                <DeleteIcon className={classes.deleteIcon} />
              </IconButton>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText
              primary="This class is empty"
              primaryTypographyProps={{
                className: classes.emptyStateText,
              }}
            />
          </ListItem>
        )}
      </List>
    </Dialog>
  );
};

export default StudentsListInClass;
