import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { CalculatorContext } from "../GlobalContext";
import { colors } from "../styles/theme";
import { Heading2, Heading3 } from "../common/Typography";
import Card from "../common/Card";
import CardInput from "./CardInput";
import Button from "../common/Button";

const Home: React.FC = () => {
  const { setFleetSize } = useContext(CalculatorContext);

  const handleCalculate = () => {
    return null;
  };

  const handleFleetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const value = Number(e.target.value);
      setFleetSize(value);
    } catch (err) {
      console.error("Could not set fleet size: ", err);
    }
  };

  const handleWageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const value = e.target.value;
      console.log(value);
    } catch (err) {
      console.error("Could not set wage: ", err);
    }
  };

  const Container = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 64px 0;
    min-height: calc(100vh - 140px);
  `;

  const CardContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 567px;
    position: relative;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: stretch;
    margin-top: 50px;
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

  return (
    <Container>
      <Heading2>Savings Calculator</Heading2>
      <Heading3>Discover how much GPS Insight can save your fleet.</Heading3>
      <CardContainer>
        <Card width={241}>
          <CardTitle>Fleet Size</CardTitle>
          <CardInput onChange={handleFleetChange} placeholder="20" />
          <HelperText>Total Vehicles in Fleet</HelperText>
        </Card>
        <Card width={293}>
          <CardTitle>Average Wage</CardTitle>
          <CardInput useCurrency placeholder="56.72" />
          <HelperText>Average Wage per Hour</HelperText>
        </Card>
      </CardContainer>
      <Button
        to="/calculate"
        onClick={() => console.log("clicked")}
        style={{ marginTop: 55 }}
      >
        Calculate
      </Button>
    </Container>
  );
};

export default Home;
