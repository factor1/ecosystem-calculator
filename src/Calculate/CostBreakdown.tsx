import React, { useContext } from "react";
import styled from "styled-components";

import { colors } from "../styles/theme";
import { Heading3, Paragraph } from "../common/Typography";
import ToolTipIcon from "../common/ToolTipIcon";
import { CalculatorContext } from "../GlobalContext";

const Container = styled.div`
  display: block;
  position: relative;
  width: 100%;
  text-align: center;
  margin-top: 110px;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 20px auto 275px 275px;
  grid-template-rows: auto;
  grid-gap: 38px 0;
  margin-top: 50px;
`;

const BeforeHeading = styled.div`
  grid-column-start: 3;
  text-align: right;
  font: 600 16px/19px Lato;
  letter-spacing: 0.4px;
  color: ${colors.midGrey};
  text-transform: uppercase;
  align-self: center;
`;

const AfterHeading = styled.div`
  text-align: right;
  font: 600 16px/19px Lato;
  letter-spacing: 0.4px;
  color: ${colors.green};
  text-transform: uppercase;
  align-self: center;
`;

const RowLabel = styled.div`
  padding-left: 34px;
  align-self: center;
  & p {
    margin: 0;
  }
`;

const BeforeValue = styled.div`
  text-align: right;
  font: 400 20px/24px Lato;
  letter-spacing: 0.5px;
  color: ${colors.black};
  align-self: center;
`;

const AfterValue = styled.div`
  text-align: right;
  font: 400 20px/24px Lato;
  letter-spacing: 0.5px;
  color: ${colors.green};
  align-self: center;
`;

const MonthlySavings = styled.div`
  text-align: right;
  font: 900 28px/34px Lato;
  letter-spacing: 0.7px;
  color: ${colors.green};
`;

const Divider = styled.div`
  height: 1px;
  background: ${colors.midGrey};
  grid-column: 1 / span 4;
`;

const CostBreakdown: React.FC = () => {
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
    monthlySavings
  } = useContext(CalculatorContext);

  const formatNumber = (number: number) => {
    return Number(number).toFixed(2);
  };

  return (
    <Container>
      <Heading3>Cost Breakdown Analysis</Heading3>
      <Grid>
        <BeforeHeading>Cost Before GPS Insight</BeforeHeading>
        <AfterHeading>Cost After GPS Insight</AfterHeading>

        {/* Cost of GPS Insight */}
        <ToolTipIcon dataTip="Some info goes here" />
        <RowLabel>
          <Paragraph color={colors.midGrey}>Cost of GPS Insight</Paragraph>
        </RowLabel>
        <BeforeValue>{""}</BeforeValue>
        <AfterValue>${formatNumber(gpsInsightCost)}</AfterValue>
        <Divider />

        {/* Idling */}
        <ToolTipIcon dataTip="Some info goes here" />
        <RowLabel>
          <Paragraph color={colors.midGrey}>Idling</Paragraph>
        </RowLabel>
        <BeforeValue>${formatNumber(idleCostBefore)}</BeforeValue>
        <AfterValue>${formatNumber(idleCostAfter)}</AfterValue>
        <Divider />

        {/* Fuel Costs */}
        <ToolTipIcon dataTip="Some info goes here" />
        <RowLabel>
          <Paragraph color={colors.midGrey}>Fuel Costs</Paragraph>
        </RowLabel>
        <BeforeValue>${formatNumber(fuelCostBefore)}</BeforeValue>
        <AfterValue>${formatNumber(fuelCostAfter)}</AfterValue>
        <Divider />

        {/* Maintenance, Wear and Tear */}
        <ToolTipIcon dataTip="Some info goes here" />
        <RowLabel>
          <Paragraph color={colors.midGrey}>
            Maintenance, Wear and Tear
          </Paragraph>
        </RowLabel>
        <BeforeValue>${formatNumber(maintenanceBefore)}</BeforeValue>
        <AfterValue>${formatNumber(maintenanceAfter)}</AfterValue>
        <Divider />

        {/* Productivity Lost */}
        <ToolTipIcon dataTip="Some info goes here" />
        <RowLabel>
          <Paragraph color={colors.midGrey}>Productivity Lost</Paragraph>
        </RowLabel>
        <BeforeValue>${formatNumber(productivityLostBefore)}</BeforeValue>
        <AfterValue>${formatNumber(productivityLostAfter)}</AfterValue>
        <Divider />

        {/* Out of Pocket Accident Cost */}
        <ToolTipIcon dataTip="Some info goes here" />
        <RowLabel>
          <Paragraph color={colors.midGrey}>
            Out of Pocket Accident Cost
          </Paragraph>
        </RowLabel>
        <BeforeValue>${formatNumber(accidentCostBefore)}</BeforeValue>
        <AfterValue>${formatNumber(accidentCostAfter)}</AfterValue>
        <Divider />

        {/* Total*/}
        <ToolTipIcon dataTip="Some info goes here" />
        <RowLabel>
          <Paragraph color={colors.midGrey}>Total</Paragraph>
        </RowLabel>
        <BeforeValue>${formatNumber(totalCostBefore)}</BeforeValue>
        <AfterValue>${formatNumber(totalCostAfter)}</AfterValue>
        <Divider />

        {/* Monthly Savings */}
        <ToolTipIcon dataTip="Some info goes here" />
        <RowLabel>
          <Paragraph color={colors.green}>Monthly Savings</Paragraph>
        </RowLabel>
        <BeforeValue>{""}</BeforeValue>
        <MonthlySavings>${formatNumber(monthlySavings)}</MonthlySavings>
        <Divider />
      </Grid>
    </Container>
  );
};

export default CostBreakdown;
