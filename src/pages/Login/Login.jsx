import "../Login/Login.css";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = ({ setIsConnected }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (event, setState) => {
    setState(event.target.value);
  };
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email,
          password,
        },
      );
      console.log(response.data);
      if (!email && !password) {
        alert("Cannot be blank");
      }
      if (response.data.token) {
        Cookies.set("tokenValue", response.data.token);
        setIsConnected(true);
        if (location.state) {
          navigate(location.state.from);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="login-page">
      <div className="container">
        <h1>Se connecter</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(event) => {
              handleChange(event, setEmail);
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => {
              handleChange(event, setPassword);
            }}
          />
          <button>Se connecter</button>
        </form>
        <Link className="links" to="/Signup">
          <p>Pas encore de compte ? Inscris-toi !</p>
        </Link>
      </div>
    </main>
  );
};

export default Login;
