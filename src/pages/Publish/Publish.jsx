import "../Publish/Publish.css";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("picture", file);

    for (const pair of formData.entries()) {
      console.log("key =>" + pair[0] + "///  value =>" + pair[1]);
    }
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            // jZwespu0I0B2ZR9L2nN0_11SwceK5cCuyoggwvwCa0yCKRwnpduUemZghaGUnnHO
            Authorization: "Bearer " + Cookies.get("tokenValue"),
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="publish-page">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div>
            <h3>Vends ton article</h3>
            <input
              type="file"
              name="picture"
              id="picture"
              onChange={(event) => {
                setFile(event.target.files[0]);
              }}
            />
          </div>
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
            <label htmlFor="description">Décris ton article</label>
            <input
              type="text"
              placeholder="porté quelquefois, taille correctement"
              id="description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="brand">Marque</label>
            <input type="text" id="brand" placeholder="ex: Zara" />
            <label htmlFor="size">Taille</label>
            <input type="text" id="size" placeholder="ex: L / 40 / 12" />
            <label htmlFor="color">Couleur</label>
            <input type="text" id="color" placeholder="ex: Fushia" />
          </div>
          <button>Ajouter</button>
        </form>
      </div>
    </main>
  );
};

export default Publish;
