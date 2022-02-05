import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import HistoryElement from "./HistoryElement";

const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = "http://localhost:8013/";

function History() {
  const [auth, setAuth] = useAuth();
  const [array, setArray] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL + `history/all/`, {
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      })
      .then(response => {
        setArray(response.data);
      });
  }, []);

  return (
    <>
      {array.map((elem, index) => {
        return (
          <HistoryElement
            id={array[index].id}
            url={array[index].url}
            method={array[index].url_method}
            body={array[index].body}
            quantity={array[index].quantity}
            summary={array[index].summary}
            finished={array[index].finished.toString()}
            date={array[index].test_date}
          />
        );
      })}
    </>
  );
}

export default History;
