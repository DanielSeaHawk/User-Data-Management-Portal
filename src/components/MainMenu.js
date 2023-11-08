import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/api/reducer/authSlice";
const MainMenu = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Homepage</Link>
        </li>
        {!auth.isLogged && (
          <li>
            <Link to="/authform">Signin/Registration</Link>
          </li>
        )}

        {auth.isLogged && (
          <>
            <li>
              <Link to="/profile">{auth.user.username}</Link>
            </li>
            <li>
          <Link to={"/student"}>Student Inforamtion</Link>
        </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Logout
              </Link>
            </li>
          </>
        )}
       
      </ul>
    </div>
  );
};

export default MainMenu;
