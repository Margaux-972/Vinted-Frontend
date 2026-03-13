import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import Cookies from "js-cookie";

const Header = ({ setIsConnected }) => {
  const userToken = Cookies.get("tokenValue");
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <input type="text" placeholder="Recherche des articles" />
      {userToken ? (
        <div>
          <button
            onClick={() => {
              Cookies.remove("tokenValue");
              setIsConnected(false);
            }}
          >
            Se déconnecter
          </button>
        </div>
      ) : (
        <div>
          <Link to="/Signup">
            <button>S'inscrire</button>
          </Link>
          <Link to="/Login">
            <button>se connecter</button>
          </Link>
        </div>
      )}

      <button>vends tes articles</button>
    </header>
  );
};
export default Header;
