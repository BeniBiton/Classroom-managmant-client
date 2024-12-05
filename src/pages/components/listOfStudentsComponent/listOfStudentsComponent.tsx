import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { useStyles } from "./listOfStudentsComponent.styles";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { ColumnData, IStudent } from "../../../interfaces/student.interface";
import { AssignToClass } from "../assignToClassComponent/assignToClassComponent";
import { useDeleteStudent } from "../../../hooks/useClassMutation";
import useFetchStudents from "../../../hooks/useFetchStudents";

const columns: ColumnData[] = [
  { width: 150, label: "ID", dataKey: "id" },
  { width: 120, label: "First Name", dataKey: "firstName" },
  { width: 120, label: "Last Name", dataKey: "lastName" },
  { width: 50, label: "Age", dataKey: "age", numeric: true },
  { width: 150, label: "Profession", dataKey: "profession" },
  { width: 150, label: "Assign", dataKey: "assign" },
  { width: 100, label: "Delete", dataKey: "delete" },
];

// TableVirtuoso Components
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

  const students = useFetchStudents();

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
