import React from "react";
import { columns } from "./consts";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { RootState } from "../../../redux/store";
import TableContainer from "@mui/material/TableContainer";
import { useStyles } from "./listOfStudentsComponent.styles";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { IStudent } from "../../../interfaces/student.interface";
import { useDeleteStudent } from "../../../hooks/useClassMutation";
import { AssignToClass } from "../assignToClassComponent/assignToClassComponent";

const VirtuosoTableComponents: TableComponents<IStudent> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

const fixedHeaderContent = () => {
  const classes = useStyles();
  return (
    <TableRow className={classes.tableCellHeader}>
      {columns?.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          style={{ width: column.width }}
          className={classes.tableCellHeader}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
};

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
    <React.Fragment>
      {columns?.map((column) => {
        if (column.dataKey === "assign") {
          return (
            <TableCell key={column.dataKey} className={classes.tableCell}>
              {!row.classId && (
                <Button
                  className={classes.button}
                  variant="outlined"
                  onClick={() => handleClickOpen(row)}
                  disabled={!!row.classId}
                >
                  Assign to Class
                </Button>
              )}
            </TableCell>
          );
        }
        if (column.dataKey === "delete") {
          return (
            <TableCell key={column.dataKey} className={classes.tableCell}>
              <Button
                className={classes.button}
                variant="outlined"
                onClick={() => deleteStudent(row.id)}
              >
                Delete
              </Button>
            </TableCell>
          );
        }
        return (
          <TableCell key={column.dataKey} className={classes.tableCell}>
            {row[column.dataKey as keyof IStudent]}
          </TableCell>
        );
      })}
    </React.Fragment>
  );

  return (
    <>
      <Paper className={classes.paper}>
        <TableVirtuoso
          data={students}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
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
