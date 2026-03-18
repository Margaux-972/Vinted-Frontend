import "./App.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import SignUp from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Publish from "./pages/Publish/Publish";
import Payment from "./pages/Payment/Payment";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(
    Cookies.get("tokenValue") || null,
  );
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1000);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let filters = "";
        if (title) {
          filters += "?title=" + title;
        }
        if (priceMin) {
          if (filters) {
            filters += "&priceMin=" + priceMin;
          } else {
            filters += "?priceMin=" + priceMin;
          }
        }
        if (priceMax) {
          if (filters) {
            filters += "&priceMax=" + priceMax;
          } else {
            filters += "?priceMax=" + priceMax;
          }
        }
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers/" + filters,
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
  }, [title, priceMin, priceMax]);

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <>
      <Router>
        <Header
          setIsConnected={setIsConnected}
          title={title}
          setTitle={setTitle}
          priceMin={priceMin}
          priceMax={priceMax}
          setPriceMin={setPriceMin}
          setPriceMax={setPriceMax}
          isConnected={isConnected}
        />
        <Routes>
          <Route path="/" element={<Home data={data.offers} />} />
          <Route path="/offers/:id" element={<Offer />} />
          <Route
            path="/signup"
            element={<SignUp setIsConnected={setIsConnected} />}
          />
          <Route
            path="/login"
            element={<Login setIsConnected={setIsConnected} />}
          />
          <Route path="publish" element={<Publish />} />
          <Route path="/payment" element={<Payment />} />
          <Route
            path="*"
            element={<div className="container">NOT FOUND</div>}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
