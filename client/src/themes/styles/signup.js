import { makeStyles } from "@material-ui/styles"

export const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    padding: "8px 8px 16px 8px",
    height: "100vh",
  },
  mainContainer: {
    height: "100%",
    boxShadow: "0px 0px 2px 2px #ddd",
    borderRadius: "2px",
    overflow: "hidden"
  },
}));
