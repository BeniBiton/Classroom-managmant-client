import { ColumnData } from "../../../interfaces/student.interface";

// fix: upperCase
export const columns: ColumnData[] = [
    { width: 150, label: "ID", dataKey: "id" },
    { width: 120, label: "First Name", dataKey: "firstName" },
    { width: 120, label: "Last Name", dataKey: "lastName" },
    { width: 50, label: "Age", dataKey: "age", numeric: true },
    { width: 150, label: "Profession", dataKey: "profession" },
    { width: 150, label: "Assign", dataKey: "assign" },
    { width: 100, label: "Delete", dataKey: "delete" },
  ];
  