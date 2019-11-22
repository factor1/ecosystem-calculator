import React from "react";
import styled from "styled-components";
import { FormikErrors, FormikTouched } from "formik";

import { colors } from "../styles/theme";

interface Props {
  name: string;
  type?: string;
  id: string;
  touched: FormikTouched<any>;
  errors: FormikErrors<any>;
  label: string;
  field: any;
}

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  max-width: 608px;
  height: 61px;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 2px #00000029;
  border-radius: 4px;
  background: #fff;

  @media screen and (max-width: 768px) {
    max-width: 380px;
    height: 41px;
  }
`;

const Label = styled.label`
  text-align: left;
  font: 400 16px/19px Lato;
  letter-spacing: 0.4px;
  flex: 0 1 208px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: ${colors.midGrey};
  padding-left: 30px;

  @media screen and (max-width: 768px) {
    font: 400 14px/17px Lato;
    letter-spacing: 0.35px;
    color: ${colors.blue};
  }
`;

const Input = styled.input`
  flex: 0 1 401px;
  height: 100%;
  appearance: none;
  border: none;
  border-radius: 0px 4px 4px 0px;
  background-color: ${colors.lightGrey};
  font: 400 20px/24px Lato;
  color: ${colors.blue};
  text-align: right;
  padding-right: 30px;

  @media screen and (max-width: 768px) {
    font: 400 14px/17px Lato;
    letter-spacing: 0.35px;
  }
`;

const ErrorMessage = styled.div`
  display: block;
  position: relative;
  color: #ff0000;
  font-weight: bold;
`;

const FormInput: React.FC<Props> = ({
  id,
  label,
  type = "text",
  name,
  field,
  touched,
  errors
}) => {
  return (
    <>
      <Container>
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} type={type} name={name} {...field} />
      </Container>
      {touched[field.name] && errors[field.name] ? (
        <ErrorMessage>{errors[field.name]}</ErrorMessage>
      ) : null}
    </>
  );
};

export default FormInput;
