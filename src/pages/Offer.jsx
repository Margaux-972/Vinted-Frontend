import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Offer = ({ data }) => {
  // useParams est le hook servant à récupérer le(s) paramètre(s) params associé à la route :
  const currentParams = useParams();
  //   console.log(currentParams); // {id: '12345678'}
  //   const { id } = currentParams;
  //   console.log(id); // 12345678
  console.log(data);

  return (
    <main className="offerpage">
      <div className="container">
        <section>
          {data._id === currentParams.id && (
            // console.log("element._id=>", element._id); //69b178a57659fbfd4f9ebe8f
            // console.log("currentParams=>", currentParams.id); // 69b178197659fbfd4f9ebe26

            <img src={element.product_image.secure_url} alt="clothes" />
          )}
        </section>
        <section></section>
      </div>
      <h1>PAGE OFFER</h1>
      <Link to="/">Go to HomePage</Link>
      <p>L'id du Offer est : {currentParams.id}</p>
    </main>
  );
};

export default Offer;
