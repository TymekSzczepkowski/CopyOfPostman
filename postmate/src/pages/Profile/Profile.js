import useAuth from "../../hooks/useAuth";
import style from "./profile.module.css"


function Profile() {
  const [auth, setAuth] = useAuth();

  return (
    <div className={style.Container}>
        <div className={style.profileContainer}>
          <div className={style.profileHeader}>
            <header>
              <h2>Tokens</h2>
            </header>
          </div>
          <div>
            <p>Access Token:</p>
            {auth.access}
          </div>
          <div>
            <p>Refresh Token:</p>
            {auth.refresh}
          </div>
        </div>
    </div>
  );
};

export default Profile;
