import React, { useEffect, useRef } from "react";
import { Container, Grid } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import styles from "./search.module.scss";

function SearchJobBar() {
  const searchInput = useRef(null);

  useEffect(() => {
    setInputFocus();
  }, []);

  const setInputFocus = () => {
    searchInput.current.focus();
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item>
          <div className={styles.searchbar}>
            <button onClick={setInputFocus} className={styles.searchbar__icon}>
              <Search />
            </button>
            <input
              ref={searchInput}
              type="text"
              placeholder="Look up some f...g jobs"
              className={styles.searchbar__input}
            />
          </div>
        </Grid>
        <Grid item>
          <button className={styles.searchbar__searchBtn}>Search</button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SearchJobBar;
