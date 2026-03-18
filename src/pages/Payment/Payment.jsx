import "../Payment/Payment.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, Navigate } from "react-router-dom";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import Cookies from "js-cookie";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP",
);

const Payment = () => {
  const token = Cookies.get("tokenValue");
  const location = useLocation();
  const { title, amount, id } = location.state;
  //   const { amount } = location.state;
  //   console.log({ title, amount }); {title: 'Vestido', amount: 25}

  const options = {
    mode: "payment",
    amount: amount * 100, // le montant est en centimes !
    currency: "eur",
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  return token ? (
    <main className="payment-page">
      <section>
        <h1>Résumé de la commande</h1>
        <div>
          <p>Commande</p> <p>{amount.toFixed(2)} €</p>
        </div>
        <div>
          <p>Frais protection acheteurs</p> <p>{(0.4).toFixed(2)} €</p>
        </div>
        <div>
          <p>Frais de port</p> <p>{(0.8).toFixed(2)} €</p>
        </div>
      </section>
      <section>
        <div>
          <p>Total</p> <p>{(amount + 1.2).toFixed(2)} €</p>
        </div>
        <p className="purchase-label">
          Il ne vous reste plus qu'un étape pour vous offrir{" "}
          <span>{title}</span>. Vous allez payer{" "}
          <span>{(amount + 1.2).toFixed(2)} € </span>
          (frais de protection et frais de port inclus).
        </p>
        <Elements stripe={stripePromise} options={options}>
          {/* ⚠️ le checkoutform (qui contiendra le formulaire de paiement) DOIT etre enfant du composant Elements de stripe */}
          <CheckoutForm title={title} amount={amount} />
        </Elements>
      </section>
    </main>
  ) : (
    <Navigate to="/login" state={{ from: "/offers/" + id }} />
  );
};

export default Payment;
