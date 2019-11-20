import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

import { colors } from "../styles/theme";

const Icon = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  width: 20px;
  background: ${colors.lightGrey};
`;

interface Props {
  dataTip: string;
  style?: Object;
}

const ToolTipIcon: React.FC<Props> = ({ dataTip, style }) => {
  return (
    <>
      <Icon data-tip={dataTip} style={style} />
      <ReactTooltip place="top" type="dark" effect="solid" />
    </>
  );
};

export default ToolTipIcon;
