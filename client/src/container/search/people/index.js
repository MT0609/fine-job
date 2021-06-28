import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Grid, Avatar, Tooltip, Button, Divider } from "@material-ui/core";
import { LocationOn, RemoveCircle } from "@material-ui/icons";
import Pagination from "@material-ui/lab/Pagination";
import CircularLoading from "../../../components/loading/circular";
import * as userActions from "../../../actions/userActions";
import styles from "./index.module.scss";

function PeopleSearchResult(props) {
  const {
    people = [],
    totalPages,
    currentPage,
    onPageChange,
    loading = true,
  } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const [connectStatusList, setConnectStatusList] = useState([]);
  useEffect(() => {
    async function getConnectStatusList() {
      let connectionStatusList = [];
      if (people.length > 0) {
        connectionStatusList = await Promise.all(
          people.map((user) => {
            if (user.id === auth.user?.id) return { type: "" };
            return dispatch(userActions.getConnectionStatus(user.id))
              .then((result) => {
                return result.result;
              })
              .catch((err) => {
                console.log(err);
                return { type: "" };
              });
          })
        );
      }
      return connectionStatusList;
    }

    auth.isAuth &&
      getConnectStatusList().then((result) => setConnectStatusList(result));
  }, [people, auth.isAuth]);

  const handleSendConnection = (connectionListIndex, userID) => {
    if (userID === auth.user?.id) return;
    dispatch(userActions.sendConnReq(userID)).then((result) => {
      let newConnectStatusList = [...connectStatusList];
      newConnectStatusList[connectionListIndex] = result.result;
      setConnectStatusList(newConnectStatusList);
    });
  };

  const handleAcceptFriend = (connectionListIndex, userID) => {
    if (userID === auth.user?.id) return;
    dispatch(userActions.acceptConnReq(userID)).then((result) => {
      let newConnectStatusList = [...connectStatusList];
      newConnectStatusList[connectionListIndex] = result.result;
      setConnectStatusList(newConnectStatusList);
    });
  };

  const handleIgnore = (connectionListIndex, userID) => {
    if (userID === auth.user?.id) return;
    dispatch(userActions.deleteConnReq(userID)).then((result) => {
      let newConnectStatusList = [...connectStatusList];
      newConnectStatusList[connectionListIndex] = result.result;
      setConnectStatusList(newConnectStatusList);
    });
  };

  const handleDeleteFriend = (connectionListIndex, userID) => {
    if (userID === auth.user?.id) return;
    dispatch(userActions.deleteFriend(userID)).then((result) => {
      let newConnectStatusList = [...connectStatusList];
      newConnectStatusList[connectionListIndex] = result.result;
      setConnectStatusList(newConnectStatusList);
    });
  };

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current; // Return previous value (happens before update in useEffect above)
  };
  const prevPage = usePrevious(currentPage);

  const handlePageChange = (e, value) => {
    if (onPageChange && prevPage !== value) onPageChange(value);
  };

  return (
    <div className={styles.people__container}>
      <h3 className={styles.people__header}>{t("people.people")}</h3>
      {!loading ? (
        people.length > 0 ? (
          <>
            {people.map((user, index) => (
              <div key={user.id} className={styles.people__item}>
                <div>
                  <Grid
                    container
                    style={{ textAlign: "left", marginBottom: "1rem" }}
                    justify="flex-start"
                    spacing={2}
                  >
                    <Grid item>
                      <Link to={`/profile/${user.id}`}>
                        <Avatar
                          alt="Company"
                          src={
                            user.avatar ||
                            "https://res.cloudinary.com/dghvjalhh/image/upload/v1618850154/avatars/sxqvw0io5dmkg4apx30d.jpg"
                          }
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={9} md={8} lg={9}>
                      <Link
                        style={{
                          lineHeight: 1,
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                        }}
                        to={`/profile/${user.id}`}
                      >
                        {user.baseInfo.firstName} {user.baseInfo.lastName}
                      </Link>
                      <p>{user.baseInfo.headLine}</p>
                      <p className={styles.people__location}>
                        <LocationOn fontSize="small" />
                        <span>{user.baseInfo.locations || "Location"}</span>
                      </p>
                      <p className={styles.people__connections}>
                        {t("people.friendNumber", {
                          number: user.connections.length,
                        })}
                      </p>
                    </Grid>
                    <Grid item md style={{ textAlign: "right" }}>
                      {auth?.isAuth && (
                        <>
                          {connectStatusList[index]?.type === "noConn" && (
                            <button
                              className={`${styles["people__button"]} ${styles["people__button--blue"]}`}
                              onClick={() =>
                                handleSendConnection(index, user.id)
                              }
                            >
                              {t("people.connect")}
                            </button>
                          )}
                          {connectStatusList[index]?.type === "friend" && (
                            <Tooltip
                              title={t("people.remove")}
                              placement="bottom"
                            >
                              <Button
                                onClick={() =>
                                  handleDeleteFriend(index, user.id)
                                }
                                className={`${styles["people__button"]}`}
                              >
                                <RemoveCircle />
                              </Button>
                            </Tooltip>
                          )}
                          {connectStatusList[index]?.type ===
                            "waitForRespond" && (
                            <Grid container spacing={1}>
                              <Grid item xs={6} md={12}>
                                <button
                                  className={`${styles["people__button"]} ${styles["people__button--blue"]}`}
                                  onClick={() =>
                                    handleAcceptFriend(index, user.id)
                                  }
                                >
                                  {t("people.accept")}
                                </button>
                              </Grid>
                              <Grid item md={12}>
                                <button
                                  className={`${styles["people__button"]} ${styles["people__button--gray"]}`}
                                  onClick={() => handleIgnore(index, user.id)}
                                >
                                  {t("people.ignore")}
                                </button>
                              </Grid>
                            </Grid>
                          )}
                          {connectStatusList[index]?.type === "connSent" && (
                            <button
                              className={`${styles["people__button"]} ${styles["people__button--gray"]} ${styles["people__button--disable"]}`}
                            >
                              {t("people.pending")}
                            </button>
                          )}
                        </>
                      )}
                    </Grid>
                  </Grid>
                </div>
                <Divider />
              </div>
            ))}

            {totalPages > 0 && (
              <>
                <Pagination
                  className={styles.people__pagination}
                  color="primary"
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </>
            )}
          </>
        ) : (
          <p> {t("people.noUser")}</p>
        )
      ) : (
        <CircularLoading />
      )}
    </div>
  );
}

export default PeopleSearchResult;
