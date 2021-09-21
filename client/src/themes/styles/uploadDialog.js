import { makeStyles } from "@material-ui/styles"

export const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "row",
    paddingTop: theme.spacing(4),
    boxSizing: "border-box",
    width: "600px",
  },
  files: {
    marginLeft: theme.spacing(8),
    alignItems: "flex-start",
    justifyItems: "flex-start",
    flex: 1,
    overflowY: "auto",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(4),
    width: "100%",
  },
  iconClose: {
    marginLeft: "auto",
    marginRight: theme.spacing(2),
  },
  itemContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    height: "50px",
    padding: theme.spacing(2),
    overflow: "hidden",
    boxSizing: "border-box",
  },
  nameContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fileName: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.file,
  },
  checkIcon: {
    marginLeft: "auto",
    color: theme.palette.icon.success,
  },
  errorIcon: {
    marginLeft: "auto",
    color: theme.palette.icon.error,
  },
  progressbar: {
    width: "100%",
  },
  actions: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    padding: theme.spacing(6),
  },
  uploadButton: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2),
  },
  sendButton: {
    color: theme.palette.primary.main,
  },
}));
