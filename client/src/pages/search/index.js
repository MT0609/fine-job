import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Paper } from "@material-ui/core";
import FilterBar from "../../container/filter";
import { searchUsers } from "../../actions/userActions";
import { getCompanies } from "../../actions/companyActions";
import CompaniesSearchResult from "../../container/search/companies";
import PeopleSearchResult from "../../container/search/people";
import styles from "./index.module.scss";

function SearchPage() {
  const { search } = useLocation();
  const keyword = new URLSearchParams(search).get("keyword");
  const cate = new URLSearchParams(search).get("cate");
  const page = new URLSearchParams(search).get("page") || 1;

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleAddressBarSearch = (keyword, cate, pg = page) => {
      let queryParams = new URLSearchParams(window.location.search);
      if (!keyword) queryParams.delete("keyword");
      else queryParams.set("keyword", keyword);

      if (cate === "all" || !cate) queryParams.delete("cate");
      else queryParams.set("cate", cate);

      const numbersReg = /^[0-9]+$/; // page only contain number
      if (!pg || !numbersReg.test(pg) || pg < 1) {
        queryParams.set("page", 1);
        pg = 1;
      } else queryParams.set("page", pg);
      history.replace(`/search?${queryParams}`);

      if (!queryParams.get("cate")) {
        dispatch(searchUsers(keyword, +pg));
        dispatch(getCompanies(keyword, +pg));
        return;
      }

      if (queryParams.get("cate") === "people")
        dispatch(searchUsers(keyword, +pg));
      else if (queryParams.get("cate") === "company")
        dispatch(getCompanies(keyword, +pg));
    };

    handleAddressBarSearch(keyword, cate, page);
  }, [keyword, cate, page, dispatch, history]);

  const users = useSelector((state) => state.user);
  const companies = useSelector((state) => state.company);

  const handleSearchByCate = (cate) => {
    let queryParams = new URLSearchParams(window.location.search);
    if (cate === "job") {
      let queryString = `/jobs`;
      if (queryParams.get("keyword")) queryString += `?keyword=${keyword}`;
      history.push(queryString);
      return;
    }

    if (cate === "" && !queryParams.get("cate")) return;
    if (cate === queryParams.get("cate")) return;
    queryParams.set("cate", cate);
    queryParams.set("page", 1);
    history.push(`/search?${queryParams}`);

    if (cate === "people")
      dispatch(searchUsers(keyword, +queryParams.get("page")));
    else if (cate === "company")
      dispatch(getCompanies(keyword, +queryParams.get("page")));
    else {
      dispatch(searchUsers(keyword, page));
      dispatch(getCompanies(keyword, page));
    }
  };

  const handlePageChange = async (page) => {
    let queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", page);
    const keyword = queryParams.get("keyword");
    history.push(`/search?${queryParams}`);
    if (cate === "people") dispatch(searchUsers(keyword, page));
    else if (cate === "company") dispatch(getCompanies(keyword, page));
    else {
      dispatch(searchUsers(keyword, page));
      dispatch(getCompanies(keyword, page));
    }
  };

  return (
    <div className={styles.search}>
      <FilterBar onclick={handleSearchByCate} option={cate || ""} />

      <div className={styles.search__main}>
        <div className={styles.search__left}>
          {(cate === "people" || !cate) && (
            <PeopleSearchResult
              loading={users.isLoading}
              people={users.users}
              totalPages={users.totalPages}
              currentPage={users.currentPage}
              onPageChange={handlePageChange}
            />
          )}

          {(cate === "company" || !cate) && (
            <CompaniesSearchResult
              loading={companies.isLoading}
              companies={companies.companies}
              totalPages={companies.totalPages}
              currentPage={companies.currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>

        <Paper className={styles.search__right}>
          <p>Promoted By</p>
          <img
            src="https://res.cloudinary.com/dghvjalhh/image/upload/v1618850154/avatars/sxqvw0io5dmkg4apx30d.jpg"
            alt="Nguyen-Thai"
          />
        </Paper>
      </div>
    </div>
  );
}

export default SearchPage;
