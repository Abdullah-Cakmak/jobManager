import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import jobsPriority from "../../../../enums/JobsPriority";
import { useState, useEffect } from "react";

export default function EditDialog(props) {
  const { onClose, open, dialogTitle, selectedJob, onEditJob, ...rest } = props;
  const [selectedPriority, setSelectedPriority] = useState(
    selectedJob.priority
  );
  const [jobPriorityOptions, setJobPriorityOptions] = useState([]);

  useEffect(() => {
    setJobPriorityOptions(
      Object.keys(jobsPriority)
        .map((key) => ({
          id: key,
          label: key,
          value: jobsPriority[key],
        }))
        .sort((a, b) => a.label.localeCompare(b.label))
    );
  }, []);

  return (
    <Dialog
      open={open || false}
      onClose={onClose}
      {...rest}
      maxWidth={"xs"}
      fullWidth
    >
      <Grid
        container
        direction="row"
        spacing={2}
        alignItems="center"
        alignContent="center"
        justifyContent="center"
      >
        <Grid item container xs={8} justifyContent="center">
          <DialogTitle>{dialogTitle}</DialogTitle>
        </Grid>
        <Grid item xs={8}>
          <TextField
            fullWidth
            value={selectedJob.name}
            disabled
            label={"Job Name"}
            onChange={(event) =>
              setJobName(event.target.value.replace(/\s/g, ""))
            }
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            select
            label={"Jobs Priority"}
            value={selectedPriority ? selectedPriority : selectedJob.priority}
            style={{ maxHeight: 100 }}
            onChange={(event) => {
              setSelectedPriority(event.target.value);
            }}
            variant="outlined"
            fullWidth
          >
            {jobPriorityOptions.map((option) => (
              <MenuItem key={option.id} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <DialogActions>
        <Button
          variant="contained"
          color="inherit"
          size="medium"
          fullWidth
          onClick={() => {
            onClose();
            setSelectedPriority(selectedJob.priority);
          }}
        >
          CANCEL
        </Button>
        <Button
          variant="contained"
          color="error"
          size="medium"
          fullWidth
          onClick={() => {
            onEditJob(selectedJob.id, selectedPriority);
            setSelectedPriority(selectedJob.priority);
            onClose();
          }}
        >
          SAVE
        </Button>
      </DialogActions>
    </Dialog>
  );
}
