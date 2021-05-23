import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid, Avatar, Divider } from "@material-ui/core";
import { LocationOn } from "@material-ui/icons";
import Pagination from "@material-ui/lab/Pagination";
import CircularLoading from "../../../components/loading/circular";
import { connectStatus } from "../../../utils/connectStatus";
import styles from "./index.module.scss";

function PeopleSearchResult(props) {
  const {
    people = [],
    totalPages,
    currentPage,
    onPageChange,
    loading = true,
  } = props;

  const auth = useSelector((state) => state.auth);

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
      <h3 className={styles.people__header}>People</h3>
      {!loading ? (
        people.length > 0 ? (
          <>
            {people.map((user) => (
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
                            "https://mcnewsmd1.keeng.net/netnews/archive/images/2020/07/20/tinngan_011115_916156142_0.jpg"
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
                        {user.connections.length} connections
                      </p>
                    </Grid>
                    <Grid item md style={{ textAlign: "right" }}>
                      {
                        // write component to show connect status
                      }
                      {/* {auth?.isAuth && (
                        <>
                          {connectStatus(auth.user, user) ===
                            "NOT_CONNECTED" && (
                            <button
                              className={`${styles["people__button"]} ${styles["people__button--blue"]}`}
                            >
                              Connect
                            </button>
                          )}
                          {connectStatus(auth.user, user) === "CONNECTED" && (
                            <button
                              className={`${styles["people__button"]} ${styles["people__button--gray"]}`}
                            >
                              Remove Connection
                            </button>
                          )}
                          {connectStatus(auth.user, user) ===
                            "PARTNER_WAIT_FOR_ACCEPT" && (
                            <Grid container spacing={1}>
                              <Grid item xs={6} md={12}>
                                <button
                                  className={`${styles["people__button"]} ${styles["people__button--blue"]}`}
                                >
                                  Accept
                                </button>
                              </Grid>
                              <Grid item md={12}>
                                <button
                                  className={`${styles["people__button"]} ${styles["people__button--gray"]}`}
                                >
                                  Ignore
                                </button>
                              </Grid>
                            </Grid>
                          )}
                          {connectStatus(auth.user, user) ===
                            "ME_WAIT_FOR_ACCEPT" && (
                            <button
                              className={`${styles["people__button"]} ${styles["people__button--gray"]} ${styles["people__button--disable"]}`}
                            >
                              Pending
                            </button>
                          )}
                        </>
                      )} */}
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
          <p>No Users Found</p>
        )
      ) : (
        <CircularLoading />
      )}
    </div>
  );
}

export default PeopleSearchResult;
