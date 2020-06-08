import React, { useContext } from "react";
import { Dropdown, Button, Divider, Icon } from "react-materialize";
import { NavLink } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import Auth from "../../../user-feature/container/Auth";
import { AuthContext } from "../../context/auth-context";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  // const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // const dispatch = useDispatch();

  return (
    <>
      <li>
        <NavLink to="/" exact>
          Feed
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/1/places">My Places</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">Add a Place</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">Auth</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <Dropdown
            id="Dropdown_6"
            options={{
              alignment: "left",
              autoTrigger: true,
              closeOnClick: true,
              constrainWidth: true,
              container: null,
              coverTrigger: true,
              hover: false,
              inDuration: 150,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              outDuration: 250,
            }}
            trigger={
              <Button
                style={{ backgroundColor: "#ffcc80", color: "#424242" }}
                node="button"
              >
                User
              </Button>
            }
          >
            <NavLink to="/">Me</NavLink>
            <Divider />
            {/* <button onClick={()=>{dispatch({type: 'LOGOUT'})}}>Logout</button> */}
            <Button
              node="button"
              style={{
                backgroundColor: "#bf360c",
                color: "#fff",
              }}
              // onClick={() => {
              // dispatch({ type: "LOGOUT" });
              // }}
              onClick={auth.logout}
            >
              Logout
              <Icon right>exit_to_app</Icon>
            </Button>
          </Dropdown>
        </li>
      )}
    </>
  );
};
export default NavLinks;
