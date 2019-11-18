import React, { useContext } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { CalculatorContext } from "../GlobalContext";
import { colors } from "../styles/theme";
import { Heading2, Heading3 } from "../common/Typography";
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
`;

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 567px;
  position: relative;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: stretch;
  margin: 50px auto 0;
`;

const CardTitle = styled.span`
  display: block;
  text-align: center;
  font: 300 36px/44px Lato;
  letter-spacing: 0.9px;
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
  setFleetSize: (value: number) => void;
  setAverageWage: (value: number) => void;
}

const Home: React.FC<Props> = () => {
  const { setFleetSize, setAverageWage } = useContext(CalculatorContext);

  const handleCalculate = () => {
    return null;
  };

  return (
    <Container>
      <Heading2>Savings Calculator</Heading2>
      <Heading3>Discover how much GPS Insight can save your fleet.</Heading3>
      <Formik
        initialValues={{
          fleetSize: "",
          averageWage: 56.72
        }}
        validationSchema={Yup.object().shape({
          fleetSize: Yup.number()
            .positive()
            .required("Fleet size is required"),
          averageWage: Yup.number()
            .positive()
            .required("Average wage is required")
        })}
        onSubmit={(values, actions) => {
          console.log(values);
          setFleetSize(values.fleetSize);
          setAverageWage(values.averageWage);
          actions.setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Form>
            <CardContainer>
              <Card width={241}>
                <CardTitle>Fleet Size</CardTitle>
                <Field
                  id="fleetSize"
                  name="fleetSize"
                  placeholder="20"
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
              disabled={isSubmitting}
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
