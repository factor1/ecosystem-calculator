import React from "react";
import styled from "styled-components";

interface Heading2Props {
  children: any;
}

export const Heading2: React.FC<Heading2Props> = ({ children }) => {
  const Heading = styled.div`
    display: inline-block;
    position: relative;
    margin: 0 auto;
    font: Light 64px/77px Lato;
    letter-spacing: 1.6px;
  `;

  return <Heading>{children}</Heading>;
};
