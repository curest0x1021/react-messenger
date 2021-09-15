import { makeStyles } from "@material-ui/styles"

export const useStyles = makeStyles(theme => ({
  logoContainer: {
    // eslint-disable-next-line no-undef
    backgroundImage: 'url("http://localhost:3000/bg-img.png")',
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  logoOverlay: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: theme.palette.background.gradient,
    opacity: 0.85,
  },
  logoBubble: {
    width: "80px",
    height: "80px",
  },
  logoText: {
    margin: "50px 50px 150px 50px",
    color: theme.palette.text.logo,
    lineHeight: "50px",
  },
}));
