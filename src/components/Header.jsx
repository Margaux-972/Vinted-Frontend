import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
const Header = () => {
  return (
    <header>
      <img src={logo} alt="logo" />
      <input type="text" placeholder="Recherche des articles" />
      <button>s'inscrire</button>
      <button>se connecter</button>
      <button>vends tes articles</button>
    </header>
  );
};
export default Header;
