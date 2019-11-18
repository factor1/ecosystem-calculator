import React, { useContext } from "react";
import styled from "styled-components";

import { Heading2 } from "../common/Typography";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
`;

const Caluclate: React.FC = () => {
  return (
    <Container>
      <Heading2>Your Estimated Monthly Savings</Heading2>
    </Container>
  );
};

export default Caluclate;
