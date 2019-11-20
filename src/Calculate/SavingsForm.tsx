import React, { useEffect } from "react";
import styled from "styled-components";

import { Heading3, Heading5 } from "../common/Typography";

const Container = styled.div`
  width: 100%;
  margin-top: 132px;
`;

const SavingsForm: React.FC = () => {
  useEffect(() => {
    // @ts-ignore
    if (MktoForms2) {
      // @ts-ignore
      MktoForms2.loadForm("//app-ab07.marketo.com", "920-LJZ-738", 2200);
      // @ts-ignore
      MktoForms2.whenReady(function(mktoForm) {
        const customFormData = {
          formSelector: "#test-form",
          fieldMap: [
            {
              marketo: "Email",
              custom: "email"
            },
            {
              marketo: "AnotherField__c",
              custom: "AnOtHeRfIeLd"
            }
          ]
        };

        const formEl = document.querySelector(customFormData.formSelector);

        if (formEl) {
          formEl.addEventListener("submit", function(e) {
            let customForm: any = e.target,
              mktoFields: any = {};

            // iterate over fields on custom form to create MktoForms-compat object
            customFormData.fieldMap.forEach(function(field) {
              mktoFields[field.marketo] = customForm.querySelector(
                "input[name='" + field.custom + "']"
              ).value;
            });

            // add to Marketo form
            mktoForm.addHiddenFields(mktoFields);

            // submit Marketo form
            mktoForm.submit();

            // stop custom HTML form submission
            e.preventDefault();
          });
        }
      });
    }
  }, []);

  return (
    <Container>
      <Heading3 textAlign="center">Send Me the Savings!</Heading3>
      <Heading5>
        Tell us a little bit about yourself and we'll email you a copy of your
        savings analysis.
      </Heading5>
      <form id="mktoForm_2200" style={{ display: "none" }}></form>

      <form id="test-form">
        <input name="email" type="text" />
        <input name="AnOtHeRfIeLd" type="text" />
        <input name="submit" type="submit" />
      </form>
    </Container>
  );
};

export default SavingsForm;
