import "../Login/Login.css";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email,
          password,
        },
      );
      Cookies.get("tokenValue");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Se connecter</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit;
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
        <Link to="/Signup">
          <p>Pas encore de compte ? Inscris-toi !</p>
        </Link>
      </form>
    </>
  );
};

export default Login;
