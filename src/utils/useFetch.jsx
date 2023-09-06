"use client";

import { useState, useEffect } from "react";
import { workspaceApi, getAuthorization } from "./workspaceApi";

const useFetch = ({ url }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetching(url);
  }, []);

  const fetching = (url) => {
    workspaceApi
      .get(url, { headers: getAuthorization() })
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log(error)
        setError(err);
      });
  };

  return { data, error, fetching };
};
export default useFetch;
