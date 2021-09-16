import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  topContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "80px",
    margin: theme.spacing(3, 8),
  },
  label: {
    color: theme.palette.text.placeholder,
    marginRight: theme.spacing(8),
    "@media (max-width: 420px)": {
      marginRight: theme.spacing(2),
    },
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    margin: theme.spacing(20, 25, 0, 25),
    "@media (max-width: 800px)": {
      margin: theme.spacing(20, 12, 0, 12),
    },
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(12),
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
    padding: theme.spacing(0, 8),
    "@media (max-width: 800px)": {
      padding: theme.spacing(0, 2),
    },
    boxShadow: `${theme.spacing(0.25, 0.25, 0.5, 0.5)} ${theme.palette.shadow.primary}`,
  },
  buttonBlue: {
    background: theme.palette.primary.main,
    color: theme.palette.background.primary,
    height: 60,
    padding: theme.spacing(0, 8),
    boxShadow: `${theme.spacing(0.25, 0.25, 0.5, 0.5)} ${theme.palette.shadow.secondary}`,
  },
}));
