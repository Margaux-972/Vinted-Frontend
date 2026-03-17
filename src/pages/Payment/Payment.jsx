import "../Payment/Payment.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "../../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP",
);

const Payment = () => {
  const location = useLocation();
  const { title, amount } = location.state;
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

  return (
    <main className="payment-page">
      <div className="container">
        <h1>Page de paiement</h1>
        <Elements stripe={stripePromise} options={options}>
          {/* ⚠️ le checkoutform (qui contiendra le formulaire de paiement) DOIT etre enfant du composant Elements de stripe */}
          <CheckoutForm title={title} amount={amount} />
        </Elements>
      </div>
    </main>
  );
};

export default Payment;
