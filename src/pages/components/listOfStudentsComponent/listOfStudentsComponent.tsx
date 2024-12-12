import React from "react";
import { columns } from "./consts";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import TableCell from "@mui/material/TableCell";
import { RootState } from "../../../redux/store";
import { useStyles } from "./listOfStudentsComponent.styles";
import { TableVirtuoso } from "react-virtuoso";
import { IStudent } from "../../../interfaces/student.interface";
import { useDeleteStudent } from "../../../hooks/useClassMutation";
import { VirtuosoTableComponents } from "./renderTable/renderTable";
import { AssignToClass } from "../assignToClassComponent/assignToClassComponent";
import { HeaderContent } from "./headerContent/HeaderContent";
import { CellButton } from "./cellButton/CellButton";

const ListOfStudentsTable: React.FC = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState<IStudent | null>(
    null
  );
  const { mutate: deleteStudent } = useDeleteStudent();
  const classes = useStyles();

  const students = useSelector(
    (state: RootState) => state.students.studentsData
  );

  const handleClickOpen = (student: IStudent) => {
    setSelectedStudent(student);
    setOpenDialog(true);
  };

  const rowContent = (_index: number, row: IStudent) => (
    <>
      {columns?.map((column) => {
        if (column.dataKey === "assign") {
          const isAssigned = row.classId != null && row.classId !== "";
          return (
            <TableCell key={column.dataKey} className={classes.tableCell}>
              {<CellButton onClick={() => handleClickOpen(row)} disabled={isAssigned} buttonName={"Assign To Class"}></CellButton>}
            </TableCell>
          );
        }
        if (column.dataKey === "delete") {
          return (
            <TableCell key={column.dataKey} className={classes.tableCell}>
              {<CellButton onClick={() => deleteStudent(row.id)} disabled={false} buttonName={"Delete"}></CellButton>}
            </TableCell>
          );
        }
        return (
          <TableCell key={column.dataKey} className={classes.tableCell}>
            {row[column.dataKey as keyof IStudent]}
          </TableCell>
        );
      })}
    </>
  );

  return (
    <>
      <Paper className={classes.paper}>
        <TableVirtuoso
          data={students}
          components={VirtuosoTableComponents}
          fixedHeaderContent={HeaderContent}
          itemContent={rowContent}
        />
      </Paper>
      {selectedStudent && openDialog && (
        <AssignToClass
          student={selectedStudent}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        />
      )}
    </>
  );
};

export default ListOfStudentsTable;
