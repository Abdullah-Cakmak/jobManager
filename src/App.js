import { useState, useEffect, useCallback } from "react";
import AddNewJob from "./views/JobsPage/AddNewJob";
import JobList from "./views/JobsPage/JobList";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AppBar from "./components/AppBar";
import Footer from "./components/Footer";
import { Fragment } from "react";
import { STORE_KEY_JOB_LIST } from "./constants";
import { v4 as uuidv4 } from "uuid";
import JobsPriority from "./enums/JobsPriority";

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: 140,
    marginBottom: 50,
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: theme.spacing(-1),
    // marginRight: theme.spacing(-1),
    display: "flex",
    padding: theme.spacing(2, 4, 2, 4),
  },
}));

export default function App() {
  const classes = useStyles();
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    let storedJobListJSON = window.localStorage.getItem(STORE_KEY_JOB_LIST);
    let storedJobList = storedJobListJSON ? JSON.parse(storedJobListJSON) : [];
    setJobList(storedJobList);
  }, []);

  const onAddJob = useCallback((job) => {
    job.id = uuidv4();
    jobList.push(job);
    setJobList([...jobList]);
    window.localStorage.setItem(STORE_KEY_JOB_LIST, JSON.stringify(jobList));
  });

  const onEditJob = useCallback((jobID, priority) => {
    let jobToEdit = jobList.find((item) => item.id === jobID);
    jobToEdit.priority = priority;
    setJobList([...jobList]);
    window.localStorage.setItem(STORE_KEY_JOB_LIST, JSON.stringify(jobList));
  });

  const onDeleteJob = useCallback((jobID) => {
    let jobIndexToDelete = jobList.findIndex((item) => item.id === jobID);
    if (jobIndexToDelete > -1) {
      jobList.splice(jobIndexToDelete, 1);
    }
    setJobList([...jobList]);
    window.localStorage.setItem(STORE_KEY_JOB_LIST, JSON.stringify(jobList));
  });

  useEffect(() => {
    console.log(jobList);
  }, [jobList]);

  return (
    <Fragment>
      <AppBar />
      <main className={classes.content}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          alignContent="flex-start"
          spacing={2}
        >
          <Grid item xs={12}>
            <AddNewJob onAddJob={onAddJob} />
          </Grid>
          <Grid item xs={12}>
            <JobList
              jobList={jobList}
              onEditJob={onEditJob}
              onDeleteJob={onDeleteJob}
            />
          </Grid>
        </Grid>
      </main>
      <Footer />
    </Fragment>
  );
}
