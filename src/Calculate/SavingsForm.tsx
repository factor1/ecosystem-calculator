import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import isEmpty from "lodash/isEmpty";

import { Heading3, Heading5, Heading2 } from "../common/Typography";
import FormInput from "./FormInput";
import { CalculatorContext } from "../GlobalContext";

const Container = styled.div`
  width: 100%;
  margin-top: 132px;
  @media screen and (max-width: 768px) {
    margin-top: 80px;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 48px;
  & > div {
    margin-bottom: 19px;
  }
`;

const SavingsForm: React.FC = () => {
  useEffect(() => {
    // @ts-ignore
    if (MktoForms2) {
      // @ts-ignore
      MktoForms2.loadForm("//app-ab10.marketo.com", "733-VUN-667", 1628);
    }
  }, []);

  const {
    idleCostBefore,
    idleCostAfter,
    gpsInsightCost,
    fuelCostBefore,
    fuelCostAfter,
    maintenanceBefore,
    maintenanceAfter,
    productivityLostBefore,
    productivityLostAfter,
    accidentCostBefore,
    accidentCostAfter,
    totalCostBefore,
    totalCostAfter,
    monthlySavings,
    fleetSize,
    averageWage,
    fuelCost,
    hoursWorkedPerDay,
    averageDailyMiles,
    daysWorkedPerMonth,
    averageDailyIdling,
    yearlyInsurancePremium,
    averageVehicleMPG,
    insuranceDeductible,
    accidentsPerYear
  } = useContext(CalculatorContext);

  return (
    <Container>
      <Heading3 className="hideMobile" textAlign="center">
        Send Me the Savings!
      </Heading3>
      <Heading5 className="hideMobile">
        {`Tell us a little bit about yourself and we'll email you a copy of your
        savings analysis.`}
      </Heading5>
      <Heading2 className="mobileOnly">
        See how we calculated your results with a detailed cost analysis
        breakdown.
      </Heading2>
      <form id="mktoForm_1628" style={{ display: "none" }}></form>

      <Formik
        enableReinitialize
        initialValues={{
          Email: "",
          FirstName: "",
          LastName: "",
          companyNameOnContact: "",
          rOICalcAccidentsperYearROI: accidentsPerYear,
          rOICalcAnnualInsurance: yearlyInsurancePremium,
          rOICalcAvgDailyIdlingMinperVehicle: averageDailyIdling,
          rOICalcAvgDailyMileageperVehicle: averageDailyMiles,
          rOICalcAvgHourlyWage: averageWage,
          rOICalcAvgVehicleMPG: averageVehicleMPG,
          rOICalcDaysWorkedperMonth: daysWorkedPerMonth,
          rOICalcFleetSize: fleetSize,
          rOICalcFuelCost: fuelCost,
          rOICalcHoursWorkedperDay: hoursWorkedPerDay,
          rOICalcInsuranceDeductible: insuranceDeductible,
          rOICalcOutputAccidentCostAfter: accidentCostAfter,
          rOICalcOutputAccidentCostBefore: accidentCostBefore,
          rOICalcOutputFuelCostsBefore: fuelCostBefore,
          rOICalcOutputFulesCostsAfter: fuelCostAfter,
          rOICalcOutputGPSInsightCostAfter: gpsInsightCost,
          rOICalcOutputIdlingAfter: idleCostAfter,
          rOICalcOutputIdlingBefore: idleCostBefore,
          rOICalcOutputMaintenanceAfter: maintenanceAfter,
          rOICalcOutputMaintenanceBefore: maintenanceBefore,
          rOICalcOutputProductivityLostAfter: productivityLostAfter,
          rOICalcOutputProductivityLostBefore: productivityLostBefore,
          rOICalcOutputTotalAfter: totalCostAfter,
          rOICalcOutputTotalBefore: totalCostBefore,
          rOICalcOutputTotalDelta: monthlySavings
        }}
        validationSchema={Yup.object().shape({
          Email: Yup.string()
            .email()
            .required("Email is required"),
          FirstName: Yup.string().required("First name is required"),
          LastName: Yup.string().required("Last name is required"),
          companyNameOnContact: Yup.string().required(
            "Company name is required"
          )
        })}
        onSubmit={(values, actions) => {
          try {
            // @ts-ignore
            MktoForms2.whenReady(function(mktoForm: any) {
              mktoForm.addHiddenFields(values);
              mktoForm.submit();
              mktoForm.onSuccess(() => {
                actions.setSubmitting(false);
                console.log("Form data sent");
              });
            });
          } catch (error) {
            console.error("There was an error submitting to marketo: ", error);
          }
        }}
      >
        {({ errors, touched, isSubmitting, isValid }) => (
          <Form id="formikForm" style={{ width: "100%" }}>
            <FormContainer>
              <Field
                id="FirstName"
                name="FirstName"
                touched={touched}
                errors={errors}
                label="First Name"
                component={FormInput}
              />
              <Field
                id="LastName"
                name="LastName"
                touched={touched}
                errors={errors}
                label="Last Name"
                component={FormInput}
              />
              <Field
                id="companyNameOnContact"
                name="companyNameOnContact"
                touched={touched}
                errors={errors}
                label="Company"
                component={FormInput}
              />
              <Field
                id="Email"
                name="Email"
                touched={touched}
                errors={errors}
                label="Email"
                type="email"
                component={FormInput}
              />
              <div className="submit-btn">
                <input
                  style={{ marginTop: 30 }}
                  type="submit"
                  disabled={!isValid || isSubmitting || isEmpty(touched)}
                  value="Submit"
                />
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SavingsForm;
