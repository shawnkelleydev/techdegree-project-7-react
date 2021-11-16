import { NavLink } from "react-router-dom";

const Nav = (props) => {
  const to = "/" + props.query;

  return (
    <li>
      <NavLink to={to}>{props.query}</NavLink>
    </li>
  );
};

export default Nav;
