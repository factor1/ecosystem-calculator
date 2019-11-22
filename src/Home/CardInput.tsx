import React from "react";
import styled from "styled-components";

import { colors } from "../styles/theme";
import { FormikTouched, FormikErrors } from "formik"; // eslint-disable-line no-unused-vars

interface Props {
  placeholder: string;
  useCurrency?: boolean;
  name: string;
  id: string;
  field?: any;
  touched: FormikTouched<any>;
  errors: FormikErrors<any>;
}

const StyledInput = styled.div`
  display: flex;
  flex-flow: row no-wrap;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  margin-top: 12px;
  border-bottom: 2px solid ${colors.darkGrey};
  & input {
    appearance: none;
    border: none;
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
  .currencyIndicator {
    color: ${colors.blue};
    font: 400 72px/86px Lato;
    letter-spacing: 0;
    padding-bottom: 0;
  }

  @media screen and (max-width: 768px) {
    & input {
      font: 400 48px/57px Lato;
      letter-spacing: 0;
      height: 72px;
    }
    .currencyIndicator {
      position: absolute;
      font-size: 24px;
      top: -15px;
    }
  }
`;

const ErrorWrapper = styled.div`
  display: block;
  flex: 1 1 100%;
  font-size: 14px;
  font-weight: bold;
  color: #ff0000;
`;

const CardInput: React.FC<Props> = ({
  placeholder,
  useCurrency,
  name,
  id,
  field,
  touched,
  errors
}: Props) => {
  if (useCurrency) {
    return (
      <>
        <StyledInput>
          <div className="currencyIndicator">$</div>
          <input
            id={id}
            type="number"
            min="0.01"
            step="0.01"
            name={name}
            placeholder={placeholder}
            style={{ paddingBottom: 0, marginBottom: 0 }}
            {...field}
          />
        </StyledInput>
        {errors[id] && touched[id] ? (
          <ErrorWrapper>{errors[id]}</ErrorWrapper>
        ) : null}
      </>
    );
  }

  return (
    <>
      <StyledInput>
        <input
          id={id}
          name={name}
          type="number"
          placeholder={placeholder}
          {...field}
        />
      </StyledInput>
      {errors[id] && touched[id] ? (
        <ErrorWrapper>{errors[id]}</ErrorWrapper>
      ) : null}
    </>
  );
};

export default CardInput;
