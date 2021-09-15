import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    padding: "8px 8px 16px 8px",
    height: "100vh",
  },
  mainContainer: {
    height: "100%",
    boxShadow: "0px 0px 2px 2px #ddd",
    borderRadius: "2px",
    overflow: "hidden",
    backgroundColor: theme.palette.background.primary
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "80px",
    margin: "10px 30px"
  },
  loginLabel: {
    color: theme.palette.text.placeholder,
    marginRight: "32px",
    "@media (max-width: 420px)": {
      marginRight: "8px"
    },
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    margin: "80px 100px 0 100px",
    "@media (max-width: 800px)": {
      margin: "80px 50px 0 50px"
    },
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50px",
  },
}));
