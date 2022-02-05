import style from "./Request.module.css";
import sampleData from "./sampleData";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import JSONInput from "react-json-editor-ajrm";
import LoadingIcon from "../../UI/Loading/LoadingIcon";
import validator from "validator";
import axios from "axios";
import locale from "react-json-editor-ajrm/locale/en";
import { Link } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;

function Request() {
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMessageURL, setErrorMessageURL] = useState("");
  const [errorMessageMethod, setErrorMessageMethod] = useState("");
  const [errorMessageQuantity, setErrorMessageQuantity] = useState("");
  // const [ifSent, upDateIfSend] = useState(false);
  const [request, setRequest] = useState({
    url: "",
    method: "",
    quantity: "",
    body: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    if (!validator.isURL(request.url)) setErrorMessageURL("Is Not Valid URL");
    else setErrorMessageURL("");
    if (request.method === "")
      setErrorMessageMethod("Choose GET or POST method");
    else setErrorMessageMethod("");
    if (request.quantity === "")
      setErrorMessageQuantity("Quanitity cannot be empty");
    else if (isNaN(request.quantity))
      setErrorMessageQuantity("Quanitity have to be a number");
    else setErrorMessageQuantity("");

    if (validator.isURL(request.url)) {
      try {
        const res = await axios.post(
          API_URL + `collections/send/`,
          {
            url: request.url,
            method: request.method,
            quantity: request.quantity,
            body: JSON.parse(request.body),
          },
          {
            headers: {
              Authorization: `Bearer ${auth.access}`,
            },
          }
        );
        // upDateIfSend(true);
        alert("Request has been send successfully");
      } catch (ex) {
        setLoading(false);
        console.log("...");
      }
    }
  };

  return (
    <div className={style.authContainer}>
      {auth ? (
        <div>
          <form className={`${style.formContainer} ${style.parent}`}>
            <div className={style.div2}>
              <div>
                <p className={style.p}>Type url:</p>
                <span className={style.alert}>{errorMessageURL}</span>
                <input
                  className={style.input}
                  placeholder='e.g. https://www.wp.pl/ '
                  type='text'
                  onChange={(e) =>
                    setRequest({ ...request, url: e.target.value })
                  }
                  value={request.url}
                />
              </div>

              <div>
                <p className={style.alert}>{errorMessageMethod}</p>
                <span className={style.span}>Get</span>
                <input
                  className={style.radioButton}
                  type='radio'
                  name='method'
                  onChange={(e) =>
                    setRequest({ ...request, method: e.target.value })
                  }
                  value='get'
                />
                <span className={style.span2}>Post</span>
                <input
                  className={style.radioButton}
                  type='radio'
                  name='method'
                  onChange={(e) =>
                    setRequest({ ...request, method: e.target.value })
                  }
                  value='post'
                />
              </div>
              <div>
                <p className={style.p}>Type quantity: </p>
                <span className={style.alert}>{errorMessageQuantity}</span>
                <input
                  className={style.input}
                  placeholder='e.g. 10'
                  type='text'
                  onChange={(e) =>
                    setRequest({
                      ...request,
                      quantity: e.target.value,
                    })
                  }
                  value={request.quantity}
                />
              </div>
              <div>
                <p className={style.p}>Type body: </p>
                <JSONInput
                  placeholder={sampleData}
                  id='a_unique_id'
                  locale={locale}
                  theme='light_mitsuketa_tribute'
                  height='300px'
                  width='508px'
                  colors={{
                    background: "#ffffff",
                    default: "#349eff",
                  }}
                  style={{
                    container: {
                      boxShadow: "0 0 15px rgba(0 0 0 / 8%)",
                      borderRadius: "10px",
                    },
                  }}
                  onChange={(e) => {
                    setRequest({ ...request, body: e.json });
                  }}
                  value={request.body}
                />
              </div>

              {loading ? (
                <LoadingIcon />
              ) : (
                <divc className={style.buttonDiv}>
                  <button onClick={submit} className={style.buttons}>
                    Send request
                  </button>
                </divc>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div className={style.authContainer}>
          <div className={style.formContainer}>
            <span className={style.span}>
              You should have an account to send requests
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
export default Request;
