import React from "react";
import styled from "styled-components";

import { colors } from "../styles/theme";

interface TypographyProps {
  textAlign?: "left" | "center" | "right";
  className?: any;
  children: any;
  color?: string;
}

export const Heading2: React.FC<TypographyProps> = ({
  textAlign = "left",
  className,
  children,
  color
}) => {
  const Heading = styled.h2`
    margin: 0 auto 30px;
    font: 300 64px/77px Lato;
    text-align: ${textAlign};
    letter-spacing: 1.6px;
    color: ${color ? color : colors.black};
  `;

  return <Heading className={className}>{children}</Heading>;
};

export const Heading3: React.FC<TypographyProps> = ({
  children,
  textAlign = "center",
  className,
  color
}) => {
  const Heading = styled.h3`
    margin: 0 auto 12px;
    font: 300 48px/57px Lato;
    text-align: ${textAlign};
    letter-spacing: 1.2px;
    color: ${color ? color : colors.black};
  `;

  return <Heading className={className}>{children}</Heading>;
};

export const Heading4: React.FC<TypographyProps> = ({
  children,
  textAlign = "center",
  className,
  color
}) => {
  const Heading = styled.h4`
    font: 400 24px/29px Lato;
    letter-spacing: 0.6px;
    text-align: ${textAlign};
    color: ${color ? color : colors.midGrey};
  `;

  return <Heading className={className}>{children}</Heading>;
};

export const Heading5: React.FC<TypographyProps> = ({
  children,
  textAlign = "center",
  className,
  color
}) => {
  const Heading = styled.h5`
    margin: 0 auto 12px;
    font: 400 24px/29px Lato;
    text-align: ${textAlign};
    letter-spacing: 0.6px;
    color: ${color ? color : colors.blue};
  `;

  return <Heading className={className}>{children}</Heading>;
};

export const Paragraph: React.FC<TypographyProps> = ({
  children,
  textAlign = "left",
  className
}) => {
  const Text = styled.p`
    font: 400 16px/19px Lato;
    letter-spacing: 0.4px;
    text-align: ${textAlign};
  `;

  return <Text className={className}>{children}</Text>;
};
