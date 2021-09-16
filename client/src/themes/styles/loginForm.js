import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  topContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "80px",
    margin: "10px 30px"
  },
  label: {
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
  forgotButton: {
    color: theme.palette.primary.main,
    fontSize: "12px"
  },
  button: {
    background: theme.palette.background.primary,
    borderRadius: 3,
    border: 0,
    color: theme.palette.primary.main,
    height: 60,
    padding: "0 30px",
    "@media (max-width: 800px)": {
      padding: "0 10px",
    },
    boxShadow: `1px 1px 2px 2px ${theme.palette.shadow.primary}`,
  },
  buttonBlue: {
    background: theme.palette.primary.main,
    color: theme.palette.background.primary,
    height: 60,
    padding: "0px 50px",
    boxShadow: `1px 1px 2px 2px ${theme.palette.shadow.secondary}`,
  },
}));
