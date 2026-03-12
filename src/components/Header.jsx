import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <input type="text" placeholder="Recherche des articles" />
      <Link to="/Signup">
        <button>S'inscrire</button>
      </Link>
      <Link to="/Login">
        <button>se connecter</button>
      </Link>
      <button>vends tes articles</button>
    </header>
  );
};
export default Header;
