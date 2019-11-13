import React, { useContext } from "react";
import styled from "styled-components";

import { colors } from "../styles/theme";
// @ts-ignore
import ReactCurrencyInput from "./react-currency-input.js";
import { CalculatorContext } from "~GlobalContext";

interface Props {
  placeholder: string;
  useCurrency?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const CardInput: React.FC<Props> = ({ placeholder, useCurrency, onChange }) => {
  const { fleetSize } = useContext(CalculatorContext);

  const StyledInput = styled.div`
    width: 100%;
    margin-top: 12px;
    & input {
      appearance: none;
      border: none;
      border-bottom: 2px solid ${colors.darkGrey};
      color: ${colors.blue};
      font: 400 72px/86px Lato;
      letter-spacing: 0;
      text-align: center;
      padding-bottom: 24px;
      height: 86px;
      width: 100%;
      &::placeholder {
        color: ${colors.lightGrey};
      }
    }
    & input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `;

  if (useCurrency) {
    return (
      <StyledInput>
        <ReactCurrencyInput
          prefix="$"
          value="$56.72"
          placeholder={placeholder}
          onChange={onChange}
        />
      </StyledInput>
    );
  }

  return (
    <StyledInput>
      <input
        type="number"
        placeholder={placeholder}
        onChange={onChange}
        value={fleetSize || undefined}
      />
    </StyledInput>
  );
};

export default CardInput;
