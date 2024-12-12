import { TableCell, TableRow } from "@mui/material";
import { useStyles } from "../listOfStudentsComponent.styles";
import { columns } from "../consts";



export const HeaderContent = () => {
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