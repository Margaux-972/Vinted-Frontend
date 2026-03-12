import "../Signup/SignUp.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: { email },
          username: { username }, // "token": "_ANqb2huNr3o8AJqnYD-i0xDfw4mFC1-a6-IQrC_-uHNGlHHedH3yRRfcbdyJD70"
          password: { password },
          newsletter: true,
        },
      );
      Cookies.set("tokenValue", response.data.token, { expires: 7 });
      //   console.log("cookie", Cookies.set("tokenValue", response.data.token));
      //   console.log(response.data); // {_id: '69b2d8bf16d996c4ec891960', email: 'johnde@lereacteur.io', token: '9hsgsyqyxctIwFnBf7E-b19EjZuePt7geKvVscos4I-OOclc3FyeD1tE-nU5pzwG'{…}}
      //   console.log(response.data.token); //2E9mMRV8yxPuQLzwj2q828UOHRXOhzlsjgnA45NPQuNtmKJ1zn5IGK7LHJF2ELHE
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>S'inscrire</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            handleChange(event, setUsername);
          }}
        />
        <input
          type="email"
          placeholder="Email"
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
        <div>
          <p>S'inscrire à notre newsletter</p>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>
        <button onClick={fetchData}>S'inscrire</button>
        <p>Tu as déja un compte ? Connecte-toi !</p>
      </form>
    </>
  );
};

export default SignUp;

// const [data, setData] = useState(null);
//   const [isLoading, setisLoading] = useState(true);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post(
//           "https://lereacteur-vinted-api.herokuapp.com/user/signup",
//         );
//         console.log("data", response.data);

//         setData(response.data);
//         setisLoading(false);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);
//   //   console.log(data);

//   return <button onClick={() => {
//     return
//   }}>S'inscrire</button>;
