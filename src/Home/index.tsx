import React, { useContext } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import isEmpty from "lodash/isEmpty";

import { CalculatorContext } from "../GlobalContext";
import { colors } from "../styles/theme";
import { Heading2, Heading5 } from "../common/Typography";
import Card from "../common/Card";
import CardInput from "./CardInput";
import Button from "../common/Button";

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 64px 0;
  min-height: calc(100vh - 140px);
  text-align: center;

  @media screen and (max-width: 768px) {
    padding: 64px 18px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  flex-flow: column;
  & > div + div {
    margin-top: 34px;
  }
  @media screen and (min-width: 768px) {
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: stretch;
    margin: 50px auto 0;
    & > div + div {
      margin-left: 34px;
      margin-top: 0;
    }
  }
`;

const CardTitle = styled.span`
  display: block;
  text-align: center;
  font: 300 36px/44px Lato;
  letter-spacing: 0.9px;
  @media screen and (max-width: 768px) {
    font: 300 24px/29px Lato;
    letter-spacing: 0.6px;
  }
`;

const HelperText = styled.span`
  display: block;
  position: relative;
  text-align: center;
  font: Light 14px/17px Lato;
  letter-spacing: 0;
  color: ${colors.midGrey};
  margin-top: 20px;
`;

interface Props {
  history: {
    push: (value: string) => void;
  };
}

const Home: React.FC<Props> = ({ history: { push } }) => {
  const { handleInitialFormSubmit } = useContext(CalculatorContext);
  return (
    <Container>
      <Heading2>Savings Calculator</Heading2>
      <Heading5>Discover how much GPS Insight can save your fleet.</Heading5>
      <Formik
        initialValues={{
          fleetSize: "",
          averageWage: ""
        }}
        validationSchema={Yup.object().shape({
          fleetSize: Yup.number()
            .positive("Fleet Size Must be a Positive Number")
            .required("Fleet Size is Required"),
          averageWage: Yup.number()
            .positive("Average Wage Must be a Positive Number")
            .required("Average Wage is Required")
        })}
        onSubmit={(values, actions) => {
          handleInitialFormSubmit(values);
          actions.setSubmitting(false);
          return push("/calculate");
        }}
      >
        {({ errors, touched, isSubmitting, isValid }) => (
          <Form>
            <CardContainer>
              <Card width={241}>
                <CardTitle>Fleet Size</CardTitle>
                <Field
                  id="fleetSize"
                  name="fleetSize"
                  component={CardInput}
                  errors={errors}
                  touched={touched}
                />
                <HelperText>Total Vehicles in Fleet</HelperText>
              </Card>
              <Card width={293}>
                <CardTitle>Average Wage</CardTitle>
                <Field
                  id="averageWage"
                  name="averageWage"
                  useCurrency
                  component={CardInput}
                  errors={errors}
                  touched={touched}
                />
                <HelperText>Average Wage per Hour</HelperText>
              </Card>
            </CardContainer>
            <Button
              type="submit"
              style={{ marginTop: 55 }}
              disabled={isSubmitting || !isValid || isEmpty(touched)}
            >
              Calculate
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Home;
