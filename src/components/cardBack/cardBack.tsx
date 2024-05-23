import "./cardBack.scss";

export default function CardBack({ cvcNumber }: { cvcNumber: string }) {
  return (
    <div className="card-back">
      <span>{cvcNumber}</span>
    </div>
  );
}
