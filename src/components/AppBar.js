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
    top: 30,
    zIndex: theme.zIndex.drawer + 2,
    height: 45,
    paddingLeft: 50,
    paddingRight: 50,
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
        <Grid item xs={12}>
          <Logo />
          <Typography variant="h6">JOB MANAGER</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider variant="fullWidth" className={classes.divider} />
        </Grid>
      </Grid>
    </div>
  );
}
