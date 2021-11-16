import Nav from "./Nav";

const NavList = (props) => {
  return (
    <nav className="main-nav">
      <ul>
        <Nav query={props.presets[0]} />
        <Nav query={props.presets[1]} />
        <Nav query={props.presets[2]} />
      </ul>
    </nav>
  );
};

export default NavList;
