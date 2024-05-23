import { useState } from "react";
import CardBack from "../components/cardBack/cardBack";
import CardFront from "../components/cardFront/cardFront";
import Form from "../components/form/form";
import "./card-payment-form.scss";

export default function CardPaymentForm() {
  const [cardNumber, setCardNumber] = useState("1234 5678 9123 0000");
  const [cardHolder, setCardHolder] = useState("Jane Appleseed");
  const [cardExpiryDate, setCardExpiryDate] = useState("01/42");
  const [cardCVC, setCardCVC] = useState("123");

  const setStateFunctions = {
    setCardNumber,
    setCardHolder,
    setCardExpiryDate,
    setCardCVC,
  };

  const updateCardData = (
    updateStateFunction: React.Dispatch<React.SetStateAction<string>>,
    value: string,
  ) => {
    updateStateFunction(value);
  };

  return (
    <>
      <div className="main-section">
        <div className="left-side">
          <CardFront
            cardData={{
              cardNumber: cardNumber,
              cardHolder: cardHolder,
              expiryDate: cardExpiryDate,
            }}
          />
          <CardBack cvcNumber={cardCVC} />
        </div>
        <div className="right-side">
          <Form
            setStateFunctions={setStateFunctions}
            handleFormInput={updateCardData}
          />
        </div>
      </div>
    </>
  );
}
