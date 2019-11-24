// @ts-nocheck
import React from "react";
import styled from "styled-components";

interface Props {
  children: any;
  width: number; // desktop width only
}

const Wrapper = styled.div`
  position: relative;
  background-color: #fff;
  box-shadow: 0px 3px 6px #0000003d;
  border-radius: 8px;
  padding: 24px;
  width: 100%;
  max-width: 241px;
  @media screen and (min-width: 769px) {
    border-radius: 4px;
    max-width: ${props => props.width}px;
  }
`;

const Card: React.FC<Props> = ({ children, width }) => {
  // @ts-ignore
  return <Wrapper width={width}>{children}</Wrapper>;
};

export default Card;
