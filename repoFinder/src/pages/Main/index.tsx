import { ReactElement, useMemo, useState, createContext } from "react";
import { useQuery as getQuery } from "@apollo/client";
import Pagination from "../../components/Pagination";
import Repo from "../../components/Repo";
import Search from "../../components/Search";
import { getRepoOnPage } from "../../global/getRepoOnPage";
import { TOP_REPOS, GET_REPOS } from "./main.graphql";
import styles from "./main.module.css";
import SearchContext from "../../components/context";

export default function Main(): ReactElement {
  const lastRequest = sessionStorage.getItem("lastRequest") || "";
  const lastPage = sessionStorage.getItem("lastPage") || 1;

  const [requestRepo, setRequestRepo] = useState<string>(lastRequest);
  const [currentPage, setPage] = useState<number>(Number(lastPage));

  const setRequest = (currentRequest: string): void => {
    sessionStorage.setItem("lastRequest", currentRequest);
    setRequestRepo(currentRequest);
  };

  const setPageRepo = (page: number): void => {
    sessionStorage.setItem("lastPage", String(page));
    setPage(page);
  };

  const { loading, error, data } = lastRequest
    ? getQuery(GET_REPOS, {
        variables: {
          getQuery: `${requestRepo} sort:stars`,
        },
      })
    : getQuery(TOP_REPOS);

  if (error) {
    return <h2 className={styles.h2_error}>{error.message}</h2>;
  }

  const pages =
    data && getRepoOnPage(data.search.nodes, data.search.repositoryCount);
  const memo = useMemo(() => ({ requestRepo, setRequest }), []);

  return (
    <SearchContext.Provider value={memo}>
      <Search />

      {loading ? (
        <h3 className={styles.h3}>Loading...</h3>
      ) : (
        <>
          <Repo repos={pages.repos[currentPage - 1]} />
          {pages.count > 1 && (
            <Pagination
              pages={pages.count}
              currentPage={currentPage}
              setPage={setPageRepo}
            />
          )}
        </>
      )}
    </SearchContext.Provider>
  );
}
