import { ReactElement, useContext, useState } from "react";

import SearchContext from "../context";
import styles from "../../index.css?inline";

export default function Search(): ReactElement {
  const { setRequest } = useContext(SearchContext);
  const [valueInput, setValueInput] = useState("");
  console.log(styles);

  return (
    <form
      className={styles}
      action="#"
      method="GET"
      onSubmit={(e) => {
        e.preventDefault();
        setRequest(valueInput);
      }}
    >
      <input
        className={styles}
        type="search"
        id="search"
        value={valueInput}
        placeholder="Найти репозиторий GitHub..."
        onChange={(e) => {
          setValueInput(e.target.value);
        }}
      />
      <button type="submit" aria-label="поиск">
        Найти
      </button>
    </form>
  );
}
