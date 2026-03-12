import { Link } from "react-router-dom";

const Items = ({ data }) => {
  return (
    <div className="container">
      {data.map((element) => {
        return (
          <Link
            to={`/offers/${element._id}`}
            className="links"
            key={element._id}
          >
            <div>
              <p className="owner">
                <img
                  src={element.owner.account.avatar.secure_url}
                  alt="avatar"
                />
                {element.owner.account.username}
              </p>
              <img src={element.product_image.secure_url} alt="clothes" />
              <p>{element.product_price}</p>
              {element.product_details.map((element, index) => {
                return (
                  <div key={index}>
                    <p>{element.TAILLE}</p>
                    <p>{element.MARQUE}</p>
                  </div>
                );
              })}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Items;
