import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/ErrorOutline";

export default function DeleteDialog(props) {
  const { onClose, message, open, onDeleteJob, selectedJob, ...rest } = props;

  return (
    <Dialog
      open={open || false}
      onClose={onClose}
      {...rest}
      contentText={message}
      maxWidth={"xs"}
      fullWidth
    >
      <DialogContent>
        <Grid item container spacing="10">
          <Grid item container xs={12} justifyContent="center">
            <DeleteIcon sx={{ color: "red", fontSize: 50 }} />
          </Grid>
          <Grid item container xs={12} justifyContent="center">
            <DialogContentText>{message}</DialogContentText>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Grid item container xs={12} justifyContent="center" spacing="10">
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="inherit"
              size="medium"
              fullWidth
              onClick={onClose}
            >
              CANCEL
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="error"
              size="medium"
              fullWidth
              onClick={() => {
                onDeleteJob(selectedJob.id);
                onClose();
              }}
            >
              APPROVE
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
