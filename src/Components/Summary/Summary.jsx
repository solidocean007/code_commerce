import { useState, useEffect } from "react";
import InputBase from "../Input/InputBase.jsx";
import ButtonBase from "../ButtonBase/ButtonBase.jsx";

import "./Summary.css";

const Summary = ({
  cartItems,
  stage,
  setStage,
  formIsValid,
  subTotalBill,
  shippingCost,
  fullTotal,
}) => {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handlePromoApply = () => {
    if (promoCode === "GAC10") {
      setDiscount(0.1);
    }
  };

  const getButtonTitle = () => {
    switch (stage) {
      case 0:
        return "Proceed to Shipping";
      case 1:
        return "Proceed to Payment";
      case 2:
        return "Finish Order";
      default:
        return "";
    }
  };

  return (
    <div className="cart-summary">
      <div className="cart-contents">
        {cartItems.map((item, quantity) => (
           item.quantity > 0 ? 
            <div className="summary-item" key={item.name}> {/* don't forget to add unique key prop */}
              <div className="item-img">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-details">
                <h5>{item.name}</h5>
                <h5>qty {item.quantity}</h5>
                <h5>${item.price}</h5>
              </div>
              <div className="item-subTotal">${item.quantity * item.price}</div>
            </div> 
            : null
        ))}
      </div>

      <div className="summary-details">
        <div className="promo-box">
          <h5>Promo: </h5>
          <InputBase
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button onClick={handlePromoApply}>Apply</button>
        </div>
        <div className="Sub-total">Subtotal: ${subTotalBill - discount}</div>
        <div>{`Shipping: ${
          shippingCost > 0 ? `$${shippingCost}` : "Free"
        }`}</div>
        <div>Total: ${fullTotal}</div>
      </div>
      <div className="summary-proceed-btn">
        {stage !== 2 && (
          <ButtonBase
            onClick={() => {
              setStage((stage) => stage + 1);
              window.scrollTo(0, 0);
            }}
            buttonTitle={getButtonTitle()}
            disabled={!formIsValid && stage === 1}
          />
        )}
      </div>
    </div>
  );

};

export default Summary;
