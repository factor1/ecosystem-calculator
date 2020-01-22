import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import isEmpty from "lodash/isEmpty";
import queryString from "query-string";

import { CalculatorContext } from "../GlobalContext";
import { colors } from "../styles/theme";
import { Heading2, Heading5 } from "../common/Typography";
import Card from "../common/Card";
import CardInput from "./CardInput";

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 64px 0;
  min-height: calc(100vh - 140px);
  text-align: center;

  @media screen and (max-width: 768px) {
    padding: 0 18px 64px;
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
  location: {
    search: string;
  };
}

const Home: React.FC<Props> = ({ history: { push }, location: { search } }) => {
  const { handleInitialFormSubmit, handleInsideSale } = useContext(
    CalculatorContext
  );

  useEffect(() => {
    const queryStrings: any = queryString.parse(search);

    if (queryStrings.insideSale) {
      return handleInsideSale(true);
    }
  }, [search]);
  return (
    <Container>
      <Heading2>Savings Calculator</Heading2>
      <Heading5>Discover how much GPS Insight can save your fleet.</Heading5>
      <Formik
        enableReinitialize
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
            <div className="submit-btn">
              <input
                type="submit"
                style={{ marginTop: 55, zIndex: 99 }}
                disabled={isSubmitting || !isValid || isEmpty(touched)}
                value="Submit"
              />
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Home;
