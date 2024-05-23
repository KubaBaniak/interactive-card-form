import { useForm, SubmitHandler } from "react-hook-form";
import "./form.scss";
import { useEffect } from "react";

type Inputs = {
  CardholderName: string;
  CardNumber: string;
  ExpiryDateMonth: string;
  ExpiryDateYear: string;
  CVC: number;
};

export default function Form({
  handleFormInput,
  setStateFunctions,
}: {
  handleFormInput: (
    updateStateFunction: React.Dispatch<React.SetStateAction<string>>,
    value: string,
  ) => void;
  setStateFunctions: {
    setCardNumber: React.Dispatch<React.SetStateAction<string>>;
    setCardHolder: React.Dispatch<React.SetStateAction<string>>;
    setCardExpiryDate: React.Dispatch<React.SetStateAction<string>>;
    setCardCVC: React.Dispatch<React.SetStateAction<string>>;
  };
}) {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const mergeExpiryDateWith = (
    currentFieldData: string,
    date: "ExpiryDateMonth" | "ExpiryDateYear",
  ): string => {
    const otherDateField = getValues(date);
    const otherPart = otherDateField ? otherDateField : "";
    const expiryDate =
      date === "ExpiryDateYear"
        ? currentFieldData + "/" + otherPart
        : otherPart + "/" + currentFieldData;

    return expiryDate;
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="CardholderName"> CARDHOLDER NAME </label>
        <input
          id="CardholderName"
          placeholder="e.g. Jane Appleseed"
          type="text"
          {...register("CardholderName", {
            required: true,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              const cardHolder =
                e.target.value === ""
                  ? "Jane Appleseed"
                  : e.target.value.trim();
              handleFormInput(setStateFunctions.setCardHolder, cardHolder);
            },
          })}
        />
        {errors.CardholderName && (
          <p className="error">{errors.CardholderName.message}</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="CardNumber"> CARD NUMBER </label>
        <input
          id="CardNumber"
          placeholder="e.g. 1234 5678 9123 0000"
          type="text"
          {...register("CardNumber", {
            required: true,
            validate: {
              lengthCheck: (value) =>
                value.length === 16 || "Card number must must have 16 digits",
            },
            pattern: {
              value: /^[0-9]*$/,
              message: "Card number must be numeric",
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              const cardNumber =
                e.target.value === ""
                  ? "1234 5678 9123 0000"
                  : e.target.value
                      .replace(/\s/g, "")
                      .replace(/(.{4})/g, "$1 ")
                      .trim();
              handleFormInput(setStateFunctions.setCardNumber, cardNumber);
            },
          })}
        />
        {errors.CardNumber && (
          <p className="error">{errors.CardNumber.message}</p>
        )}
      </div>
      <div className="form-group-inline">
        <div className="form-group">
          <label htmlFor="ExpiryDate">EXP.DATE (MM/YY)</label>
          <div className="inline-inputs">
            <input
              id="MM"
              className="quarter-size"
              placeholder="MM"
              type="text"
              {...register("ExpiryDateMonth", {
                required: true,
                pattern: {
                  value: /(0[1-9]|1[0-2])/,
                  message: "Expiry month has to be in MM format",
                },
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  const mergedDate = mergeExpiryDateWith(
                    e.target.value,
                    "ExpiryDateYear",
                  );
                  const cardExpiryDate =
                    mergedDate === "/" ? "01/42" : mergedDate;
                  handleFormInput(
                    setStateFunctions.setCardExpiryDate,
                    cardExpiryDate,
                  );
                },
              })}
            />
            <input
              id="YY"
              className="quarter-size"
              placeholder="YY"
              type="text"
              {...register("ExpiryDateYear", {
                required: true,
                pattern: {
                  value: /([0-9]{2})/,
                  message: "Expiry year has to be in YY format",
                },
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  const mergedDate = mergeExpiryDateWith(
                    e.target.value,
                    "ExpiryDateMonth",
                  );
                  const cardExpiryDate =
                    mergedDate === "/" ? "01/42" : mergedDate;
                  handleFormInput(
                    setStateFunctions.setCardExpiryDate,
                    cardExpiryDate,
                  );
                },
              })}
            />
          </div>
          {errors.ExpiryDateMonth && (
            <p className="error">{errors.ExpiryDateMonth.message}</p>
          )}
          {errors.ExpiryDateYear && (
            <p className="error">{errors.ExpiryDateYear.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="ExpiryDate">EXP.DATE (MM/YY)</label>
          <input
            id="CVC"
            placeholder="e.g. 123"
            type="text"
            {...register("CVC", {
              required: true,
              pattern: {
                value: /^\d{3}/,
                message: "CVC consists of 3 digits",
              },
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                const cardCVC =
                  e.target.value === "" ? "123" : e.target.value.trim();
                handleFormInput(setStateFunctions.setCardCVC, cardCVC);
              },
            })}
          />
          {errors.CVC && <p className="error">{errors.CVC.message}</p>}
        </div>
      </div>
      <input type="submit" value="Confirm" />
    </form>
  );
}
