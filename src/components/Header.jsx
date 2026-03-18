import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import Cookies from "js-cookie";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Header = ({
  setIsConnected,
  title,
  setTitle,
  priceMax,
  priceMin,
  setPriceMax,
  setPriceMin,
  isConnected,
}) => {
  const location = useLocation();

  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <div className="filters">
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
        {location.pathname === "/" && (
          <div className="price-inputs">
            <input
              type="number"
              name="priceMin"
              id="priceMin"
              value={priceMin}
              onChange={(event) => {
                setPriceMin(event.target.value);
              }}
            />
            <input
              type="number"
              name="priceMax"
              id="priceMax"
              value={priceMax}
              onChange={(event) => {
                setPriceMax(event.target.value);
              }}
            />
          </div>
        )}
      </div>
      {isConnected ? (
        <div>
          <button
            className="disconnected"
            onClick={() => {
              Cookies.remove("tokenValue");
              setIsConnected(null);
            }}
          >
            Se déconnecter
          </button>
        </div>
      ) : (
        <div>
          <Link to="/signup">
            <button>S'inscrire</button>
          </Link>
          <Link to="/login">
            <button>se connecter</button>
          </Link>
        </div>
      )}

      <Link to="/publish">
        <button className="sell">vends tes articles</button>
      </Link>
    </header>
  );
};
export default Header;
