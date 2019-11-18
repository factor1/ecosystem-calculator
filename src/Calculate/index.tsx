import React, { useContext } from "react";
import styled from "styled-components";

import { Heading3, Heading5, Heading4 } from "../common/Typography";
import { colors } from "../styles/theme";

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

const Caluclate: React.FC = () => {
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
    </Container>
  );
};

export default Caluclate;
