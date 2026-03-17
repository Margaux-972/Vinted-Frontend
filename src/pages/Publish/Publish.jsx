import "../Publish/Publish.css";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [previewPicture, setPreviewPicture] = useState(null);

  const token = Cookies.get("tokenValue");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("picture", file);
    formData.append("description", description);
    formData.append("color", color);
    formData.append("size", size);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("city", city);

    for (const pair of formData.entries()) {
      // console.log("key =>" + pair[0] + "///  value =>" + pair[1]);
    }
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            // jZwespu0I0B2ZR9L2nN0_11SwceK5cCuyoggwvwCa0yCKRwnpduUemZghaGUnnHO
            Authorization: "Bearer " + token,
          },
        },
      );
      // console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="publish-page">
      {!token ? (
        <Navigate to="/login" state={{ from: "/publish" }} />
      ) : (
        <div className="container">
          <h3>Vends ton article</h3>
          <form onSubmit={handleSubmit}>
            <section>
              {previewPicture && (
                <img src={previewPicture} alt="previsualisation de l'image" />
              )}
              <label htmlFor="picture" className="file-label">
                + Ajoute une photo
              </label>
              <input
                type="file"
                name="picture"
                id="picture"
                onChange={(event) => {
                  setFile(event.target.files[0]);
                  const objectUrl = URL.createObjectURL(event.target.files[0]);
                  setPreviewPicture(objectUrl);
                }}
              />
            </section>
            <section>
              <div>
                <label htmlFor="title">Titre</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  placeholder="ex: Chemise Sézane Verte"
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="description">Décris ton article</label>

                <textarea
                  name="description"
                  id="description"
                  value={description}
                  placeholder="porté quelquefois, taille correctement"
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                ></textarea>
              </div>
            </section>
            <section>
              <div>
                <label htmlFor="brand">Marque</label>
                <input
                  type="text"
                  id="brand"
                  placeholder="ex: Zara"
                  value={brand}
                  onChange={(event) => {
                    setBrand(event.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="size">Taille</label>
                <input
                  type="text"
                  id="size"
                  placeholder="ex: L / 40 / 12"
                  value={size}
                  onChange={(event) => {
                    setSize(event.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="color">Couleur</label>
                <input
                  type="text"
                  id="color"
                  placeholder="ex: Fushia"
                  value={color}
                  onChange={(event) => {
                    setColor(event.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="condition">État</label>
                <input
                  type="text"
                  id="condition"
                  placeholder="Neuf avec étiquette"
                  value={condition}
                  onChange={(event) => {
                    setCondition(event.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="city">Lieu</label>
                <input
                  type="text"
                  id="city"
                  placeholder="ex: Paris"
                  value={city}
                  onChange={(event) => {
                    setCity(event.target.value);
                  }}
                />
              </div>
            </section>
            <section>
              <div>
                <label htmlFor="price">Prix</label>
                <input
                  type="text"
                  id="price"
                  placeholder="0,00 €"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
              </div>
              <p>
                <input type="checkbox" name="trade" id="trade" /> Je suis
                intéressé(e) par les échanges
              </p>
            </section>
            <button>Ajouter</button>
          </form>
        </div>
      )}
    </main>
  );
};

export default Publish;
