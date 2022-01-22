import { Grid, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";
import Logo from "./Logo";

const useStyles = makeStyles((theme) => ({
  divider: {
    height: 2,
    borderRadius: "3px",
  },
  appBar: {
    width: "100%",
    top: 0,
    zIndex: theme.zIndex.drawer + 2,
    height: 45,
    paddingLeft: 30,
    paddingRight: 30,
    display: "block",
    position: "absolute",
  },
}));

export default function AppBar() {
  const classes = useStyles();
  return (
    <div className={classes.appBar}>
      <Grid
        container
        justifyContent="flex-start"
        spacing="4"
        style={{ paddingTop: 26 }}
      >
        <Grid item container xs={12} alignItems="center">
          <Grid item xs={1} justifyContent="flex-start">
            <Logo />
          </Grid>
          {/* <Grid item xs={11} justifyContent="flex-start">
            <Typography color="primary" variant="h5">
              JOB MANAGER
            </Typography>
          </Grid> */}
        </Grid>
        <Grid item xs={12}>
          <Divider
            variant="fullWidth"
            className={classes.divider}
            style={{ paddingTop: 16 }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
