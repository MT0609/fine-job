import React from "react";
import styles from "./index.module.scss";

function HomeSection(props) {
  const { title, content, list } = props;
  return (
    <section
      className={`${styles.company__sections} ${styles["company__sections--left"]}`}
    >
      <p className={styles["company__sections--title"]}>{title}</p>
      <p>{content}</p>
      {list && (
        <ul style={{ marginLeft: "1rem" }}>
          {list.map((specialty, index) => (
            <li key={index}>{specialty}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default HomeSection;
