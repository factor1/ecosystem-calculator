import React, { useContext } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { Heading3, Heading5, Heading4 } from "../common/Typography";
import { colors } from "../styles/theme";
import TableInput from "./TableInput";
import { CalculatorContext } from "~GlobalContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
  padding: 100px 0;
`;

const Savings = styled.div`
  display: block;
  position: relative;
  width: 100%;
  font: 600 96px/115px Lato;
  letter-spacing: 0;
  color: ${colors.green};
  text-align: center;
  margin-top: 7px;
  .grey {
    color: ${colors.lightGrey};
    font-weight: 400;
  }
`;

const TableHeading = styled.div`
  display: block;
  position: relative;
  width: 100%;
  margin-top: 50px;
  .ttu {
    text-transform: uppercase;
    margin-bottom: 0;
  }
  h4 {
    margin-top: 14px;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  position: relative;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  & > div {
    margin-bottom: 30px;
  }
`;

const Caluclate: React.FC = () => {
  const {
    hoursWorkedPerDay,
    averageDailyMiles,
    daysWorkedPerMonth,
    averageDailyIdling,
    yearlyInsurancePremium,
    averageVehicleMPG,
    insuranceDeductible,
    accidentsPerYear,
    fuelCost,
    handleFormSubmit
  } = useContext(CalculatorContext);
  return (
    <Container>
      <Heading3>Your Estimated Monthly Savings</Heading3>
      <Savings>
        <sup>$</sup> 2,478.<sup>96</sup>
        <sup className="grey">/mo</sup>
      </Savings>
      <TableHeading>
        <Heading5 className="ttu">Refine your estimated savings</Heading5>
        <Heading4>
          Enter your fleet data below to refine your estimated monthly savings.
        </Heading4>
      </TableHeading>
      <Formik
        enableReinitialize
        initialValues={{
          fuelCost,
          hoursWorkedPerDay,
          averageDailyMiles,
          daysWorkedPerMonth,
          averageDailyIdling,
          yearlyInsurancePremium,
          averageVehicleMPG,
          insuranceDeductible,
          accidentsPerYear
        }}
        validationSchema={Yup.object().shape({
          fuelCost: Yup.number()
            .positive()
            .required("Fuel cost is required"),
          hoursWorkedPerDay: Yup.number()
            .positive()
            .required("Hours Worked Per Day is required"),
          averageDailyMiles: Yup.number()
            .positive()
            .required("Average daily miles is required"),
          daysWorkedPerMonth: Yup.number()
            .positive()
            .required("Days worked per month is required"),
          averageDailyIdling: Yup.number()
            .positive()
            .required("Average daily idling is required"),
          yearlyInsurancePremium: Yup.number()
            .positive()
            .required("Yearly insurance premium is required"),
          averageVehicleMPG: Yup.number()
            .positive()
            .required("Average vehicle MPG is required"),
          insuranceDeductible: Yup.number()
            .positive()
            .required("Insurance deductible is required"),
          accidentsPerYear: Yup.number()
            .positive()
            .required("Accidents per year is required")
        })}
        onSubmit={(values, actions) => {
          handleFormSubmit(values);
          actions.setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting, handleSubmit }) => (
          <Form style={{ width: "100%" }}>
            <FormWrapper>
              <Field
                id="fuelCost"
                name="fuelCost"
                inputType="number"
                step="0.01"
                tooltip="Taken from the national average for diesel fuel"
                label="Fuel Cost per Gallon ($)"
                component={TableInput}
                errors={errors}
                touched={touched}
                handleSubmit={handleSubmit}
              />
              <Field
                id="hoursWorkedPerDay"
                name="hoursWorkedPerDay"
                inputType="number"
                tooltip="Taken from the national average for diesel fuel"
                label="Hours Worked per Day"
                component={TableInput}
                errors={errors}
                touched={touched}
                handleSubmit={handleSubmit}
              />
              <Field
                id="averageDailyMiles"
                name="averageDailyMiles"
                inputType="number"
                tooltip="Taken from the national average for diesel fuel"
                label="Average Daily Mileage"
                component={TableInput}
                errors={errors}
                touched={touched}
                handleSubmit={handleSubmit}
              />
              <Field
                id="daysWorkedPerMonth"
                name="daysWorkedPerMonth"
                inputType="number"
                tooltip="Taken from the national average for diesel fuel"
                label="Days Worked per Month"
                component={TableInput}
                errors={errors}
                touched={touched}
                handleSubmit={handleSubmit}
              />
              <Field
                id="averageDailyIdling"
                name="averageDailyIdling"
                inputType="number"
                tooltip="Taken from the national average for diesel fuel"
                label="Average Daily Idling"
                component={TableInput}
                errors={errors}
                touched={touched}
                handleSubmit={handleSubmit}
              />
              <Field
                id="yearlyInsurancePremium"
                name="yearlyInsurancePremium"
                inputType="number"
                tooltip="Taken from the national average for diesel fuel"
                label="Yearly Insurance Premium ($)"
                component={TableInput}
                errors={errors}
                touched={touched}
                handleSubmit={handleSubmit}
              />
              <Field
                id="averageVehicleMPG"
                name="averageVehicleMPG"
                inputType="number"
                tooltip="Taken from the national average for diesel fuel"
                label="Average Vehicle MPG"
                component={TableInput}
                errors={errors}
                touched={touched}
                handleSubmit={handleSubmit}
              />
              <Field
                id="insuranceDeductible"
                name="insuranceDeductible"
                inputType="number"
                tooltip="Taken from the national average for diesel fuel"
                label="Insurance Deductible ($)"
                component={TableInput}
                errors={errors}
                touched={touched}
                handleSubmit={handleSubmit}
              />
              <Field
                id="accidentsPerYear"
                name="accidentsPerYear"
                inputType="number"
                tooltip="Taken from the national average for diesel fuel"
                label="Accidents per Year"
                component={TableInput}
                errors={errors}
                touched={touched}
                handleSubmit={handleSubmit}
              />
            </FormWrapper>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Caluclate;
