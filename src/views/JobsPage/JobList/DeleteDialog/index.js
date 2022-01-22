import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";

export default function DeleteDialog(props) {
  const { onClose, message, open, onDeleteJob, selectedJob, ...rest } = props;

  return (
    <Dialog
      open={open || false}
      onClose={onClose}
      {...rest}
      contentText={message}
      maxWidth={"sm"}
      fullWidth
    >
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12}>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {message}
            </DialogContentText>
          </DialogContent>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <DialogActions>
          <Button
            variant="contained"
            color="inherit"
            size="medium"
            fullWidth
            onClick={onClose}
          >
            CANCEL
          </Button>
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
            DELETE
          </Button>
        </DialogActions>
      </Grid>
    </Dialog>
  );
}
