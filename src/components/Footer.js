import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Globals from "../assets/globals";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "@mui/material/Link";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textAlign: "right",
    color: "#424242",
    paddingRight: theme.spacing(1),
  },
  icon: {
    flexGrow: 1,
    textAlign: "left",
    fontSize: 36,
    color: "#F4CBB2",
    paddingLeft: theme.spacing(1),
  },
  link: {
    color: "#424242",
  },
  footer: {
    width: "100%",
    bottom: 0,
    zIndex: theme.zIndex.drawer + 2,
    height: 45,
    backgroundColor: "#e0e0e0",
    display: "block",
    position: "fixed",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Grid container direction="row" alignContent="center" alignItems="center">
        <Grid
          container
          item
          xs={6}
          justifyContent="flex-start"
          alignContent="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <GitHubIcon className={classes.icon} fontSize="large" />
          </Grid>
          <Grid item>
            <a
              href="https://github.com/Abdullah-Cakmak/jobManager"
              underline="always"
              className={classes.link}
              color="#424242"
            >
              {"repository"}
            </a>
          </Grid>
        </Grid>
        <Grid container item xs={6}>
          <Typography m={1} className={classes.title}>
            {Globals.Application.copyright}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
