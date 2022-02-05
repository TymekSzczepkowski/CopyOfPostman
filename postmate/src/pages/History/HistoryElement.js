import React from "react";
import style from "./HistoryElement.module.css";
function HistoryElement({
  id,
  url,
  method,
  body,
  quantity,
  summary,
  finished,
  date,
}) {
  return (
    <div className={style.authContainer}>
      <div className={style.tableContainer}>
        <table className={style.table}>
          <tr className={style.tr}>
            <th>ID</th>
            <th>ADRESS URL</th>
            <th>METHOD</th>
            <th>BODY</th>
            <th>QUANTITY</th>
            <th>SUMMARY</th>
            <th>FINISHED</th>
            <th>DATE</th>
          </tr>
          <tr className={style.td}>
            <td>{id}</td>
            <td>{url}</td>
            <td>{method}</td>
            <td>{JSON.stringify(body)}</td>
            <td>{quantity}</td>
            <td>{JSON.stringify(summary)}</td>
            <td>{finished}</td>
            <td>{date.slice(0, -8).replace("T", " ")}</td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default HistoryElement;
