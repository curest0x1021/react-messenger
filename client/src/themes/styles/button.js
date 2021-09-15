import { makeStyles } from "@material-ui/styles";

export const useButtonStyles = makeStyles(theme => ({
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
