import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import jobsPriority from "../../../enums/JobsPriority";
import { useState, useEffect, useCallback } from "react";
import { Typography } from "@mui/material";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import JobsPriority from "../../../enums/JobsPriority";
// import SearchIcon from "@mui/icons-material/Search";

const getJobPriorityColor = (job) => {
  switch (job.priority) {
    case jobsPriority.URGENT: {
      return "error";
    }
    case jobsPriority.TRIVIAL: {
      return "info";
    }
    case jobsPriority.REGULAR: {
      return "warning";
    }
  }
};

const orderJobList = (jobList) => {
  jobList.sort(function (j1, j2) {
    if (j1.priority === j2.priority) {
      return j1.name.localeCompare(j2.name);
    } else {
      if (j1.priority === JobsPriority.URGENT) {
        return -1;
      } else if (j2.priority === JobsPriority.URGENT) {
        return 1;
      } else if (j1.priority === JobsPriority.REGULAR) {
        return -1;
      } else if (j2.priority === JobsPriority.REGULAR) {
        return 1;
      } else return 0;
    }
  });
  return jobList;
};

export default function JobList(props) {
  const { jobList, onEditJob, onDeleteJob } = props;
  const [search, setSearch] = useState("");
  const [jobPriority, setJobPriority] = useState("ALL");
  const [jobPriorityOptions, setJobPriorityOptions] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});
  const [filteredJobList, setFilteredJobList] = useState(jobList);

  //filter jobList when search text changes
  useEffect(() => {
    let filteredResult = jobList;
    if (search && search.trim()) {
      let searchLower = search.toLocaleLowerCase();
      filteredResult = filteredResult.filter((item) =>
        item.name.toLocaleLowerCase().includes(searchLower)
      );
    }
    if (jobPriority !== "ALL") {
      filteredResult = filteredResult.filter(
        (item) => item.priority === jobPriority
      );
    }
    setFilteredJobList(orderJobList(filteredResult));
  }, [search, jobList, jobPriority]);

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
      direction="column"
      justify="center"
      alignItems="center"
      alignContent="center"
      justifyContent="center"
      spacing={2}
      // style={{ minHeight: "calc(65vh)" }}
    >
      <Grid item container direction="row">
        <Grid item container xs={6} justifyContent="flex-start">
          <Typography variant="h6">Job List</Typography>
        </Grid>
        <Grid item container xs={6} justifyContent="flex-end">
          <Typography variant="body2">
            {filteredJobList.length + "/" + jobList.length}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container direction="row" spacing={2}>
        <Grid item container xs={7} justifyContent="flex-start">
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={search}
            label={"Job Name"}
            placeholder={"Job Name"}
            onChange={(event) =>
              setSearch(event.target.value.replace(/\s/g, ""))
            }
          />
        </Grid>
        <Grid item container xs={5} justifyContent="flex-end">
          <TextField
            select
            label={"Jobs Priority"}
            value={jobPriority}
            //   disabled={generalInfoReadOnly}
            style={{ maxHeight: 100 }}
            onChange={(event) => {
              setJobPriority(event.target.value);
            }}
            variant="outlined"
            fullWidth
          >
            <MenuItem key={"ALL"} value={"ALL"}>
              {"ALL"}
            </MenuItem>
            {jobPriorityOptions.map((option) => (
              <MenuItem key={option.id} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid item container direction="row">
        <Grid item container xs={8} justifyContent="flex-start">
          <Typography variant="body1">Name</Typography>
        </Grid>
        <Grid item container xs={2} justifyContent="flex-start">
          <Typography variant="body1">Priority</Typography>
        </Grid>
        <Grid item container xs={2} justifyContent="flex-end">
          <Typography variant="body1">Action</Typography>
        </Grid>
      </Grid>

      {filteredJobList.map((job) => {
        return (
          <Grid item key={job.id} container direction="row">
            <Grid item container direction="row">
              <Grid item container xs={8} justifyContent="flex-start">
                <Typography variant="body1">{job.name}</Typography>
              </Grid>
              <Grid item container xs={2} justifyContent="flex-start">
                <Chip
                  label={job.priority}
                  variant="filled"
                  color={getJobPriorityColor(job)}
                />
              </Grid>
              <Grid item container xs={2} justifyContent="flex-end">
                <IconButton
                  onClick={() => {
                    setOpenEditDialog(true);
                    setSelectedJob(job);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setOpenDeleteDialog(true);
                    setSelectedJob(job);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
      <EditDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        onEditJob={onEditJob}
        selectedJob={selectedJob}
        dialogTitle={"Edit Dialog"}
      />
      <DeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onDeleteJob={onDeleteJob}
        selectedJob={selectedJob}
        message={"Are you sure you want to delete it?"}
      />
    </Grid>
  );
}
