import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Heading2, Heading3 } from "../common/Typography";
import Card from "../common/Card";
import CardInput from "./CardInput";

const Home: React.FC = () => {
  const Container = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 64px 0;
    min-height: 100vh;
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

  return (
    <Container>
      <Heading2>Savings Calculator</Heading2>
      <Heading3>Discover how much GPS Insight can save your fleet.</Heading3>
      <CardContainer>
        <Card width={241}>
          <CardTitle>Fleet Size</CardTitle>
          <CardInput placeholder="20" />
        </Card>
        <Card width={293}>
          <CardTitle>Average Wage</CardTitle>
        </Card>
      </CardContainer>
    </Container>
  );
};

export default Home;
