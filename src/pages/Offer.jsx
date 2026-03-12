import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Offer = () => {
  // useParams est le hook servant à récupérer le(s) paramètre(s) params associé à la route :
  const { id } = useParams();
  //   console.log(currentParams); // {id: '12345678'}
  //   const { id } = currentParams;
  //   console.log(id); // 12345678
  const [data, setData] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offer/" + id,
        );
        setData(response.data);
        setisLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(data);

  return (
    <main className="offerpage">
      <div className="container">
        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          <>
            <section>
              <img src={data.product_image.secure_url} alt="clothes" />
            </section>
            <section>
              <p className="price">{data.product_price} €</p>
              {data.product_details.map((item) => {
                return (
                  <>
                    {item.MARQUE && (
                      <p>
                        MARQUE <span>{item.MARQUE}</span>
                      </p>
                    )}
                    {item.TAILLE && (
                      <p>
                        TAILLE <span>{item.TAILLE}</span>
                      </p>
                    )}
                    {item.ÉTAT && (
                      <p>
                        ÉTAT <span>{item.ÉTAT}</span>
                      </p>
                    )}
                    {item.COULEUR && (
                      <p>
                        COULEUR <span>{item.COULEUR}</span>
                      </p>
                    )}

                    {item.EMPLACEMENT && (
                      <p>
                        EMPLACEMENT <span>{item.EMPLACEMENT}</span>
                      </p>
                    )}

                    {item["MODES DE PAIEMENT"] && (
                      <p>
                        MODES DE PAIEMENT{" "}
                        <span>{item["MODES DE PAIEMENT"]}</span>
                      </p>
                    )}
                  </>
                );
              })}
              <div className="bottom-part">
                <p>{data.product_name}</p>
                <p>{data.product_description}</p>
                <div>
                  <img
                    src={data.owner.account.avatar.secure_url}
                    alt="avatar"
                  />
                  <p>{data.owner.account.username}</p>
                </div>
                <button>Acheter</button>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default Offer;
