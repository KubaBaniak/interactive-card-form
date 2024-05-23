import "./cardFront.scss";
import logo from "../../assets/images/card-logo.svg";

interface ICard {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
}
export default function CardFront({ cardData }: { cardData: ICard }) {
  const { cardNumber, cardHolder, expiryDate } = cardData;
  return (
    <div className="card-front">
      <img src={logo} />
      <span className="card-number">{cardNumber}</span>
      <div className="inline-card-data">
        <span className="card-holder">{cardHolder}</span>
        <span className="expiry-date">{expiryDate}</span>
      </div>
    </div>
  );
}
