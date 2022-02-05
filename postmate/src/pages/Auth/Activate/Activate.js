import style from "./../Auth.module.css";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import LoadingIcon from "../../../UI/Loading/LoadingIcon";
import { useHistory, useParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = "http://localhost:8013/";
function Activate() {
  const history = useHistory();
  const [auth, setAuth] = useAuth();
  const { uidFromUrl, tokenFromUrl } = useParams();
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(API_URL + `users/verify-user-email/`, {
        uid: uidFromUrl,
        token: tokenFromUrl,
      });

      history.push("/login");
    } catch (ex) {}
  };
  if (auth) {
    history.push("/");
  }
  return (
    <div className={style.authContainer}>
      <form onClick={submit} className={style.formContainer}>
        <h2 className={style.formHeader}>Activate Your account</h2>
        <div className={style.formGroup}></div>
        <p className={style.text}>
          Please click on the button to complete the verification process
        </p>
        <div className={style.formGroup}></div>
        {loading ? (
          <LoadingIcon />
        ) : (
          <button className={style.buttons}>Activate</button>
        )}
        <div className={style.bottomInfo}></div>
      </form>
    </div>
  );
}
export default Activate;
