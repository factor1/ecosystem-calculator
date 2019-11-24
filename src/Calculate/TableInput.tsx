import React from "react";
import styled from "styled-components";

import { colors } from "../styles/theme";
import { FormikTouched, FormikErrors } from "formik"; // eslint-disable-line
import ToolTipIcon from "../common/ToolTipIcon";

interface Props {
  label: string;
  field: any;
  tooltip?: string;
  id: string;
  name: string;
  inputType: string;
  step?: string | number;
  handleSubmit: Function;
  touched: FormikTouched<any>;
  errors: FormikErrors<any>;
}

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  flex-flow: row nowrap;
  @media screen and (max-width: 820px) {
    max-width: 100%;
    height: 41px;
  }

  .labelMobileOnly {
    display: flex;
    @media screen and (min-width: 769px) {
      display: none;
    }
  }
`;

const InputContainer = styled.div`
  display: flex;
  position: relative;
  flex: 1 1 100%;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0px 2px 2px #0000003d;
  border-radius: 4px;
  height: 100%;
  padding-left: 15px;
  & input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media screen and (max-width: 768px) {
    padding-left: 10px;
  }
`;

const Label = styled.label`
  font: 400 16px/19px Lato;
  letter-spacing: 0.4px;
  color: ${colors.blue};
  @media screen and (max-width: 768px) {
    font: 400 14px/17px Lato;
    letter-spacing: 0.35px;
  }
`;

const Input = styled.input`
  display: block;
  position: relative;
  background-color: ${colors.lightGrey};
  appearance: none;
  text-align: right;
  font: 400 20px/24px Lato;
  letter-spacing: 0.5px;
  color: ${colors.blue};
  border: none;
  height: 100%;
  width: 148px;
  padding-right: 19px;
  -moz-appearance: textfield;

  @media screen and (max-width: 768px) {
    font: 400 14px/17px Lato;
    letter-spacing: 0.35px;
    width: 105px;
  }
`;

const ErrorMessage = styled.div`
  display: block;
  position: relative;
  font-weight: 600;
  color: red;
  margin: 12px 0 0 48px;
`;

const Root = styled.div`
  width: 100%;
  @media screen and (min-width: 768px) {
    padding: 0 50px;
  }
  @media screen and (min-width: 1024px) {
    max-width: 420px;
    padding: 0;
  }
`;

const TableInput: React.FC<Props> = ({
  label,
  field,
  tooltip,
  id,
  name,
  inputType,
  step,
  handleSubmit,
  touched,
  errors
}) => {
  const handleBlur = (e: React.MouseEvent) => {
    field.onBlur(e);
    return handleSubmit();
  };

  return (
    <Root>
      <Container>
        {tooltip ? (
          <ToolTipIcon
            className="hideMobile"
            dataTip={tooltip}
            style={{ marginRight: 18 }}
          />
        ) : (
          <div
            className="hideMobile"
            style={{ height: "100%", width: 20, marginRight: 18 }}
          />
        )}
        <InputContainer>
          <div className="labelMobileOnly">
            {tooltip ? (
              <ToolTipIcon
                className="mobileOnly"
                dataTip={tooltip}
                style={{ marginRight: 12 }}
              />
            ) : (
              <div
                className="mobileOnly"
                style={{ height: "100%", width: 20, marginRight: 12 }}
              />
            )}
            <Label htmlFor={id}>{label}</Label>{" "}
          </div>
          <Label className="hideMobile" htmlFor={id}>
            {label}
          </Label>{" "}
          <Input
            type={inputType}
            id={id}
            step={step}
            name={name}
            {...field}
            onBlur={handleBlur}
          />
        </InputContainer>
      </Container>
      {touched[field.name] && errors[field.name] ? (
        <ErrorMessage>{errors[field.name]}</ErrorMessage>
      ) : null}
    </Root>
  );
};

export default TableInput;
