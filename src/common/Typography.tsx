import React from "react";
import styled from "styled-components";

import { colors } from "../styles/theme";

interface TypographyProps {
  children: any;
  textAlign: "left" | "center" | "right";
  className: any;
}

export const Heading2: React.FC<TypographyProps> = ({
  children,
  textAlign = "left",
  className
}) => {
  const Heading = styled.h2`
    font: Light 64px/77px Lato;
    text-align: ${textAlign};
    letter-spacing: 1.6px;
    color: ${colors.black};
  `;

  return <Heading className={className}>{children}</Heading>;
};

export const Heading3: React.FC<TypographyProps> = ({
  children,
  textAlign = "center",
  className
}) => {
  const Heading = styled.h3`
    font: Medium 24px/29px Lato;
    text-align: ${textAlign};
    letter-spacing: 0.6px;
  `;

  return <Heading className={className}>{children}</Heading>;
};

export const Heading4: React.FC<TypographyProps> = ({
  children,
  textAlign = "center",
  className
}) => {
  const Heading = styled.h4`
    font: Medium 24px/29px Lato;
    letter-spacing: 0.6px;
    color: ${colors.midGrey};
    text-align: ${textAlign};
  `;

  return <Heading className={className}>{children}</Heading>;
};

export const Paragraph: React.FC<TypographyProps> = ({
  children,
  textAlign = "left",
  className
}) => {
  const Text = styled.p`
    font: Medium 16px/19px Lato;
    letter-spacing: 0.4px;
    text-align: ${textAlign};
  `;

  return <Text className={className}>{children}</Text>;
};
