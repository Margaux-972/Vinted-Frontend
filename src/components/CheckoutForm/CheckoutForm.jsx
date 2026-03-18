import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./CheckoutForm.css";

const CheckoutForm = ({ title, amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleError = (error) => {
    setIsLoading(false);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe) {
      return;
    }

    setIsLoading(true);

    const elementResponse = await elements.submit();

    if (elementResponse.error) {
      handleError(elementResponse.error);
      return;
    }
    console.log("coucou");

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
        { title, amount },
      );

      console.log("response => ", response.data); //{id: 'pi_3TC0GiDVswqktOkX0i5gaLCm', object: 'payment_intent', amount: 2500, amount_capturable: 0, amount_details: {…}, …}

      // { client_secret: clientSecret } = response.data;

      const confirmPayment = await stripe.confirmPayment({
        elements: elements,
        clientSecret: response.data.client_secret,
        confirmParams: {
          return_url: "http://localhost:5173/",
        },
        redirect: "if_required",
      });

      console.log("confirmPayment =>", confirmPayment); //{paymentIntent:{id: 'pi_3TC0GiDVswqktOkX0i5gaLCm', object: 'payment_intent', amount: 2500, amount_details: {…}, automatic_payment_methods: {…}, …}}

      if (confirmPayment.error) {
        handleError(confirmPayment.error);
      } else {
        setIsLoading(false);
      }
      if (confirmPayment.paymentIntent.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return completed ? (
    <div className="container">
      <p>Paiement effectué. Merci pour votre achat !</p>
      <Link to="/">
        <button className="finished">Retour sur la page d'accueil</button>
      </Link>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="payment-element">
      <PaymentElement />
      <button disabled={!stripe || isLoading}>Payer</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default CheckoutForm;
