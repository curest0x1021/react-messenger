import { createTheme } from "@material-ui/core";

export const theme = createTheme({
  spacing: 4,
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontFamily: "Montserrat, sans-serif",
      fontWeight: "bold"
    }
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "bold"
      }
    },
    MuiFormControl: {
      fullWidth: {
        marginTop: "30px"
      }
    }
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#B0B0B0" },
    background: {
      main: "#F5F5F5",
      primary: "#FFF",
      secondary: "#F5F5F5",
      secondary2: "#FFF",
      input: "#F5F5F5",
      dialog: "#FFF",
      disabled: "#E2E2E2",
      hover: "#E5E5E5",
      overlay: "rgba(0,0,0,0.6)",
      gradient: "linear-gradient(#3A8DFF, #86B9FF)",
      highlight: "rgb(188, 185, 236)",
    },
    shadow: {
      primary: "rgba(185, 185, 185, .3)",
      secondary: "rgba(33, 203, 243, .3)"
    },
    border: {
      primary: "rgb(187, 186, 186)",
    },
    text: {
      primary: "#000",
      secondary: "#666",
      disabled: "#B2B2B2",
      placeholder: "#B8B8B8",
      title: "#787A97",
      logo: "#fff",
      file: "#555",
    },
  },
});
