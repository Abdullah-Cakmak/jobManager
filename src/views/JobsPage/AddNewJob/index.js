import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import jobsPriority from "../../../enums/JobsPriority";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Add";

export default function AddNewJob(props) {
  const { onAddJob } = props;
  const [jobName, setJobName] = useState("");
  const [jobPriority, setJobPriority] = useState("");
  const [jobPriorityOptions, setJobPriorityOptions] = useState([]);

  // getting jobs priority types from enums
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
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      alignContent="center"
      justifyContent="center"
      spacing={2}
    >
      <Grid item xs={12}>
        <Typography variant="h6">Create New Job</Typography>
      </Grid>
      <Grid item xs={7}>
        <TextField
          fullWidth
          value={jobName}
          label={"Job Name"}
          onChange={(event) => setJobName(event.target.value)}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          select
          label={"Jobs Priority"}
          value={jobPriority}
          style={{ maxHeight: 100 }}
          onChange={(event) => {
            setJobPriority(event.target.value);
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
      <Grid item xs={2}>
        <Button
          variant="contained"
          size="large"
          fullWidth
          disabled={!jobName || !jobPriority}
          style={{ height: 53 }}
          startIcon={<CreateIcon />}
          onClick={() => {
            console.log("On add job");
            onAddJob({
              name: jobName,
              priority: jobPriority,
            });
            setJobName("");
            setJobPriority("");
          }}
        >
          CREATE
        </Button>
      </Grid>
    </Grid>
  );
}
