import React, { useState } from "react";
import "./ShippingModal.css";
import InputBase from "../Input/InputBase";
import { handleInput, validateInput } from "../utilities/handleChanges";
import { countries } from "./shipping_data";
import { states } from "./state_data";
import { address_data } from "./address_data";
import ShipMethod from "./Ship_Method/ShipMethod";

const ShippingModal = ({
  setFormIsValid,
  method,
  setMethod,
  setShippingCost,
  setStage,
  stage,
  ...otherProps
}) => {
  const [errors, setErrors] = useState({});
  const [addressInputs, setAddressInputs] = useState({
    WholeName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    country: "US",
    state: "",
  });

  const handleShippingMethod = (selectedMethod) => {
    setMethod(selectedMethod); // Update the shipping method state variable.
    if (selectedMethod === "express") {
      setShippingCost(20);
    } else {
      setShippingCost(0);
    }
  };

  // Update error state
  const updateErrors = (name, value) => {
    const validationError = validateInput(name, value, addressInputs);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationError,
    }));
  };

  // Check form validity
  const checkFormValidity = (name, value) => {
    const allFieldsFilled = Object.values({
      ...addressInputs,
      [name]: value,
    }).every((input) => input !== "");

    const noErrors = Object.values({
      ...errors,
      [name]: validateInput(name, value, addressInputs),
    }).every((error) => error === "");

    setFormIsValid(allFieldsFilled && noErrors);
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    updateErrors(name, value);
    checkFormValidity(name, value);
  };

  return (
    <div className="shipment-modal">
      <div className="shipping-title">SHIPPING INFORMATION</div>

      <form>
        <div className="shipping-details">
          {address_data.map((input) => {
            return (
              <div className="address-details" key={input.name}>
                <label htmlFor="">{input.label}</label>
                <InputBase
                  value={addressInputs[input.name]}
                  onChange={handleInput(setAddressInputs)}
                  name={input.name}
                  onBlur={handleBlur}
                  type={input.type}
                />
                {errors[input.name] && (
                  <div className="error-div">{errors[input.name]}</div>
                )}
              </div>
            );
          })}
          <div className="region-details">
            <h4>Country</h4>
            <select
              name="country"
              id="country"
              value={addressInputs.country}
              onChange={handleInput(setAddressInputs)}
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>

            <h4>State</h4>
            <select
              name="state"
              id="state"
              value={addressInputs.state}
              onChange={handleInput(setAddressInputs)}
            >
              {states.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div className="ship-method-panel">
            <ShipMethod
              handleShippingMethod={handleShippingMethod}
              method={method}
              setMethod={setMethod}
              setStage={setStage}
              stage={stage}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShippingModal;
