import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import jobsPriority from "../../../../enums/JobsPriority";
import { useState, useEffect } from "react";

// Icon imports
// import IconDelete from "@material-ui/icons/DeleteOutline";

export default function EditDialog(props) {
  const { onClose, open, dialogTitle, selectedJob, onEditJob, ...rest } = props;
  const [selectedPriority, setSelectedPriority] = useState(
    selectedJob.priority || ""
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

  //Edit action on submit
  // const onSubmit = () => {

  // };

  return (
    <Dialog
      open={open || false}
      onClose={onClose}
      {...rest}
      maxWidth={"sm"}
      fullWidth
    >
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12}>
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
            value={selectedPriority}
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
            onEditJob(selectedJob.id, selectedPriority);
            onClose();
          }}
        >
          SAVE
        </Button>
      </DialogActions>
    </Dialog>
  );
}
