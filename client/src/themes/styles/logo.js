import { makeStyles } from "@material-ui/styles"

export const useStyles = makeStyles(() => ({
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
    background: "linear-gradient(#3A8DFF, #86B9FF)",
    opacity: 0.85,
  },
  logoBubble: {
    width: "80px",
    height: "80px",
  },
  logoText: {
    margin: "50px 30px 150px 30px",
    color: "#fff",
  }
}));
