import { ReactElement } from "react";
import styles from "./pagination.module.css";
import IPagination from "./interfaces";
export default function Pagination({
  pages,
  currentPage,
  setPage,
}: IPagination): ReactElement {
  const getPagination = (): ReactElement[] => {
    const markup: ReactElement[] = [];
    for (let i = 1; i <= pages; i += 1) {
      markup.push(
        <li
          key={i}
          className={
            i === currentPage
              ? `${styles.li} ${styles.li__active}`
              : `${styles.li}`
          }
        >
          <a
            className={styles.a}
            href={String(i)}
            onClick={(evt) => {
              evt.preventDefault();
              setPage(i);
            }}
          >
            {i}
          </a>
        </li>
      );
    }

    return markup;
  };

  return <ul className={styles.ul}>{getPagination()}</ul>;
}
