import React from "react";
import { useHistory, useLocation } from "react-router-dom";

const useQueries = () => {
  const location = useLocation();
  const history = useHistory();

  const queries = React.useMemo(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const obj = Object.fromEntries(urlSearchParams.entries());
    return obj;
  }, [location.search]);

  const setQueries = React.useCallback(
    (q) => {
      const qs = new URLSearchParams(q);
      history.push(`?${qs.toString}`);
    },
    [history]
  );

  const setQuery = React.useCallback(
    (key, value) => {
      const qs = new URLSearchParams(queries);
      qs.set(key, encodeURIComponent(value));
      history.push(`?${qs.toString}`);
    },
    [history, queries]
  );

  return {
    queries,
    setQueries,
    setQuery,
  };
};

export default useQueries;
