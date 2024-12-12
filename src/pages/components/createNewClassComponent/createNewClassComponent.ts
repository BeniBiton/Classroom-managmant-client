import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > :not(style)": {
            margin: "1rem",
            width: "300px",
        },
    },
}))