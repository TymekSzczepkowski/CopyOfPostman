import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import LoadingIcon from "../../../UI/Loading/LoadingIcon";

import style from "../Auth.module.css";
import { Link } from "react-router-dom";

// const API_URL = "http://localhost:8013/";
const API_URL = process.env.REACT_APP_API_URL;

function Register() {
  const history = useHistory();
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [ifSent, updateIfSent] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const submit = async (e) => {
    if (
      form.first_name === "" ||
      form.last_name === "" ||
      form.email === "" ||
      form.password === "" ||
      form.re_password === ""
    ) {
      setError("All fields must be completed");
    }
    if (form.password != form.re_password) {
      setError("Password did not match");
    }
    
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(API_URL + "auth/users/", {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
        re_password: form.re_password,
      });
      updateIfSent(true);
    } catch (ex) {}
    setLoading(false);
  };

  if (auth) {
    history.push("/");
  }

  return (
    <div className={style.authContainer}>
      <div className={style.formContainer}>
        {ifSent ? (
          <div className={style.ifSentInfo}>
            To complete your registration, check your email and confirm your
            account
          </div>
        ) : (
          <>
            <h2 className={style.formHeader}>Register</h2>

            <form onSubmit={submit}>
              <div className={style.formGroup}>
                <input
                  placeholder='First name'
                  type='text'
                  value={form.first_name}
                  onChange={(e) =>
                    setForm({ ...form, first_name: e.target.value })
                  }
                  className={style.inputs}
                />
              </div>
              <div className={style.formGroup}>
                <input
                  placeholder='Last name'
                  type='text'
                  value={form.last_name}
                  onChange={(e) =>
                    setForm({ ...form, last_name: e.target.value })
                  }
                  className={style.inputs}
                />
              </div>

              <div className={style.formGroup}>
                <input
                  placeholder='Email'
                  type='email'
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={style.inputs}
                />
              </div>
              <div className={style.formGroup}>
                <input
                  placeholder='Password'
                  type='password'
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className={style.inputs}
                />
              </div>

              <div className={style.formGroup}>
                <input
                  placeholder='Reapeat password'
                  type='password'
                  value={form.re_password}
                  onChange={(e) =>
                    setForm({ ...form, re_password: e.target.value })
                  }
                  className={style.inputs}
                />
              </div>

              <div className='text-right'>
                {loading ? (
                  <LoadingIcon />
                ) : (
                  <button className={style.buttons}>Register</button>
                )}
              </div>
              {error ? <p className={style.alert}>{error}</p> : null}
              <div className={style.bottomInfo}>
                <Link to={"/login"}>
                  <a>You don't have an account? Sign up</a>
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
export default Register;
