import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  Grid,
  Avatar,
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { LocationOn, MoreVert, FileCopy } from "@material-ui/icons";
import styles from "./index.module.scss";

function SavedJobs(props) {
  const { appliedJobs = [] } = props;

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

  return (
    <div>
      {appliedJobs?.length ? (
        appliedJobs.map((job) => (
          <div key={job.jobID}>
            <div className={`${styles["myjob__item"]}`}>
              <Grid container spacing={2}>
                <Grid item>
                  <Link
                    to={`/company/${job.company.id}`}
                    className={styles.myjob__name}
                  >
                    <Avatar
                      alt={job.company.name}
                      src={
                        job.company?.avatar ||
                        "https://media-exp1.licdn.com/dms/image/C560BAQFVx7L2Y-Fz2w/company-logo_100_100/0/1541176107679?e=1629936000&v=beta&t=IUlcJ4VAEdQ6ZXuR6vi_JXbM1nPQZdf0AlFdCJT2r_o"
                      }
                    />
                  </Link>
                </Grid>
                <Grid item md={9}>
                  <Link
                    to={`/jobs/${job.id}`}
                    style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                  >
                    {job.name}
                  </Link>
                  <br />
                  <Link to={`/company/${job.company.id}`}>
                    {job.company.name}
                  </Link>
                  <Box display="flex">
                    <LocationOn />
                    <div>
                      {job.locations.map((location, index) => (
                        <p key={index}>{location}</p>
                      ))}
                    </div>
                  </Box>
                  <p className={styles.myjob__postday}>
                    Applied on {new Date(job.createdAt).toDateString()}
                  </p>
                </Grid>
                <Grid item md style={{ textAlign: "right" }}>
                  <IconButton
                    aria-controls={job.id}
                    style={{ padding: "0.5rem" }}
                    onClick={handleClick}
                  >
                    <MoreVert />
                  </IconButton>
                  <Menu
                    id={job.id}
                    anchorEl={moreOpen}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        width: "20ch",
                      },
                    }}
                  >
                    <MenuItem onClick={handleCopyJobLink}>
                      <FileCopy style={{ marginRight: "1rem" }} /> Copy Link
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
          <Typography>You have no applied jobs</Typography>
        </div>
      )}
    </div>
  );
}

export default SavedJobs;
