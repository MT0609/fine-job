import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Divider, Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import CircularLoading from "../../../components/loading/circular";
import {
  followCompany,
  UnFollowCompany,
} from "./../../../actions/companyActions";
import * as COMPANYCONSTANTS from "../../../constants/companyConstants";
import styles from "./index.module.scss";

function CompaniesSearchResult(props) {
  const {
    companies = [],
    totalPages,
    currentPage,
    onPageChange,
    loading = true,
  } = props;

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // list of followed company, used for set following, unfollow button without re-render
  const [followedIDs, setFollowedIDs] = useState([]);
  const [unFollowedIDs, setUnFollowedIDs] = useState([]);

  const handleFollowCompany = (id) => {
    dispatch(followCompany(id)).then((res) => {
      if (res === COMPANYCONSTANTS.C0MPANY_FOLLOW_ONE_SUCCESS) {
        const newFollowedIDs = [...followedIDs, id];
        setFollowedIDs([...new Set(newFollowedIDs)]);

        let newUnFollowedIDs = [...unFollowedIDs];
        newUnFollowedIDs = newUnFollowedIDs.filter((item) => item !== id);
        setUnFollowedIDs(newUnFollowedIDs);
      }
    });
  };

  const handleUnFollowCompany = (id) => {
    dispatch(UnFollowCompany(id)).then((res) => {
      if (res === COMPANYCONSTANTS.C0MPANY_UNFOLLOW_ONE_SUCCESS) {
        let newFollowedIDs = [...followedIDs];
        newFollowedIDs = newFollowedIDs.filter((item) => item !== id);
        setFollowedIDs(newFollowedIDs);

        const newUnFollowedIDs = [...unFollowedIDs, id];
        setUnFollowedIDs([...new Set(newUnFollowedIDs)]);
      }
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
    <div className={styles.companies__container}>
      <h3 className={styles.companies__header}>Companies</h3>
      {!loading ? (
        companies.length > 0 ? (
          <>
            {companies.map((company) => (
              <div key={company.id} className={styles.companies__item}>
                <div>
                  <Grid
                    container
                    style={{ textAlign: "left", marginBottom: "1rem" }}
                    justify="flex-start"
                    spacing={2}
                  >
                    <Grid item>
                      <Link to={`/company/${company.id}`}>
                        <Avatar
                          variant="square"
                          alt="Company"
                          src={
                            company.avatar ||
                            "https://mcnewsmd1.keeng.net/netnews/archive/images/2020/07/20/tinngan_011115_916156142_0.jpg"
                          }
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={9} sm={7} lg={9}>
                      <Link
                        style={{
                          lineHeight: 1,
                          fontWeight: "bold",
                          color: "black",
                          fontSize: "1.1rem",
                          textDecoration: "none",
                        }}
                        to={`/company/${company.id}`}
                      >
                        {company.name}
                      </Link>
                      <p>{company.industry}</p>
                      <p>{company.followers?.length} followers</p>
                    </Grid>

                    <Grid item md style={{ textAlign: "right" }}>
                      {auth?.isAuth &&
                        ((followedIDs.includes(company.id) ||
                          company.followers?.some(
                            (follower) => follower.userID === auth.user?.id
                          )) &&
                        (!unFollowedIDs.includes(company.id) ||
                          !company.followers?.some(
                            (follower) => follower.userID === auth.user?.id
                          )) ? (
                          <button
                            className={`${styles.companies__button} ${styles["companies__button--gray"]}`}
                            onClick={() => handleUnFollowCompany(company.id)}
                          >
                            Following
                          </button>
                        ) : (
                          <button
                            className={`${styles.companies__button} ${styles["companies__button--blue"]}`}
                            onClick={() => handleFollowCompany(company.id)}
                          >
                            Follow
                          </button>
                        ))}
                    </Grid>
                  </Grid>
                </div>
                <Divider />
              </div>
            ))}

            {totalPages > 0 && (
              <>
                <Pagination
                  className={styles.companies__pagination}
                  color="primary"
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </>
            )}
          </>
        ) : (
          <p>No Companies Found</p>
        )
      ) : (
        <CircularLoading />
      )}
    </div>
  );
}

export default CompaniesSearchResult;
