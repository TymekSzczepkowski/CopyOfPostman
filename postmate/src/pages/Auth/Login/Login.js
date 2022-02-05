import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import LoadingIcon from "../../../UI/Loading/LoadingIcon";
import style from "../Auth.module.css";
import { Link } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = "http://localhost:8013/";

function Login() {
  const [auth, setAuth] = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(API_URL + `jwt/create/`, {
        email,
        password,
      });
      setAuth({
        refresh: res.data.refresh,
        access: res.data.access,
      });
      history.push("/profile");
    } catch (ex) {
      setLoading(false);
      setErrorMsg("Incorrect login details");
    }
  };

  if (auth) {
    history.push("/");
  }

  return (
    <div className={style.authContainer}>
      <form className={style.formContainer} onSubmit={submit}>
        <h2 className={style.formHeader}>Login</h2>
        <div className={style.formGroup}>
          <input
            placeholder='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={style.inputs}
          />
        </div>
        <div className={style.formGroup}>
          <input
            placeholder='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={style.inputs}
          />
        </div>

        {loading ? (
          <LoadingIcon />
        ) : (
          <>
            <button className={style.buttons}>Login</button>
          </>
        )}
        {errorMsg ? <p className={style.alert}>{errorMsg}</p> : null}
        <div className={style.bottomInfo}>
          <Link to={"/register"}>
            <a>You dont have an account? Sign up</a>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
