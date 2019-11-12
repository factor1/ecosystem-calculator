import React from "react";
import styled from "styled-components";

import { colors } from "../styles/theme";

interface Props {
  placeholder: string;
}

const CardInput: React.FC<Props> = ({ placeholder }) => {
  const StyledInput = styled.input`
    appearance: none;
    border: none;
    border-bottom: 2px solid ${colors.darkGrey};
    width: 100%;
    font: 400 72px/86px Lato;
    letter-spacing: 0;
    text-align: center;
  `;

  return <StyledInput type="text" placeholder={placeholder} />;
};

export default CardInput;
