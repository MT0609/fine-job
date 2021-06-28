import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Avatar, Box, Grid, IconButton, Paper } from "@material-ui/core";
import { BookmarkBorder, Bookmark } from "@material-ui/icons";

function CompanyJobs({ company, onSave, onUnSave, user }) {
  const { t } = useTranslation();

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
            {t("company.postedJobs")}
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
                <Link to={`/jobs/${job.id}`}>
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
                          "https://res.cloudinary.com/dghvjalhh/image/upload/v1624787605/avatars/tckwkukf8gqfviv2oqkj.png"
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
          <Box>{t("company.noJobs")}</Box>
        </Paper>
      )}
    </div>
  );
}

export default CompanyJobs;
