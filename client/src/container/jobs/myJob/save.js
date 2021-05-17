import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  Grid,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { MoreVert, FileCopy, BookmarkBorder } from "@material-ui/icons";
import styles from "./index.module.scss";

function SavedJobs(props) {
  const { savedJobs = [], onUnSave } = props;

  const [moreOpen, setMoreOpen] = useState(null);
  const open = Boolean(moreOpen);

  const handleClick = (event) => {
    setMoreOpen(event.currentTarget);
  };

  const handleClose = () => {
    setMoreOpen(null);
  };

  const handleCopyJobLink = () => {
    handleClose();
    navigator.clipboard.writeText(
      `${window.location.host}/jobs/${moreOpen.getAttribute("aria-controls")}`
    );
  };

  const handleUnSaveJob = () => {
    handleClose();
    if (onUnSave) onUnSave(moreOpen.getAttribute("aria-controls"));
  };

  return (
    <div>
      {savedJobs?.length ? (
        savedJobs.map((job) => (
          <div key={job.jobID}>
            <div className={`${styles["myjob__item"]}`}>
              <Grid container spacing={2} justify="space-between">
                <Grid item xs={9} sm={11} style={{ textAlign: "left" }}>
                  <Link
                    to={`/jobs/${job.jobID}`}
                    className={styles.myjob__name}
                  >
                    {job.name}
                  </Link>
                  <p>
                    <span>{job.job?.applicantCount} applicants</span> &#8227;{" "}
                    {job.status === "open" && (
                      <span
                        className={`${styles.myjob__status} ${styles["myjob__status--close"]}`}
                      >
                        {job.status}
                      </span>
                    )}
                  </p>
                  <p className={styles.talenthome__postday}>
                    Posted on {new Date(job.posted).toDateString()}
                  </p>
                </Grid>
                <Grid item>
                  <IconButton
                    aria-controls={job.jobID}
                    style={{ padding: 0 }}
                    onClick={handleClick}
                  >
                    <MoreVert />
                  </IconButton>
                  <Menu
                    id={job.jobID}
                    anchorEl={moreOpen}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    // getContentAnchorEl={null}
                    PaperProps={{
                      style: {
                        width: "20ch",
                      },
                    }}
                  >
                    <MenuItem onClick={handleCopyJobLink}>
                      <FileCopy style={{ marginRight: "1rem" }} /> Copy Link
                    </MenuItem>
                    <MenuItem onClick={handleUnSaveJob}>
                      <BookmarkBorder style={{ marginRight: "1rem" }} /> Unsave
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </div>
            <Divider />
          </div>
        ))
      ) : (
        <div className={`${styles["myjob__item"]}`}>
          <Typography>You have no saved jobs</Typography>
        </div>
      )}
    </div>
  );
}

export default SavedJobs;
