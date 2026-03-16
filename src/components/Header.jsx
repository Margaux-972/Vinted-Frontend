import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import Cookies from "js-cookie";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";

const Header = ({ setIsConnected, title, setTitle }) => {
  const userToken = Cookies.get("tokenValue");

  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Recherche des articles"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <FaMagnifyingGlass className="loupe" />
      </div>
      {userToken ? (
        <div>
          <button
            className="disconnected"
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
