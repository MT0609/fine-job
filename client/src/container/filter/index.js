import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";

function FilterBar(props) {
  const { option = "", onclick } = props;

  const { t } = useTranslation();

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
        {t("filterBar.all")}
      </button>
      <button
        className={`${styles["filters__button"]} ${
          option === "people" ? styles["filters__button--active"] : ""
        }`}
        onClick={() => handleClick("people")}
      >
        {t("filterBar.people")}
      </button>
      <button
        className={`${styles["filters__button"]} ${
          option === "job" ? styles["filters__button--active"] : ""
        }`}
        onClick={() => handleClick("job")}
      >
        {t("filterBar.job")}
      </button>
      <button
        className={`${styles["filters__button"]} ${
          option === "company" ? styles["filters__button--active"] : ""
        }`}
        onClick={() => handleClick("company")}
      >
        {t("filterBar.company")}
      </button>
    </div>
  );
}

export default FilterBar;
