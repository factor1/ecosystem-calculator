import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

import { colors } from "../styles/theme";
import { FormikHandlers, FormikTouched, FormikErrors } from "formik";

interface Props {
  label: string;
  field: any;
  tooltip: string;
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
  max-width: 411px;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  flex-flow: row nowrap;
`;

const TooltipIcon = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  width: 20px;
  background: ${colors.lightGrey};
`;

const InputContainer = styled.div`
  display: flex;
  position: relative;
  flex: 1 1 100%;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0px 2px 2px #00000029;
  border-radius: 4px;
  height: 100%;
  padding-left: 15px;
  & input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Label = styled.label`
  font: 400 16px/19px Lato;
  letter-spacing: 0.4px;
  color: ${colors.blue};
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
`;

const ErrorMessage = styled.div`
  display: block;
  position: relative;
  font-weight: 600;
  color: red;
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
    <>
      <Container>
        <TooltipIcon data-tip={tooltip} />
        <ReactTooltip place="top" type="dark" effect="solid" />
        <InputContainer>
          <Label htmlFor={id}>{label}</Label>
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
    </>
  );
};

export default TableInput;
