import { COUNTRY_LIST_WITH_CODE } from "@/data";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PaymentRightBlock({ handlePaymentSubmit }) {
  const stripe = useStripe();
  const elements = useElements();
  const [cardComplete, setCardComplete] = useState(false);
  const [expComplete, setExpComplete] = useState(false);
  const [cvvComplete, setCvvComplete] = useState(false);
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [cardExpiryError, setCardExpiryError] = useState("");
  const [cardCvcError, setCardCvcError] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");

  const handleOnChangeFields = (e, fieldName) => {
    const { value } = e.target;
    switch (fieldName) {
      case "email":
        if (!value && value.trim().length <= 0) {
          setEmailError("Email is required");
        } else if (!regex.test(value)) {
          setEmailError("Invalid Email address");
        } else {
          setEmailError("");
        }
        setEmail(value);
        break;
      case "cardHolderName":
        if (!value && value.trim().length <= 0) {
          setNameError("Name is required");
        } else if (value.trim().length < 4) {
          setNameError("Name must me greater than 4 character ");
        } else {
          setNameError("");
        }
        setCardHolderName(value);
        break;
      case "country":
        if (!value && value.trim().length <= 0) {
          setCountryError("Country is required");
        } else {
          setCountryError("");
        }
        setCountry(value);
        break;
      case "zipCode":
        if (!value && value.trim().length <= 0) {
          setZipCodeError("zip code is required");
        } else {
          setZipCodeError("");
        }
        setZipCode(value);
        break;
      default:
        break;
    }
  };

  const handleCompleteOrder = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!cardComplete) {
      elements.getElement(CardNumberElement).focus();
      setCardNumberError("Your card number is invalid.");
      return;
    }
    if (!expComplete) {
      elements.getElement(CardExpiryElement).focus();
      setCardExpiryError("Your card's expiration is invalid.");
      return;
    }
    if (!cvvComplete) {
      elements.getElement(CardCvcElement).focus();
      setCardCvcError("Your card's security code is incomplete.");
      return;
    }
    if (!cardHolderName) {
      setNameError("Name is required");
      return;
    }

    if (!country) {
      setCountryError("Country name is required");
      return;
    }

    if (!zipCode) {
      setZipCodeError("Zip code is required");
      return;
    }
    const cardElement = elements.getElement(CardNumberElement);

    const params = {
      name: cardHolderName,
      email,
      address: {
        country,
        postal_code: zipCode,
      },
      cardElement,
      priceId: "price_1MvlkbSBv99P2DLPh1kK4FJL",
    };

    handlePaymentSubmit(params);
  };

  const handleCardInputChange = (event, fieldName) => {
    switch (fieldName) {
      case "cardNumber":
        setCardNumberError(event.error ? event.error.message : "");
        setCardComplete(event.complete);
        break;
      case "cardExpiry":
        setCardExpiryError(event.error ? event.error.message : "");
        setExpComplete(event.complete);
        break;
      case "cardCvc":
        setCardCvcError(event.error ? event.error.message : "");
        setCvvComplete(event.complete);
        break;
      default:
        break;
    }
  };

  return (
    <div className={`mdf__payment-right-banner p-5`}>
      <h4>Pay with card</h4>
      <Form.Group className="mt-3" controlId="exampleForm.ControlInput56">
        <Form.Control
          type="email"
          placeholder="Email*"
          name="email"
          className="py-3"
          onChange={(e) => handleOnChangeFields(e, "email")}
          value={email}
        />
        {emailError && <span className="error-message">{emailError}</span>}
      </Form.Group>
      <Form.Group className="mt-3" controlId="exampleForm.ControlInput56">
        <label className="w-100">
          {/* Card number */}
          <CardNumberElement
            className="form-control py-3"
            onChange={(e) => handleCardInputChange(e, "cardNumber")}
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  "::placeholder": {
                    color: "#9fabbc",
                  },
                },
              },
            }}
          />
          {cardNumberError && (
            <span className="error-message">{cardNumberError}</span>
          )}
        </label>
      </Form.Group>
      <Form.Group className="mt-3" controlId="exampleForm.ControlInput56">
        <label className="w-100">
          {/* Expiration date */}
          <CardExpiryElement
            className="form-control py-3"
            onChange={(e) => handleCardInputChange(e, "cardExpiry")}
          />
          {cardExpiryError && (
            <span className="error-message">{cardExpiryError}</span>
          )}
        </label>
      </Form.Group>
      <Form.Group className="mt-3" controlId="exampleForm.ControlInput56">
        <label className="w-100">
          {/* CVV */}
          <CardCvcElement
            className="form-control py-3"
            onChange={(e) => handleCardInputChange(e, "cardCvc")}
            options={{
              placeholder: "CVV",
              style: {
                base: {},
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          {cardCvcError && (
            <span className="error-message">{cardCvcError}</span>
          )}
        </label>
      </Form.Group>

      <Form.Group className="mt-3" controlId="exampleForm.ControlInput56">
        <Form.Control
          type="text"
          name="cardHolderName"
          placeholder="Name*"
          className="py-3"
          value={cardHolderName}
          onChange={(e) => handleOnChangeFields(e, "cardHolderName")}
        />
        {nameError && <span className="error-message">{nameError}</span>}
      </Form.Group>
      <Form.Group className="mt-3" controlId="exampleForm.ControlInput56">
        <Form.Select
          aria-label="Default select example"
          name="country"
          className="form-control py-3"
          value={country}
          onChange={(e) => handleOnChangeFields(e, "country")}
        >
          <option defaultValue="">Select Country</option>
          {COUNTRY_LIST_WITH_CODE.map((country, index) => {
            return (
              <option value={country.code} key={index}>
                {country.name}
              </option>
            );
          })}
        </Form.Select>
        {countryError && <span className="error-message">{countryError}</span>}
      </Form.Group>
      <Form.Group className="mt-3" controlId="exampleForm.ControlInput56">
        <Form.Control
          type="text"
          name="zipCode"
          placeholder="Postal Code*"
          className="py-3"
          value={zipCode}
          onChange={(e) => handleOnChangeFields(e, "zipCode")}
        />
        {zipCodeError && <span className="error-message">{zipCodeError}</span>}
      </Form.Group>

      <Button
        type="submit"
        onClick={handleCompleteOrder}
        className="btn btn-primary mt-3 py-3 px-5 w-100"
      >
        Subscribe
      </Button>
      <p className="text-center text-sm mt-3">
        By confirming your subscription, you allow Sightengine to charge your
        card for this payment and future payments in accordance with their
        terms. You can always cancel your subscription.
      </p>
    </div>
  );
}
