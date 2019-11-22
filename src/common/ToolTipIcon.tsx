import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

const Icon = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  width: 20px;
  & svg {
    width: 90%;
    height: auto;
  }
`;

interface Props {
  dataTip?: string;
  style?: Object;
  fill?: string;
  className?: string;
}

const ToolTipIcon: React.FC<Props> = ({
  dataTip,
  style,
  fill = "#949494",
  className
}) => {
  return (
    <>
      <Icon className={className} data-tip={dataTip} style={style}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 24 24"
          style={{ fill }}
        >
          <path d="M 12 0 C 5.371094 0 0 5.371094 0 12 C 0 18.628906 5.371094 24 12 24 C 18.628906 24 24 18.628906 24 12 C 24 5.371094 18.628906 0 12 0 Z M 12 2 C 17.523438 2 22 6.476563 22 12 C 22 17.523438 17.523438 22 12 22 C 6.476563 22 2 17.523438 2 12 C 2 6.476563 6.476563 2 12 2 Z M 12 5.8125 C 11.816406 5.8125 11.664063 5.808594 11.5 5.84375 C 11.335938 5.878906 11.183594 5.96875 11.0625 6.0625 C 10.941406 6.15625 10.851563 6.285156 10.78125 6.4375 C 10.710938 6.589844 10.6875 6.769531 10.6875 7 C 10.6875 7.226563 10.710938 7.40625 10.78125 7.5625 C 10.851563 7.71875 10.941406 7.84375 11.0625 7.9375 C 11.183594 8.03125 11.335938 8.085938 11.5 8.125 C 11.664063 8.164063 11.816406 8.1875 12 8.1875 C 12.179688 8.1875 12.371094 8.164063 12.53125 8.125 C 12.691406 8.085938 12.816406 8.03125 12.9375 7.9375 C 13.058594 7.84375 13.148438 7.71875 13.21875 7.5625 C 13.289063 7.410156 13.34375 7.226563 13.34375 7 C 13.34375 6.769531 13.289063 6.589844 13.21875 6.4375 C 13.148438 6.285156 13.058594 6.15625 12.9375 6.0625 C 12.816406 5.96875 12.691406 5.878906 12.53125 5.84375 C 12.371094 5.808594 12.179688 5.8125 12 5.8125 Z M 10.78125 9.15625 L 10.78125 18.125 L 13.21875 18.125 L 13.21875 9.15625 Z"></path>
        </svg>
      </Icon>
      {dataTip ? <ReactTooltip place="top" type="dark" effect="solid" /> : null}
    </>
  );
};

export default ToolTipIcon;
