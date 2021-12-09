import classes from "./Navbar.css";

const Navbar = () => {
  return (
    <div className="sidenav">
      <a href="#about">About</a>
      <a href="#services">Services</a>
      <a href="#clients">Clients</a>
      <a href="#contact">Contact</a>
      <button className="dropdown-btn">
        Dropdown
        <i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdown-container">
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
      </div>
      <a href="#contact">Search</a>
    </div>
  );
};

export default Navbar;
