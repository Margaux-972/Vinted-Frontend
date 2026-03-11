import { Link } from "react-router-dom";
import pichero from "../assets/images/hero.png";
import { useState } from "react";

const Home = ({ data }) => {
  const [item, setItem] = useState([]);
  //   console.log(data); //{count: 32, offers: Array(32)}
  //   console.log(data.offers); // {_id: '69b178197659fbfd4f9ebe26', product_name: 'Vestido', product_description: 'Vestido camisero estampado...}
  //  console.log(data); // {_id: '69b178197659fbfd4f9ebe26', product_name: 'Vestido',

  return (
    <main>
      <section className="hero">
        <img src={pichero} alt="image de fond" />
        {/* <div>
          Prêts à faire du tri dans vos placards ?
          <div>Commencer à vendre</div>
        </div> */}
      </section>

      <div className="container">
        {data.map((element) => {
          return (
            <div key={element._id}>
              <p>{element.owner.account.username}</p>
              <img src={element.product_image.secure_url} alt="clothes" />
              <p>{element.product_price}</p>
              {element.product_details.map((element, index) => {
                return (
                  <>
                    <p>{element.TAILLE}</p>
                    <p>{element.MARQUE}</p>
                  </>
                );
              })}
            </div>
          );
        })}
        <Link to="/offers/12345678">Go to product 12345678</Link>
        <Link to="/offers/coucou">Go to product coucou</Link>
        <Link to="/offers/a67bf554343ee68">Go to product a67bf554343ee68</Link>
      </div>
    </main>
  );
};

export default Home;
