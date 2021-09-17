import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    padding: theme.spacing(2, 2, 4, 2),
    height: "100vh",
  },
  mainContainer: {
    height: "100%",
    boxShadow: `${theme.spacing(0, 0, 0.5, 0.5)} #ddd`,
    borderRadius: theme.spacing(0.5),
    overflow: "hidden",
    backgroundColor: theme.palette.background.primary
  },
}));
