import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Grid,
  Divider,
  Button,
  Paper,
  Typography,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add, Edit, RemoveCircle } from "@material-ui/icons";
import { getAllResume, createResume } from "../../actions/resumeActions";
import TitleFieldDialog from "../../components/resume/create/titleDialog";
import * as RESUMECONSTANTS from "./../../constants/resumeConstants";
import styles from "./index.module.scss";

function ResumeHomePage() {
  const resumeState = useSelector((state) => state.resume);
  const cvs = resumeState?.cvs;

  const [titleFieldDialogShow, setTitleFielDialogShow] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllResume());
  }, [dispatch]);

  const handleSubmitTitle = async (titleData) => {
    const result = await dispatch(createResume(titleData));

    if (result?.status === RESUMECONSTANTS.RESUME_CREATE_SUCCESS) {
      setTitleFielDialogShow(false);
      history.push(`/resume/${result.result.id}`);
    }
  };

  const useStyles = makeStyles({
    btnEdit: {
      color: "#0A66C2",
    },
    btnDelete: {
      color: "#FF4500",
    },
  });

  const classes = useStyles();

  return (
    <div>
      {cvs && cvs.length ? (
        <Container
          maxWidth="sm"
          style={{
            padding: "1rem",
            backgroundColor: "white",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Grid
            container
            justify="space-between"
            alignItems="center"
            style={{
              marginBottom: "1rem",
            }}
          >
            <Grid item>
              <Typography
                variant="h5"
                style={{ textAlign: "left", fontWeight: "bold" }}
              >
                Your CV
              </Typography>
            </Grid>
            <Grid item>
              <Button onClick={() => setTitleFielDialogShow(true)}>
                <Add />
                Create A Resume
              </Button>
              <TitleFieldDialog
                open={titleFieldDialogShow}
                onsubmit={handleSubmitTitle}
                onclose={() => setTitleFielDialogShow(false)}
              />
            </Grid>
          </Grid>

          <Divider />

          {cvs.map((cv) => (
            <div key={cv.id}>
              <div className={`${styles["cvhome__cv"]}`}>
                <Grid container spacing={2}>
                  <Grid item xs={7} style={{ textAlign: "left" }}>
                    <p className={styles.cvhome__cvtitle}>{cv.title}</p>
                    <p className={styles.cvhome__lastedit}>
                      Posted on {new Date(cv.lastEdited).toDateString()}
                    </p>
                  </Grid>
                  <Grid item xs style={{ textAlign: "right" }}>
                    <Link href={`/resume/${cv.id}`}>
                      <Button className={classes.btnEdit}>
                        <Edit />
                      </Button>
                    </Link>
                    <Button className={classes.btnDelete}>
                      <RemoveCircle />
                    </Button>
                  </Grid>
                </Grid>
              </div>
              <Divider />
            </div>
          ))}
        </Container>
      ) : (
        <Paper
          style={{ margin: "auto", width: "fit-content", padding: "2rem 4rem" }}
        >
          <Typography
            variant="h5"
            style={{ marginBottom: "1rem", color: "blue" }}
          >
            Your Resume List is Empty
          </Typography>
          <Button onClick={() => setTitleFielDialogShow((show) => !show)}>
            <Add />
            Create a Resume
          </Button>

          <TitleFieldDialog
            open={titleFieldDialogShow}
            onsubmit={handleSubmitTitle}
            onclose={() => setTitleFielDialogShow(false)}
          />
        </Paper>
      )}
    </div>
  );
}

export default ResumeHomePage;
