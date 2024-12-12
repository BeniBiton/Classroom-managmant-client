import { Button } from "@mui/material";
import { useStyles } from "../listOfStudentsComponent.styles";

interface CellButtonProps {
  buttonName: string;
  onClick: () => void;
  disabled: boolean;
}

export const CellButton = ({
  onClick,
  disabled,
  buttonName,
}: CellButtonProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      disabled={disabled}
      className={classes.button}
    >
      {buttonName}
    </Button>
  );
};
