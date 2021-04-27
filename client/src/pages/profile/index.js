import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { Edit, LocationOn } from "@material-ui/icons";
import { getProfileData, updateUser } from "../../actions/userActions";
import { getUserData } from "../../actions/authActions";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import styles from "./index.module.scss";
import ProfileUpdate from "../../container/profile/update";

function Profile() {
  const { id } = useParams();

  const userID = jwt_decode(
    localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN)
  )?.sub;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileData(id));
  }, [id, dispatch]);

  const userState = useSelector((state) => state.user);
  const user = userState.user;

  const [profileUpdateShow, setProfileUpdateShow] = useState(false);

  const handleUpdate = async (data) => {
    const result = await dispatch(updateUser(data));
    if (result?.result) {
      setProfileUpdateShow(false);
      dispatch(getUserData());
    }
  };

  return (
    <div className={styles.profile__container}>
      {user && (
        <>
          <section
            className={`${styles["profile__section"]} ${styles["profile__section--head"]}`}
          >
            <div className={styles.profile__avatars}>
              <img
                className={styles["profile__avatars--background"]}
                src={
                  user.backgroundAvt ||
                  "https://media-exp1.licdn.com/dms/image/C4E1BAQFcckDwSlhOVg/company-background_10000/0/1579811796958?e=1619514000&v=beta&t=HhCwqCKBhQCfsuCfOmDZWPaIvLNCGxU21jFtPurCp6o"
                }
                alt="background"
              />
              <img
                className={styles["profile__avatars--avatar"]}
                src={
                  user.avatar ||
                  "https://media-exp1.licdn.com/dms/image/C560BAQGVFcyITngckQ/company-logo_200_200/0/1612233454537?e=1626912000&v=beta&t=F2DRY0utOedLtfpaxyI_pA2N2OMop9-dmFCgZD3rsEw"
                }
                alt="avatar"
              />
            </div>
            <div className={styles.profile__intro}>
              <Grid container alignItems="flex-start">
                <Grid item xs={12} md={7}>
                  <Typography variant="h5">
                    {user.baseInfo?.firstName} {user.baseInfo?.lastName}
                  </Typography>

                  <p>{user.headLine}</p>

                  {user.baseInfo?.location && (
                    <Box display="flex">
                      <LocationOn fontSize="small" />{" "}
                      {user.baseInfo?.location || "fsdkjdkfjs"}
                    </Box>
                  )}

                  <p className={styles.profile__basicInfoSpan}>
                    {user.contact?.email && (
                      <span>Email: {user.contact?.email}</span>
                    )}
                    {user.contact?.phone && (
                      <span>Phone: {user.contact?.phone}</span>
                    )}
                  </p>

                  <p className={styles.profile__basicInfoSpan}>
                    {user.baseInfo?.dob && (
                      <span>
                        Birthday:{" "}
                        {new Date(user.baseInfo?.dob).toLocaleDateString()}
                      </span>
                    )}
                  </p>

                  <Button
                    style={{
                      marginTop: "1rem",
                      padding: "0.3rem 1rem",
                      border: "1px solid #5E5E5E",
                      borderRadius: "20px",
                    }}
                    href="/resume"
                  >
                    Resume Collection
                  </Button>
                </Grid>

                <Grid item xs md style={{ textAlign: "right" }}>
                  {id === userID && (
                    <>
                      <Button onClick={() => setProfileUpdateShow(true)}>
                        <Edit />
                      </Button>

                      <ProfileUpdate
                        data={user}
                        show={profileUpdateShow}
                        onclose={() => setProfileUpdateShow(false)}
                        onsubmit={handleUpdate}
                      />
                    </>
                  )}

                  {user.baseInfo?.education.map((edu, index) => (
                    <p key={index}>{edu}</p>
                  ))}
                </Grid>
              </Grid>
            </div>
          </section>

          <section className={styles.profile__section}>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography variant="h5">About</Typography>
              </Grid>
              <Grid item>
                {id === userID && (
                  <>
                    <Button>
                      <Edit />
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
            <p>{user.about}</p>
          </section>

          <section className={styles.profile__section}>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography variant="h5">Education</Typography>
              </Grid>
              <Grid item>
                {id === userID && (
                  <>
                    <Button>
                      <Edit />
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
            {user.baseInfo?.education.map((education, index) => (
              <p>{education}</p>
            ))}
          </section>

          <section className={styles.profile__section}>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography variant="h5">Skills</Typography>
              </Grid>
              <Grid item>
                {id === userID && (
                  <>
                    <Button>
                      <Edit />
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>

            <GridList cols={3} spacing={10}>
              {user.skill.map((skill, index) => (
                <GridListTile style={{ height: "fit-content" }} key={index}>
                  <p>{skill}</p>
                </GridListTile>
              ))}
            </GridList>
          </section>
        </>
      )}
    </div>
  );
}

export default Profile;
