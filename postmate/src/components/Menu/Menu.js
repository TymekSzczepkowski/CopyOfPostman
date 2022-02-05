import { NavLink } from "react-router-dom";
import "./Menu.css";
import useAuth from "../../hooks/useAuth";

function Menu() {
  const [auth, setAuth] = useAuth();

  const logout = (e) => {
    e.preventDefault();
    setAuth(false);
  };

  return (
    <div className='sidebar'>
      <div className='logo-details'>
        {/* //activeClassName */}
        <NavLink exact to='/' className='logo_name'>
          <i class='bx bxs-paper-plane'></i>
        </NavLink>
        <NavLink exact to='/' className='logo_name'>
          Postmate
        </NavLink>
      </div>
      <ul className='navLinks'>
        <li>
          <NavLink to='/'>
            <i class='bx bxs-home'> </i>
            <span className='link-name'>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/request'>
            <i class='bx bxs-send'> </i>
            <span className='link-name'>Request</span>
          </NavLink>
        </li>
        {auth ? (
          <li>
            <NavLink to='/history'>
              <i class='bx bxs-backpack'> </i>
              <span className='link-name'>History</span>
            </NavLink>
          </li>
        ) : null}
        <li>
          <NavLink to='/about'>
            <i class='bx bxs-contact'> </i>
            <span className='link-name'>About us</span>
          </NavLink>
        </li>
        {/* </ul> */}
        {auth ? (
          <div className='authLinks'>
            <li>
              <a href='#' onClick={logout}>
                <i class='bx bxs-user'> </i>
                Log out
              </a>
            </li>
            <li>
              <NavLink to='/profile'>
                <i class='bx bxs-user'> </i>
                My profile
              </NavLink>
            </li>
          </div>
        ) : (
          <div className='authLinks'>
            <li>
              <NavLink to='/register'>
                <i class='bx bxs-user'> </i>
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink to='/login'>
                <i class='bx bxs-log-in'> </i>
                Login
              </NavLink>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
}

export default Menu;
