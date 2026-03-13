import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import "./App.css";
import axios from "axios";
import SignUp from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers/",
        );
        // console.log(response.data);

        setData(response.data);
        setisLoading(false);
      } catch (error) {
        error.message && console.log(error.message);
        error.response && console.log(error.response.data);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <>
      <Router>
        <Header setIsConnected={setIsConnected} />
        <Routes>
          <Route path="/" element={<Home data={data.offers} />}></Route>
          <Route path="/offers/:id" element={<Offer />}></Route>
          <Route
            path="/Signup"
            element={<SignUp setIsConnected={setIsConnected} />}
          ></Route>
          <Route
            path="/Login"
            element={<Login setIsConnected={setIsConnected} />}
          ></Route>
          <Route path="*" element={<div>NOT FOUND</div>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
