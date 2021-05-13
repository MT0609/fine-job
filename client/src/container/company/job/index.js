import React from "react";
import { Avatar, Box, Link, Grid, IconButton, Paper } from "@material-ui/core";
import { BookmarkBorder, Bookmark } from "@material-ui/icons";

function CompanyJobs({ company, onSave, onUnSave, user }) {
  const onSaveClick = (jobID) => {
    if (onSave) onSave(jobID);
  };

  const onUnSaveClick = (jobID) => {
    if (onUnSave) onUnSave(jobID);
  };

  return (
    <div>
      {company && company.jobs?.length ? (
        <Paper style={{ padding: "1rem" }}>
          <Box fontWeight="bold" fontSize={20} mb={2} textAlign="left">
            Posted jobs
          </Box>
          <Grid container spacing={1}>
            {company.jobs?.slice(0, 6).map((job, index) => (
              <Grid
                item
                key={job.id}
                xs={12}
                sm={4}
                style={{ position: "relative" }}
              >
                <Link
                  href={`/jobs/${job.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Paper
                    key={index}
                    style={{
                      padding: "1rem",
                      textAlign: "left",
                      height: "100%",
                    }}
                  >
                    <Box display="flex" justifyContent="space-between">
                      <Avatar
                        variant="square"
                        alt="company"
                        src={
                          company.avatar ||
                          "https://mcnewsmd1.keeng.net/netnews/archive/images/2020/07/20/tinngan_011115_916156142_0.jpg"
                        }
                      />
                    </Box>
                    <Box fontWeight="bold" fontSize={20} mt={2}>
                      {job.name}
                    </Box>
                    <p>{job.description}</p>
                  </Paper>
                </Link>

                {user.isAuth &&
                  (user.user?.savePosts?.some(
                    (item) => item.jobID === job.id
                  ) ? (
                    <IconButton
                      style={{
                        position: "absolute",
                        right: 5,
                        top: 10,
                        padding: "0.5rem",
                      }}
                      onClick={() => onUnSaveClick(job.id)}
                    >
                      <Bookmark />
                    </IconButton>
                  ) : (
                    <IconButton
                      style={{
                        position: "absolute",
                        right: 5,
                        top: 10,
                        padding: "0.5rem",
                      }}
                      onClick={() => onSaveClick(job.id)}
                    >
                      <BookmarkBorder />
                    </IconButton>
                  ))}
              </Grid>
            ))}
          </Grid>
        </Paper>
      ) : (
        <Paper
          style={{
            padding: "1rem",
            textAlign: "left",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          <Box>No Jobs Found</Box>
        </Paper>
      )}
    </div>
  );
}

export default CompanyJobs;
