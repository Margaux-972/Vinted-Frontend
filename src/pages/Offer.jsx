import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Offer = ({ data }) => {
  // useParams est le hook servant à récupérer le(s) paramètre(s) params associé à la route :
  const currentParams = useParams();
  //   console.log(currentParams); // {id: '12345678'}
  //   const { id } = currentParams;
  //   console.log(id); // 12345678

  return (
    <main>
      <h1>PAGE OFFER</h1>
      <Link to="/">Go to HomePage</Link>
      <p>L'id du Offer est : {currentParams.id}</p>
    </main>
  );
};

export default Offer;
