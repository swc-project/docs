import React from "react";
import styles from "./styles.module.css";

export function UserComponent(props) {
  return (
    <a href={props.infoLink}>
      <img
        src={props.image}
        alt={props.caption}
        title={props.caption}
        className={styles.logo}
      />
    </a>
  );
}
