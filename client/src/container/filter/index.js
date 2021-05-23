import React from "react";
import styles from "./index.module.scss";

function FilterBar(props) {
  const { option = "", onclick } = props;

  const handleClick = (cate) => {
    if (onclick) onclick(cate);
  };
  return (
    <div className={styles.filters}>
      <button
        className={`${styles["filters__button"]} ${
          option === "" ? styles["filters__button--active"] : ""
        }`}
        onClick={() => handleClick("")}
      >
        All
      </button>
      <button
        className={`${styles["filters__button"]} ${
          option === "people" ? styles["filters__button--active"] : ""
        }`}
        onClick={() => handleClick("people")}
      >
        People
      </button>
      <button
        className={`${styles["filters__button"]} ${
          option === "job" ? styles["filters__button--active"] : ""
        }`}
        onClick={() => handleClick("job")}
      >
        Jobs
      </button>
      <button
        className={`${styles["filters__button"]} ${
          option === "company" ? styles["filters__button--active"] : ""
        }`}
        onClick={() => handleClick("company")}
      >
        Companies
      </button>
    </div>
  );
}

export default FilterBar;
